"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
} from "lucide-react";

import type {
  CaseStudySection,
} from "./types";


export default function CaseStudySidebar({
  sections,
}: {
  sections:
    CaseStudySection[];
}) {
  const firstAnchor =
    sections[0]
      ?.anchor
      ?.current ||
    "";


  const [
    activeSection,
    setActiveSection,
  ] =
    useState(
      firstAnchor
    );


  /* ==============================================================
     SCROLL SPY
  =============================================================== */

  useEffect(() => {
    if (
      sections.length ===
      0
    ) {
      return;
    }


    const updateActiveSection =
      () => {

        const triggerPoint =
          window.innerHeight *
          0.32;


        let current =
          sections[0]
            ?.anchor
            ?.current ||
          "";


        for (
          const section
          of sections
        ) {

          const id =
            section
              .anchor
              ?.current;


          if (!id) {
            continue;
          }


          const element =
            document
              .getElementById(
                id
              );


          if (!element) {
            continue;
          }


          const rect =
            element
              .getBoundingClientRect();


          if (
            rect.top <=
            triggerPoint
          ) {
            current =
              id;
          }
        }


        setActiveSection(
          current
        );
      };


    updateActiveSection();


    window.addEventListener(
      "scroll",
      updateActiveSection,
      {
        passive: true,
      }
    );


    window.addEventListener(
      "resize",
      updateActiveSection
    );


    return () => {

      window.removeEventListener(
        "scroll",
        updateActiveSection
      );


      window.removeEventListener(
        "resize",
        updateActiveSection
      );
    };

  }, [
    sections,
  ]);


  /* ==============================================================
     SCROLL TO SECTION
  =============================================================== */

  const scrollToSection = (
    id:
      string
  ) => {

    const element =
      document
        .getElementById(
          id
        );


    if (!element) {
      return;
    }


    element.scrollIntoView({
      behavior:
        "smooth",

      block:
        "start",
    });


    setActiveSection(
      id
    );
  };


  return (
    <aside className="case-study-sidebar">

      <Link
        href="/design/case-studies"
        className="case-study-back"
      >

        <ArrowLeft
          size={28}
          strokeWidth={1.6}
        />


        <span>
          Back to Case Studies
        </span>

      </Link>


      <nav
        className="case-study-section-nav"
        aria-label="Case study sections"
      >

        {sections.map(
          (
            section
          ) => {

            const id =
              section
                .anchor
                ?.current;


            if (!id) {
              return null;
            }


            const active =
              activeSection ===
              id;


            return (
              <button
                key={
                  section._key
                }
                type="button"
                className={`case-study-section-link ${
                  active
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  scrollToSection(
                    id
                  )
                }
              >
                {
                  section.title
                }
              </button>
            );
          }
        )}

      </nav>

    </aside>
  );
}