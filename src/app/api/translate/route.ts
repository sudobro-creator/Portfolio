import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

/* ================================================================
   RUNTIME
================================================================ */

export const runtime = "nodejs";

/* ================================================================
   LIMITS
================================================================ */

const MAX_TEXT_ITEMS = 500;
const MAX_TOTAL_CHARACTERS = 100000;

/* ================================================================
   SUPPORTED LANGUAGES
================================================================ */

const supportedLanguages = {
  fr: "French",
  de: "German",
} as const;

type TargetLanguage =
  keyof typeof supportedLanguages;

/* ================================================================
   REQUEST BODY
================================================================ */

type RequestBody = {
  targetLanguage?: string;
  pathname?: string;
  texts?: unknown;
};

/* ================================================================
   TRANSLATION RESPONSE
================================================================ */

type TranslationResult = {
  translations: string[];
};

/* ================================================================
   LANGUAGE VALIDATION
================================================================ */

function isTargetLanguage(
  value: string
): value is TargetLanguage {
  return (
    value === "fr" ||
    value === "de"
  );
}

/* ================================================================
   TEXT VALIDATION
================================================================ */

function validateTexts(
  value: unknown
): value is string[] {
  if (!Array.isArray(value)) {
    return false;
  }

  if (
    value.length === 0 ||
    value.length > MAX_TEXT_ITEMS
  ) {
    return false;
  }

  return value.every((item) => {
    return (
      typeof item === "string" &&
      item.length > 0 &&
      item.length <= 20000
    );
  });
}

/* ================================================================
   EXTRACT JSON

   Gemini is instructed to return JSON only.

   This helper also protects us in case Gemini wraps the JSON
   inside a markdown code block.
================================================================ */

function extractJson(
  value: string
): unknown {
  let cleaned = value.trim();

  if (
    cleaned.startsWith("```json")
  ) {
    cleaned = cleaned
      .replace(/^```json\s*/i, "")
      .replace(/\s*```$/, "");
  } else if (
    cleaned.startsWith("```")
  ) {
    cleaned = cleaned
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "");
  }

  return JSON.parse(cleaned);
}

/* ================================================================
   POST
================================================================ */

export async function POST(
  request: Request
) {
  try {
    /* ============================================================
       API KEY
    ============================================================ */

    const apiKey =
      process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY is not configured on the server.",
        },
        {
          status: 500,
        }
      );
    }

    /* ============================================================
       REQUEST BODY
    ============================================================ */

    const body: RequestBody =
      await request.json();

    /* ============================================================
       LANGUAGE
    ============================================================ */

    const targetLanguage =
      body.targetLanguage;

    if (
      typeof targetLanguage !== "string" ||
      !isTargetLanguage(
        targetLanguage
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Unsupported target language.",
        },
        {
          status: 400,
        }
      );
    }

    /* ============================================================
       TEXT
    ============================================================ */

    if (
      !validateTexts(
        body.texts
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid translation text array.",
        },
        {
          status: 400,
        }
      );
    }

    const texts =
      body.texts;

    /* ============================================================
       TOTAL CHARACTER COUNT
    ============================================================ */

    const totalCharacters =
      texts.reduce(
        (total, text) => {
          return (
            total +
            text.length
          );
        },
        0
      );

    if (
      totalCharacters >
      MAX_TOTAL_CHARACTERS
    ) {
      return NextResponse.json(
        {
          error:
            "This page contains too much text to translate in one request.",
        },
        {
          status: 413,
        }
      );
    }

    /* ============================================================
       LANGUAGE NAME
    ============================================================ */

    const targetLanguageName =
      supportedLanguages[
        targetLanguage
      ];

    /* ============================================================
       GEMINI CLIENT
    ============================================================ */

    const ai =
      new GoogleGenAI({
        apiKey,
      });

    /* ============================================================
       MODEL

       Current Gemini Flash model.
    ============================================================ */

    const model =
      process.env
        .GEMINI_TRANSLATION_MODEL ||
      "gemini-3.8-flash";

    /* ============================================================
       PAGE TRANSLATION PROMPT
    ============================================================ */

    const prompt = `
You are the automatic translation engine for GIZKIDESIGNS, a professional product design and visual design portfolio website.

Your task is to translate the supplied English website text into ${targetLanguageName}.

You are receiving ALL unique text strings from one webpage in a single request.

STRICT RULES:

1. Translate naturally and professionally into ${targetLanguageName}.

2. Preserve the original meaning and tone.

3. Keep short interface labels concise.

4. Do not translate word-for-word when a more natural ${targetLanguageName} phrase exists.

5. DO NOT translate:
   - GIZKIDESIGNS
   - Gizkidesigns
   - company names
   - product names
   - brand names
   - personal names
   - URLs
   - email addresses
   - currency values
   - numbers
   - years
   - technical product names
   - proper nouns that should remain unchanged.

6. Translate normal website content including:
   - navigation labels
   - headings
   - paragraphs
   - buttons
   - calls to action
   - design categories
   - pricing descriptions
   - pricing deliverables
   - case-study section names
   - case-study descriptions
   - general interface copy.

7. Preserve punctuation where appropriate.

8. The input contains an ordered array called "texts".

9. Return EXACTLY ONE translated string for every source string.

10. Preserve the exact array order.

11. Never combine multiple source strings.

12. Never split a source string.

13. If a string should remain unchanged, return that exact string.

14. Do not return explanations.

15. Do not return notes.

16. Do not return markdown.

17. Do not add any text before or after the JSON.

18. Your complete response MUST be valid JSON with exactly this structure:

{"translations":["translation 1","translation 2"]}

The translations array MUST contain exactly ${texts.length} items.

Current website route:
${body.pathname || "/"}

Page text:

${JSON.stringify({
  texts,
})}
`.trim();

    /* ============================================================
       ONE GEMINI REQUEST FOR THE ENTIRE PAGE

       Google currently recommends the Interactions API for
       Gemini 3.8 Flash.
    ============================================================ */

    const interaction =
      await ai.interactions.create({
        model,

        input: prompt,
      });

    /* ============================================================
       RESPONSE
    ============================================================ */

    const responseText =
      interaction.output_text;

    if (!responseText) {
      throw new Error(
        "Gemini returned no translation output."
      );
    }

    /* ============================================================
       PARSE RESPONSE
    ============================================================ */

    const parsed =
      extractJson(
        responseText
      );

    if (
      typeof parsed !== "object" ||
      parsed === null
    ) {
      throw new Error(
        "Gemini returned invalid JSON."
      );
    }

    if (
      !(
        "translations" in parsed
      )
    ) {
      throw new Error(
        "Gemini response does not contain a translations array."
      );
    }

    const translations =
      parsed.translations;

    /* ============================================================
       VALIDATE ARRAY
    ============================================================ */

    if (
      !Array.isArray(
        translations
      )
    ) {
      throw new Error(
        "Gemini did not return a valid translations array."
      );
    }

    const allStrings =
      translations.every(
        (item) => {
          return (
            typeof item ===
            "string"
          );
        }
      );

    if (!allStrings) {
      throw new Error(
        "Gemini returned an invalid translation value."
      );
    }

    /* ============================================================
       VERIFY EXACT COUNT

       This is extremely important.

       Source:
       0 -> translation 0
       1 -> translation 1
       2 -> translation 2
       etc.
    ============================================================ */

    if (
      translations.length !==
      texts.length
    ) {
      throw new Error(
        `Expected ${texts.length} translations but Gemini returned ${translations.length}.`
      );
    }

    /* ============================================================
       SUCCESS
    ============================================================ */

    const result:
      TranslationResult = {
        translations,
      };

    return NextResponse.json(
      result
    );
  } catch (error) {
    /* ============================================================
       SERVER ERROR
    ============================================================ */

    console.error(
      "Gemini translation API error:",
      error
    );

    let message =
      "Unable to translate this page right now.";

    if (
      error instanceof Error
    ) {
      console.error(
        "Gemini error message:",
        error.message
      );

      message =
        error.message;
    }

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV ===
          "development"
            ? message
            : "Unable to translate this page right now.",
      },
      {
        status: 500,
      }
    );
  }
}