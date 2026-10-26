/* ================================================================
   HOME
================================================================ */

export const HOME_GALLERY_QUERY = `
  *[
    _type == "homeGalleryItem"
    && status == "published"
  ]
  | order(order asc) {
    _id,
    title,
    mediaType,
    alt,
    order,
    embedUrl,

    image {
      asset-> {
        _id,
        url,

        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      }
    },

    video {
      asset-> {
        _id,
        url,
        mimeType
      }
    }
  }
`;


/* ================================================================
   ABOUT
================================================================ */

export const ABOUT_GALLERY_QUERY = `
  *[
    _type == "aboutGalleryItem"
    && status == "published"
  ]
  | order(order asc) {
    _id,
    title,
    mediaType,
    alt,
    order,

    image {
      asset-> {
        _id,
        url,

        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      }
    },

    video {
      asset-> {
        _id,
        url,
        mimeType
      }
    }
  }
`;


/* ================================================================
   ALL DESIGNS
================================================================ */

export const ALL_DESIGNS_QUERY = `
  *[
    _type == "designItem"
    && status == "published"
  ]
  | order(order asc) {
    _id,
    title,
    category,
    mediaType,
    alt,
    order,
    embedUrl,

    caseStudySlug {
      current
    },

    image {
      asset-> {
        _id,
        url,

        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      }
    },

    video {
      asset-> {
        _id,
        url,
        mimeType
      }
    }
  }
`;


/* ================================================================
   DESIGNS BY CATEGORY
================================================================ */

export const DESIGNS_BY_CATEGORY_QUERY = `
  *[
    _type == "designItem"
    && status == "published"
    && category == $category
  ]
  | order(order asc) {
    _id,
    title,
    category,
    mediaType,
    alt,
    order,
    embedUrl,

    caseStudySlug {
      current
    },

    image {
      asset-> {
        _id,
        url,

        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      }
    },

    video {
      asset-> {
        _id,
        url,
        mimeType
      }
    }
  }
`;


/* ================================================================
   INDIVIDUAL CASE STUDY
================================================================ */

export const CASE_STUDY_BY_SLUG_QUERY = `
  *[
    _type == "designItem"
    && status == "published"
    && category == "case-studies"
    && caseStudySlug.current == $slug
  ][0] {
    _id,
    title,
    category,
    alt,

    caseStudySlug {
      current
    },

    caseStudyCompany,
    caseStudySubtitle,
    caseStudyMeta,

    caseStudyHeroMedia {
      mediaType,
      alt,

      image {
        asset-> {
          _id,
          url,

          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        }
      },

      video {
        asset-> {
          _id,
          url,
          mimeType
        }
      }
    },

    caseStudySections[] {
      _key,
      title,

      anchor {
        current
      },

      content[] {
        _key,
        blockType,
        text,
        mediaLayout,

        media[] {
          _key,
          mediaType,
          alt,

          image {
            asset-> {
              _id,
              url,

              metadata {
                dimensions {
                  width,
                  height,
                  aspectRatio
                }
              }
            }
          },

          video {
            asset-> {
              _id,
              url,
              mimeType
            }
          }
        }
      }
    }
  }
`;


/* ================================================================
   OTHER CASE STUDIES
================================================================ */

export const OTHER_CASE_STUDIES_QUERY = `
  *[
    _type == "designItem"
    && status == "published"
    && category == "case-studies"
    && caseStudySlug.current != $slug
  ]
  | order(order asc)[0...2] {
    _id,
    title,
    alt,
    mediaType,

    caseStudySlug {
      current
    },

    image {
      asset-> {
        _id,
        url
      }
    },

    video {
      asset-> {
        _id,
        url,
        mimeType
      }
    }
  }
`;
