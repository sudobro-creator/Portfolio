"use client";

import {
  ArrowRight,
  ChevronsRight,
  Minus,
  Plus,
} from "lucide-react";

import {
  useState,
} from "react";


export type PricingData = {
  _id: string;

  service: string;

  standardTitle: string;

  standardDescription: string;

  standardPrice: string;

  standardDeliverables: string[];

  standardIcon?: {
    asset?: {
      url?: string;
    };
  };

  tailoredTitle: string;

  tailoredDescription: string;

  tailoredPriceText: string;

  tailoredIcon?: {
    asset?: {
      url?: string;
    };
  };

  meetingUrl: string;
};


const DEFAULT_TAILORED_DELIVERABLES = [
  "Custom project scope",
  "Flexible deliverables",
  "Additional features or requirements",
  "Extended project support",
  "Flexible revision options",
  "Custom timeline",
  "Pricing based on your needs",
  "Design handoff & implementation support",
];


export default function PricingCards({
  pricing,
}: {
  pricing: PricingData;
}) {
  const [
    expanded,
    setExpanded,
  ] =
    useState(false);


  const deliverables =
    pricing.standardDeliverables ||
    [];


  const hasMore =
    deliverables.length > 8;


  const visibleDeliverables =
    expanded
      ? deliverables
      : deliverables.slice(
          0,
          8
        );


  return (
    <div className="pricing-cards">

      {/* ==========================================================
          STANDARD CARD
      =========================================================== */}

      <article
        className={`pricing-card pricing-card-standard ${
          expanded
            ? "expanded"
            : ""
        }`}
      >

        <div className="pricing-card-content">

          {/* ICON */}

          {pricing
            .standardIcon
            ?.asset
            ?.url && (

            <img
              src={
                pricing
                  .standardIcon
                  .asset
                  .url
              }
              alt=""
              className="pricing-card-icon"
            />

          )}


          {/* TITLE */}

          <h2 className="pricing-card-title">
            {
              pricing.standardTitle
            }
          </h2>


          {/* DESCRIPTION */}

          <p className="pricing-card-description">
            {
              pricing
                .standardDescription
            }
          </p>


          {/* PRICE */}

          <p className="pricing-card-price">
            {
              pricing.standardPrice
            }
          </p>


          <div className="pricing-divider" />


          {/* DELIVERABLES */}

          <ul className="pricing-deliverables">

            {visibleDeliverables.map(
              (
                deliverable,
                index
              ) => (

                <li
                  key={`${deliverable}-${index}`}
                >

                  <ChevronsRight
                    size={20}
                    strokeWidth={2}
                  />

                  <span>
                    {
                      deliverable
                    }
                  </span>

                </li>

              )
            )}

          </ul>


          {/* VIEW ALL */}

          {hasMore && (

            <button
              type="button"
              className="pricing-expand"
              onClick={() =>
                setExpanded(
                  (current) =>
                    !current
                )
              }
              aria-expanded={
                expanded
              }
            >

              <span>
                {
                  expanded
                    ? "View less deliverables"
                    : "View all deliverables"
                }
              </span>


              {expanded ? (
                <Minus
                  size={20}
                />
              ) : (
                <Plus
                  size={20}
                />
              )}

            </button>

          )}


          {/* CTA */}

          <a
            href={
              pricing.meetingUrl
            }
            target="_blank"
            rel="noreferrer"
            className="pricing-cta pricing-cta-standard"
          >

            <span>
              Book a Meeting
            </span>

            <ArrowRight
              size={20}
            />

          </a>

        </div>

      </article>


      {/* ==========================================================
          TAILORED CARD
      =========================================================== */}

      <article className="pricing-card pricing-card-tailored">

        <div className="pricing-card-content">

          {/* ICON */}

          {pricing
            .tailoredIcon
            ?.asset
            ?.url && (

            <img
              src={
                pricing
                  .tailoredIcon
                  .asset
                  .url
              }
              alt=""
              className="pricing-card-icon"
            />

          )}


          {/* TITLE */}

          <h2 className="pricing-card-title">
            {
              pricing.tailoredTitle
            }
          </h2>


          {/* DESCRIPTION */}

          <p className="pricing-card-description">
            {
              pricing
                .tailoredDescription
            }
          </p>


          {/* PRICE TEXT */}

          <p className="pricing-card-price">
            {
              pricing
                .tailoredPriceText
            }
          </p>


          <div className="pricing-divider" />


          {/* DEFAULT TAILORED DELIVERABLES */}

          <ul className="pricing-deliverables">

            {DEFAULT_TAILORED_DELIVERABLES.map(
              (
                deliverable,
                index
              ) => (

                <li
                  key={`${deliverable}-${index}`}
                >

                  <ChevronsRight
                    size={20}
                    strokeWidth={2}
                  />

                  <span>
                    {
                      deliverable
                    }
                  </span>

                </li>

              )
            )}

          </ul>


          {/* CTA */}

          <a
            href={
              pricing.meetingUrl
            }
            target="_blank"
            rel="noreferrer"
            className="pricing-cta pricing-cta-tailored"
          >

            <span>
              Book a Meeting
            </span>

            <ArrowRight
              size={20}
            />

          </a>

        </div>

      </article>

    </div>
  );
}