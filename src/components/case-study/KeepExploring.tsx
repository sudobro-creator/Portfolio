import Link from "next/link";

import {
  ArrowRight,
} from "lucide-react";

import type {
  OtherCaseStudy,
} from "./types";


export default function KeepExploring({
  items,
}: {
  items:
    OtherCaseStudy[];
}) {
  if (
    items.length ===
    0
  ) {
    return null;
  }


  return (
    <section className="keep-exploring">

      <div className="keep-exploring-heading">

        <h2>
          Keep exploring
        </h2>


        <Link href="/design/case-studies">
          View all
        </Link>

      </div>


      <div className="keep-exploring-grid">

        {items.map(
          (
            item
          ) => {

            const slug =
              item
                .caseStudySlug
                ?.current;


            if (!slug) {
              return null;
            }


            return (
              <Link
                key={
                  item._id
                }
                href={
                  `/design/case-studies/${slug}`
                }
                className="keep-exploring-card"
              >

                <div className="keep-exploring-media">

                  {item.mediaType ===
                    "image" &&
                    item.image
                      ?.asset
                      ?.url && (

                    <img
                      src={
                        item.image
                          .asset
                          .url
                      }
                      alt={
                        item.alt ||
                        item.title
                      }
                    />

                  )}


                  {item.mediaType ===
                    "video" &&
                    item.video
                      ?.asset
                      ?.url && (

                    <video
                      src={
                        item.video
                          .asset
                          .url
                      }
                      autoPlay
                      muted
                      loop
                      playsInline
                    />

                  )}

                </div>


                <div className="keep-exploring-label">

                  <span>
                    {
                      item.title
                    }
                  </span>


                  <ArrowRight
                    size={19}
                  />

                </div>

              </Link>
            );
          }
        )}

      </div>

    </section>
  );
}