export type SanityAsset = {
  _id?: string;

  url?: string;

  mimeType?: string;

  metadata?: {
    dimensions?: {
      width?: number;

      height?: number;

      aspectRatio?: number;
    };
  };
};


export type CaseStudyMedia = {
  _key?: string;

  mediaType:
    | "image"
    | "video";

  alt?: string;

  image?: {
    asset?:
      SanityAsset;
  };

  video?: {
    asset?:
      SanityAsset;
  };
};


export type CaseStudyContentBlock = {
  _key: string;

  blockType:
    | "text"
    | "media";

  text?: unknown[];

  mediaLayout?:
    | "one"
    | "two"
    | "three";

  media?:
    CaseStudyMedia[];
};


export type CaseStudySection = {
  _key: string;

  title:
    string;

  anchor: {
    current:
      string;
  };

  content?:
    CaseStudyContentBlock[];
};


export type CaseStudy = {
  _id:
    string;

  title:
    string;

  category:
    "case-studies";

  alt?:
    string;

  caseStudySlug: {
    current:
      string;
  };

  caseStudyCompany?:
    string;

  caseStudySubtitle?:
    string;

  caseStudyMeta?:
    string;

  caseStudyHeroMedia?:
    CaseStudyMedia;

  caseStudySections:
    CaseStudySection[];
};


export type OtherCaseStudy = {
  _id:
    string;

  title:
    string;

  alt?:
    string;

  mediaType:
    | "image"
    | "video";

  caseStudySlug: {
    current:
      string;
  };

  image?: {
    asset?:
      SanityAsset;
  };

  video?: {
    asset?:
      SanityAsset;
  };
};