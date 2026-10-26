import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";


/* ================================================================
   CASE STUDY MEDIA ITEM
================================================================ */

const caseStudyMediaItem =
  defineArrayMember({
    name:
      "caseStudyMediaItem",

    title:
      "Media",

    type:
      "object",

    fields: [

      defineField({
        name:
          "mediaType",

        title:
          "Media Type",

        type:
          "string",

        options: {
          list: [
            {
              title:
                "Image / GIF",

              value:
                "image",
            },

            {
              title:
                "Video",

              value:
                "video",
            },
          ],

          layout:
            "radio",

          direction:
            "horizontal",
        },

        initialValue:
          "image",

        validation:
          (Rule) =>
            Rule.required(),
      }),


      defineField({
        name:
          "image",

        title:
          "Image / GIF",

        type:
          "image",

        options: {
          hotspot:
            false,
        },

        hidden:
          ({ parent }) =>
            parent?.mediaType !==
            "image",
      }),


      defineField({
        name:
          "video",

        title:
          "Video",

        type:
          "file",

        options: {
          accept:
            "video/*",
        },

        hidden:
          ({ parent }) =>
            parent?.mediaType !==
            "video",
      }),


      defineField({
        name:
          "alt",

        title:
          "Alternative Text",

        type:
          "string",
      }),
    ],

    preview: {
      select: {
        mediaType:
          "mediaType",

        media:
          "image",

        alt:
          "alt",
      },

      prepare({
        mediaType,
        media,
        alt,
      }) {
        return {
          title:
            alt ||
            (
              mediaType ===
              "video"
                ? "Video"
                : "Image / GIF"
            ),

          subtitle:
            mediaType ===
            "video"
              ? "Video"
              : "Image / GIF",

          media,
        };
      },
    },
  });


/* ================================================================
   CONTENT BLOCK
================================================================ */

const caseStudyContentBlock =
  defineArrayMember({
    name:
      "caseStudyContentBlock",

    title:
      "Content Block",

    type:
      "object",

    fields: [

      defineField({
        name:
          "blockType",

        title:
          "Block Type",

        type:
          "string",

        options: {
          list: [
            {
              title:
                "Text",

              value:
                "text",
            },

            {
              title:
                "Media",

              value:
                "media",
            },
          ],

          layout:
            "radio",

          direction:
            "horizontal",
        },

        initialValue:
          "text",

        validation:
          (Rule) =>
            Rule.required(),
      }),


      defineField({
        name:
          "text",

        title:
          "Text",

        type:
          "array",

        of: [
          {
            type:
              "block",
          },
        ],

        hidden:
          ({ parent }) =>
            parent?.blockType !==
            "text",
      }),


      defineField({
        name:
          "mediaLayout",

        title:
          "Media Layout",

        type:
          "string",

        options: {
          list: [
            {
              title:
                "1 Column",

              value:
                "one",
            },

            {
              title:
                "2 Columns",

              value:
                "two",
            },

            {
              title:
                "3 Columns",

              value:
                "three",
            },
          ],

          layout:
            "radio",

          direction:
            "horizontal",
        },

        initialValue:
          "one",

        hidden:
          ({ parent }) =>
            parent?.blockType !==
            "media",
      }),


      defineField({
        name:
          "media",

        title:
          "Media",

        type:
          "array",

        of: [
          caseStudyMediaItem,
        ],

        hidden:
          ({ parent }) =>
            parent?.blockType !==
            "media",

        validation:
          (Rule) =>
            Rule.max(3),
      }),
    ],

    preview: {
      select: {
        blockType:
          "blockType",

        mediaLayout:
          "mediaLayout",
      },

      prepare({
        blockType,
        mediaLayout,
      }) {
        return {
          title:
            blockType ===
            "media"
              ? "Media Block"
              : "Text Block",

          subtitle:
            blockType ===
            "media"
              ? `${
                  mediaLayout ||
                  "one"
                } column layout`
              : undefined,
        };
      },
    },
  });


/* ================================================================
   SECTION
================================================================ */

const caseStudySection =
  defineArrayMember({
    name:
      "caseStudySection",

    title:
      "Case Study Section",

    type:
      "object",

    fields: [

      defineField({
        name:
          "title",

        title:
          "Section Title",

        type:
          "string",

        validation:
          (Rule) =>
            Rule.required(),
      }),


      defineField({
        name:
          "anchor",

        title:
          "Section Anchor",

        type:
          "slug",

        description:
          "Generate this from the section title.",

        options: {
          source:
            (
              doc,
              context
            ) => {

              const parent =
                context.parent as {
                  title?: string;
                };


              return (
                parent?.title ||
                ""
              );
            },

          maxLength:
            96,
        },

        validation:
          (Rule) =>
            Rule.required(),
      }),


      defineField({
        name:
          "content",

        title:
          "Section Content",

        type:
          "array",

        of: [
          caseStudyContentBlock,
        ],
      }),
    ],

    preview: {
      select: {
        title:
          "title",
      },

      prepare({
        title,
      }) {
        return {
          title:
            title ||
            "Untitled Section",

          subtitle:
            "Case Study Section",
        };
      },
    },
  });


/* ================================================================
   DESIGN DOCUMENT
================================================================ */

export const designItem =
  defineType({
    name:
      "designItem",

    title:
      "Design",

    type:
      "document",

    fields: [

      defineField({
        name:
          "title",

        title:
          "Title",

        type:
          "string",

        validation:
          (Rule) =>
            Rule.required(),
      }),


      defineField({
        name:
          "category",

        title:
          "Category",

        type:
          "string",

        options: {
          list: [
            {
              title: "Case studies",
              value: "case-studies",
            },

            {
              title: "Product",
              value: "product",
            },

            {
              title: "Framer Development",
              value: "framer-development",
            },

            {
              title: "Brand",
              value: "brand",
            },

            {
              title: "Poster",
              value: "poster",
            },

            {
              title: "Custom Graphics",
              value: "custom-graphics",
            },

            {
              title: "Social Media Graphics",
              value: "social-media-graphics",
            },

            {
              title: "Print Out",
              value: "print-out",
            },

            {
              title: "Explorations",
              value: "explorations",
            },

            {
              title: "Icons",
              value: "icons",
            },

            {
              title: "Video Editing",
              value: "video-editing",
            },

            {
              title: "Motion Graphics",
              value: "motion-graphics",
            },

            {
              title: "Packaging Designs",
              value: "packaging-designs",
            },
          ],
        },

        validation:
          (Rule) =>
            Rule.required(),
      }),


      defineField({
        name:
          "caseStudySlug",

        title:
          "Case Study Page Slug",

        type:
          "slug",

        options: {
          source:
            "title",

          maxLength:
            96,
        },

        hidden:
          ({ parent }) =>
            parent?.category !==
            "case-studies",

        validation:
          (Rule) =>
            Rule.custom(
              (
                value,
                context
              ) => {

                const parent =
                  context.parent as {
                    category?: string;
                  };


                if (
                  parent?.category ===
                    "case-studies" &&
                  !value?.current
                ) {
                  return "A page slug is required for case studies.";
                }


                return true;
              }
            ),
      }),


      defineField({
        name:
          "status",

        title:
          "Website Status",

        type:
          "string",

        options: {
          list: [
            {
              title: "Draft",
              value: "draft",
            },

            {
              title: "Published",
              value: "published",
            },
          ],

          layout:
            "radio",

          direction:
            "horizontal",
        },

        initialValue:
          "draft",

        validation:
          (Rule) =>
            Rule.required(),
      }),


      defineField({
        name:
          "mediaType",

        title:
          "Card Media Type",

        type:
          "string",

        options: {
          list: [
            {
              title: "Image / GIF",
              value: "image",
            },

            {
              title: "Video",
              value: "video",
            },

            {
              title: "Interactive Project / Component",
              value: "embed",
            },
          ],

          layout:
            "radio",

          direction:
            "horizontal",
        },

        initialValue:
          "image",

        validation:
          (Rule) =>
            Rule.required().custom(
              (value, context) => {
                const parent =
                  context.parent as {
                    category?: string;
                  };

                if (
                  parent?.category ===
                    "case-studies" &&
                  value === "embed"
                ) {
                  return "Case study cards must use an image/GIF or video cover.";
                }

                return true;
              }
            ),
      }),


      defineField({
        name:
          "image",

        title:
          "Card Image / GIF",

        type:
          "image",

        options: {
          hotspot:
            false,
        },

        hidden:
          ({ parent }) =>
            parent?.mediaType !==
            "image",
      }),


      defineField({
        name:
          "video",

        title:
          "Card Video",

        type:
          "file",

        options: {
          accept:
            "video/*",
        },

        hidden:
          ({ parent }) =>
            parent?.mediaType !==
            "video",
      }),


      defineField({
        name:
          "embedUrl",

        title:
          "Interactive Project / Component URL",

        type:
          "url",

        description:
          "Paste the live HTTPS URL for the project or component. It will open interactively inside the portfolio.",

        hidden:
          ({ parent }) =>
            parent?.mediaType !==
            "embed",

        validation:
          (Rule) =>
            Rule.uri({
              scheme: ["http", "https"],
            }).custom(
              (value, context) => {
                const parent =
                  context.parent as {
                    mediaType?: string;
                  };

                if (
                  parent?.mediaType ===
                    "embed" &&
                  !value
                ) {
                  return "Please paste the live project/component URL.";
                }

                return true;
              }
            ),
      }),


      defineField({
        name:
          "alt",

        title:
          "Card Alternative Text",

        type:
          "string",
      }),


      defineField({
        name:
          "order",

        title:
          "Display Order",

        type:
          "number",

        validation:
          (Rule) =>
            Rule
              .required()
              .integer()
              .min(1),
      }),


      defineField({
        name:
          "caseStudyCompany",

        title:
          "Company",

        type:
          "string",

        hidden:
          ({ parent }) =>
            parent?.category !==
            "case-studies",
      }),


      defineField({
        name:
          "caseStudySubtitle",

        title:
          "Case Study Subtitle",

        type:
          "string",

        hidden:
          ({ parent }) =>
            parent?.category !==
            "case-studies",
      }),


      defineField({
        name:
          "caseStudyMeta",

        title:
          "Case Study Metadata",

        type:
          "string",

        hidden:
          ({ parent }) =>
            parent?.category !==
            "case-studies",
      }),


      defineField({
        name:
          "caseStudyHeroMedia",

        title:
          "Case Study Hero Media",

        type:
          "object",

        hidden:
          ({ parent }) =>
            parent?.category !==
            "case-studies",

        fields: [

          defineField({
            name:
              "mediaType",

            title:
              "Media Type",

            type:
              "string",

            options: {
              list: [
                {
                  title:
                    "Image / GIF",

                  value:
                    "image",
                },

                {
                  title:
                    "Video",

                  value:
                    "video",
                },
              ],

              layout:
                "radio",

              direction:
                "horizontal",
            },

            initialValue:
              "image",
          }),


          defineField({
            name:
              "image",

            title:
              "Image / GIF",

            type:
              "image",

            options: {
              hotspot:
                false,
            },

            hidden:
              ({ parent }) =>
                parent?.mediaType !==
                "image",
          }),


          defineField({
            name:
              "video",

            title:
              "Video",

            type:
              "file",

            options: {
              accept:
                "video/*",
            },

            hidden:
              ({ parent }) =>
                parent?.mediaType !==
                "video",
          }),


          defineField({
            name:
              "alt",

            title:
              "Alternative Text",

            type:
              "string",
          }),
        ],
      }),


      defineField({
        name:
          "caseStudySections",

        title:
          "Case Study Sections",

        description:
          "Add sections in the order they should appear. They automatically populate the left navigation.",

        type:
          "array",

        of: [
          caseStudySection,
        ],

        hidden:
          ({ parent }) =>
            parent?.category !==
            "case-studies",

        validation:
          (Rule) =>
            Rule.custom(
              (
                value,
                context
              ) => {

                const parent =
                  context.parent as {
                    category?: string;
                  };


                if (
                  parent?.category ===
                    "case-studies" &&
                  (
                    !Array.isArray(
                      value
                    ) ||
                    value.length ===
                      0
                  )
                ) {
                  return "Add at least one case study section.";
                }


                return true;
              }
            ),
      }),
    ],


    orderings: [
      {
        title:
          "Display Order",

        name:
          "displayOrder",

        by: [
          {
            field:
              "order",

            direction:
              "asc",
          },
        ],
      },
    ],


    preview: {
      select: {
        title:
          "title",

        media:
          "image",

        category:
          "category",

        status:
          "status",
      },

      prepare({
        title,
        media,
        category,
        status,
      }) {
        return {
          title:
            title ||
            "Untitled",

          subtitle:
            `${
              status ===
              "published"
                ? "● Published"
                : "○ Draft"
            } · ${
              category ||
              ""
            }`,

          media,
        };
      },
    },
  });