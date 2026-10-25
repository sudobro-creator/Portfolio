"use client";

import Link from "next/link";

import {
  ArrowRight,
} from "lucide-react";

import HomeGallery, {
  type HomeGalleryItem,
} from "@/components/home/HomeGallery";


export type DesignItem =
  HomeGalleryItem & {
    category?: string;

    caseStudySlug?: {
      current?: string;
    };
  };


export default function DesignGallery({
  items,
}: {
  items: DesignItem[];
}) {
  /*
  |--------------------------------------------------------------------------
  | Separate Case Studies from normal design uploads
  |--------------------------------------------------------------------------
  */

  const caseStudies =
    items.filter(
      (item) =>
        item.category ===
        "case-studies"
    );


  const regularDesigns =
    items.filter(
      (item) =>
        item.category !==
        "case-studies"
    );


  return (
    <>

      {/* ============================================================
          CASE STUDIES
      ============================================================= */}

      {caseStudies.length > 0 && (

        <div className="portfolio-grid case-study-grid">

          {caseStudies.map(
            (item) => {
              const imageUrl =
                item.image
                  ?.asset
                  ?.url;

              const videoUrl =
                item.video
                  ?.asset
                  ?.url;

              const slug =
                item
                  .caseStudySlug
                  ?.current;


              /*
              ----------------------------------------------------------
              We only make it clickable once a slug exists.
              ----------------------------------------------------------
              */

              const href =
                slug
                  ? `/design/case-studies/${slug}`
                  : "#";


              return (
                <article
                  key={
                    item._id
                  }
                  className="portfolio-grid-cell case-study-grid-cell"
                >

                  <Link
                    href={href}
                    className="case-study-card"
                    aria-label={`View ${
                      item.title
                    } case study`}
                    onClick={(
                      event
                    ) => {
                      /*
                       * Prevent a broken "#" navigation
                       * while developing a case study
                       * that does not yet have a slug.
                       */

                      if (!slug) {
                        event.preventDefault();
                      }
                    }}
                  >

                    {/* IMAGE */}

                    {item.mediaType ===
                      "image" &&
                      imageUrl && (

                      <img
                        src={
                          imageUrl
                        }
                        alt={
                          item.alt ||
                          item.title
                        }
                        className="case-study-media"
                      />

                    )}


                    {/* VIDEO CASE STUDY COVER */}

                    {item.mediaType ===
                      "video" &&
                      videoUrl && (

                      <video
                        src={
                          videoUrl
                        }
                        className="case-study-media"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />

                    )}


                    {/* CASE STUDY CTA */}

                    <span className="case-study-cta">

                      <span>
                        View case study
                      </span>

                      <ArrowRight
                        size={22}
                        strokeWidth={1.8}
                      />

                    </span>

                  </Link>

                </article>
              );
            }
          )}

        </div>

      )}


      {/* ============================================================
          NORMAL DESIGN WORK
      ============================================================= */}

      {regularDesigns.length > 0 && (

        <HomeGallery
          items={
            regularDesigns
          }
        />

      )}

    </>
  );
}