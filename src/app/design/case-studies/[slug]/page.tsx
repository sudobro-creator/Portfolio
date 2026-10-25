import {
  notFound,
} from "next/navigation";

import CaseStudySidebar from "@/components/case-study/CaseStudySidebar";

import CaseStudyContent from "@/components/case-study/CaseStudyContent";

import KeepExploring from "@/components/case-study/KeepExploring";

import type {
  CaseStudy,
  OtherCaseStudy,
} from "@/components/case-study/types";

import {
  sanityClient,
} from "@/sanity/client";

import {
  CASE_STUDY_BY_SLUG_QUERY,
  OTHER_CASE_STUDIES_QUERY,
} from "@/sanity/queries";


type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};


export default async function CaseStudyPage({
  params,
}: PageProps) {

  const {
    slug,
  } =
    await params;


  const [
    caseStudy,
    otherCaseStudies,
  ] =
    await Promise.all([

      sanityClient.fetch<
        CaseStudy | null
      >(
        CASE_STUDY_BY_SLUG_QUERY,
        {
          slug,
        }
      ),

      sanityClient.fetch<
        OtherCaseStudy[]
      >(
        OTHER_CASE_STUDIES_QUERY,
        {
          slug,
        }
      ),

    ]);


  if (!caseStudy) {
    notFound();
  }


  return (
    <main className="case-study-page">

      {/* ============================================================
          LEFT
      ============================================================= */}

      <CaseStudySidebar
        sections={
          caseStudy
            .caseStudySections ||
          []
        }
      />


      {/* ============================================================
          RIGHT
      ============================================================= */}

      <div className="case-study-main">

        <CaseStudyContent
          caseStudy={
            caseStudy
          }
        />


        <KeepExploring
          items={
            otherCaseStudies
          }
        />

      </div>

    </main>
  );
}