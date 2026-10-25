import type { Language } from "./types";

/* ================================================================
   TYPES
================================================================ */

type TranslationResponse = {
  translations: string[];
};

type CachedTranslation = {
  source: string[];
  translated: string[];
};

type TextRecord = {
  node: Text;
  original: string;
  prefix: string;
  suffix: string;
};

/* ================================================================
   CONSTANTS
================================================================ */

const CACHE_VERSION = "v1";
const CACHE_PREFIX = "gizki-page-translation";

const ignoredTags = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "CODE",
  "PRE",
  "SVG",
  "PATH",
  "VIDEO",
  "AUDIO",
  "IFRAME",
]);

/* ================================================================
   HELPERS
================================================================ */

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function hasLetters(value: string): boolean {
  return /\p{L}/u.test(value);
}

function shouldIgnoreElement(
  element: HTMLElement | null
): boolean {
  if (!element) {
    return true;
  }

  if (ignoredTags.has(element.tagName)) {
    return true;
  }

  if (element.closest("[data-no-translate]")) {
    return true;
  }

  if (element.closest("[contenteditable='true']")) {
    return true;
  }

  return false;
}

/* ================================================================
   COLLECT PAGE TEXT

   We collect all normal text nodes from the rendered page.

   We do NOT collect:
   - scripts
   - styles
   - SVG content
   - videos
   - audio
   - code
   - anything marked data-no-translate
================================================================ */

function collectTextRecords(): TextRecord[] {
  const records: TextRecord[] = [];

  if (typeof document === "undefined") {
    return records;
  }

  const root = document.body;

  if (!root) {
    return records;
  }

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;

        if (shouldIgnoreElement(parent)) {
          return NodeFilter.FILTER_REJECT;
        }

        const raw = node.nodeValue ?? "";
        const normalized = normalizeText(raw);

        if (!normalized) {
          return NodeFilter.FILTER_REJECT;
        }

        if (!hasLetters(normalized)) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  let currentNode = walker.nextNode();

  while (currentNode) {
    const textNode = currentNode as Text;
    const raw = textNode.nodeValue ?? "";
    const normalized = normalizeText(raw);

    const prefixMatch = raw.match(/^\s*/);
    const suffixMatch = raw.match(/\s*$/);

    records.push({
      node: textNode,
      original: normalized,
      prefix: prefixMatch?.[0] ?? "",
      suffix: suffixMatch?.[0] ?? "",
    });

    currentNode = walker.nextNode();
  }

  return records;
}

/* ================================================================
   UNIQUE STRINGS

   Example:

   If "Design" appears 5 times on the page,
   Gemini receives it only once.
================================================================ */

function getUniqueSourceStrings(
  records: TextRecord[]
): string[] {
  return Array.from(
    new Set(records.map((record) => record.original))
  );
}

/* ================================================================
   CACHE KEY
================================================================ */

function getCacheKey(
  pathname: string,
  language: Language
): string {
  return [
    CACHE_PREFIX,
    CACHE_VERSION,
    pathname,
    language,
  ].join(":");
}

/* ================================================================
   READ CACHE
================================================================ */

function readCache(
  pathname: string,
  language: Language
): CachedTranslation | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const key = getCacheKey(pathname, language);
    const raw = window.localStorage.getItem(key);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as CachedTranslation;

    if (!Array.isArray(parsed.source)) {
      return null;
    }

    if (!Array.isArray(parsed.translated)) {
      return null;
    }

    if (
      parsed.source.length !==
      parsed.translated.length
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

/* ================================================================
   WRITE CACHE
================================================================ */

function writeCache(
  pathname: string,
  language: Language,
  value: CachedTranslation
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const key = getCacheKey(pathname, language);

    window.localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch {
    /*
      Ignore localStorage errors.

      Translation can still work without caching.
    */
  }
}

/* ================================================================
   CHECK WHETHER CACHE MATCHES CURRENT ENGLISH PAGE

   If you edit the English page later, the old translation
   should not be applied to the new text.
================================================================ */

function cacheMatchesSource(
  cached: CachedTranslation,
  source: string[]
): boolean {
  if (cached.source.length !== source.length) {
    return false;
  }

  for (let index = 0; index < source.length; index += 1) {
    if (cached.source[index] !== source[index]) {
      return false;
    }
  }

  return true;
}

/* ================================================================
   APPLY TRANSLATIONS
================================================================ */

function applyTranslations(
  records: TextRecord[],
  source: string[],
  translated: string[]
): void {
  const translationMap = new Map<string, string>();

  source.forEach((sourceText, index) => {
    const translatedText =
      translated[index] ?? sourceText;

    translationMap.set(
      sourceText,
      translatedText
    );
  });

  records.forEach((record) => {
    const translatedText =
      translationMap.get(record.original);

    if (translatedText === undefined) {
      return;
    }

    record.node.nodeValue =
      `${record.prefix}${translatedText}${record.suffix}`;
  });
}

/* ================================================================
   TRANSLATE CURRENT PAGE
================================================================ */

export async function translateCurrentPage({
  language,
  pathname,
  signal,
}: {
  language: Exclude<Language, "en">;
  pathname: string;
  signal?: AbortSignal;
}): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof document === "undefined") {
    return;
  }

  /* --------------------------------------------------------------
     1. COLLECT ALL PAGE TEXT
  -------------------------------------------------------------- */

  const records = collectTextRecords();

  if (records.length === 0) {
    return;
  }

  /* --------------------------------------------------------------
     2. REMOVE DUPLICATE STRINGS
  -------------------------------------------------------------- */

  const source = getUniqueSourceStrings(records);

  if (source.length === 0) {
    return;
  }

  /* --------------------------------------------------------------
     3. CHECK LOCAL CACHE
  -------------------------------------------------------------- */

  const cached = readCache(
    pathname,
    language
  );

  if (
    cached &&
    cacheMatchesSource(cached, source)
  ) {
    applyTranslations(
      records,
      cached.source,
      cached.translated
    );

    return;
  }

  /* --------------------------------------------------------------
     4. SEND THE WHOLE PAGE IN ONE REQUEST
  -------------------------------------------------------------- */

  const response = await fetch(
    "/api/translate",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        targetLanguage: language,
        pathname,
        texts: source,
      }),

      signal,
    }
  );

  /* --------------------------------------------------------------
     5. HANDLE API ERROR
  -------------------------------------------------------------- */

  if (!response.ok) {
    let message =
      `Translation failed with status ${response.status}.`;

    try {
      const errorBody = (await response.json()) as {
        error?: string;
      };

      if (errorBody.error) {
        message = errorBody.error;
      }
    } catch {
      /*
        Keep the default error message.
      */
    }

    throw new Error(message);
  }

  /* --------------------------------------------------------------
     6. READ TRANSLATION RESPONSE
  -------------------------------------------------------------- */

  const data =
    (await response.json()) as TranslationResponse;

  if (!Array.isArray(data.translations)) {
    throw new Error(
      "The translation service returned an invalid response."
    );
  }

  if (
    data.translations.length !==
    source.length
  ) {
    throw new Error(
      `Expected ${source.length} translations but received ${data.translations.length}.`
    );
  }

  const allTranslationsAreStrings =
    data.translations.every(
      (translation) =>
        typeof translation === "string"
    );

  if (!allTranslationsAreStrings) {
    throw new Error(
      "The translation service returned an invalid translation."
    );
  }

  /* --------------------------------------------------------------
     7. CACHE RESULT
  -------------------------------------------------------------- */

  writeCache(
    pathname,
    language,
    {
      source,
      translated: data.translations,
    }
  );

  /* --------------------------------------------------------------
     8. APPLY TRANSLATION

     Only text nodes change.
     The DOM structure remains untouched.
  -------------------------------------------------------------- */

  applyTranslations(
    records,
    source,
    data.translations
  );
}