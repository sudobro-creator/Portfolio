import { PortableText } from "@portabletext/react";

import CaseStudyMedia from "./CaseStudyMedia";

import type {
  CaseStudy,
  CaseStudyContentBlock,
} from "./types";


/* ================================================================
   CONTENT BLOCK
================================================================ */

function ContentBlock({
  block,
}: {
  block: CaseStudyContentBlock;
}) {
  /* ==============================================================
     TEXT
  =============================================================== */

  if (
    block.blockType === "text" &&
    block.text &&
    block.text.length > 0
  ) {
    /*
      Keep the TypeScript cast outside JSX.

      This avoids Turbopack interpreting "as" as JSX syntax.
    */

    const portableTextValue =
      block.text as never;

    return (
      <div className="case-study-rich-text">
        <PortableText
          value={portableTextValue}
        />
      </div>
    );
  }


  /* ==============================================================
     MEDIA
  =============================================================== */

  if (
    block.blockType === "media" &&
    block.media &&
    block.media.length > 0
  ) {
    const layout =
      block.mediaLayout || "one";

    return (
      <div
        className={`case-study-media-row case-study-media-${layout}`}
      >
        {block.media.map(
          (media, index) => {
            const key =
              media._key ||
              `media-${index}`;

            return (
              <div
                key={key}
                className="case-study-media-item"
              >
                <CaseStudyMedia
                  media={media}
                />
              </div>
            );
          }
        )}
      </div>
    );
  }


  return null;
}


/* ================================================================
   CASE STUDY CONTENT
================================================================ */

export default function CaseStudyContent({
  caseStudy,
}: {
  caseStudy: CaseStudy;
}) {
  return (
    <article className="case-study-article">

      {/* ==========================================================
          HEADER
      ========================================================== */}

      <header className="case-study-header">

        <h1 className="case-study-title">
          {caseStudy.title}
        </h1>


        {caseStudy.caseStudyCompany && (
          <div
            className="case-study-company"
            data-no-translate
          >
            {caseStudy.caseStudyCompany}
          </div>
        )}


        {caseStudy.caseStudySubtitle && (
          <p className="case-study-subtitle">
            {caseStudy.caseStudySubtitle}
          </p>
        )}


        {caseStudy.caseStudyMeta && (
          <p className="case-study-meta">
            {caseStudy.caseStudyMeta}
          </p>
        )}

      </header>


      {/* ==========================================================
          HERO MEDIA
      ========================================================== */}

      {caseStudy.caseStudyHeroMedia && (
        <div className="case-study-hero">
          <CaseStudyMedia
            media={
              caseStudy.caseStudyHeroMedia
            }
          />
        </div>
      )}


      {/* ==========================================================
          CASE STUDY SECTIONS
      ========================================================== */}

      <div className="case-study-sections">

        {caseStudy.caseStudySections.map(
          (section) => {
            const id =
              section.anchor?.current;

            if (!id) {
              return null;
            }

            return (
              <section
                key={section._key}
                id={id}
                className="case-study-section"
              >

                <h2 className="case-study-section-title">
                  {section.title}
                </h2>


                <div className="case-study-section-content">

                  {section.content?.map(
                    (block) => (
                      <ContentBlock
                        key={block._key}
                        block={block}
                      />
                    )
                  )}

                </div>

              </section>
            );
          }
        )}

      </div>

    </article>
  );
}