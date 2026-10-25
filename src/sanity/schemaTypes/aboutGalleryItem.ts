import { defineField, defineType } from "sanity";

export const aboutGalleryItem = defineType({
  name: "aboutGalleryItem",
  title: "About Gallery",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "status",
      title: "Website Status",
      type: "string",

      description:
        "Choose whether this item should appear on the live website.",

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

        layout: "radio",
        direction: "horizontal",
      },

      initialValue: "draft",

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",

      options: {
        list: [
          {
            title: "Image",
            value: "image",
          },
          {
            title: "Video",
            value: "video",
          },
        ],

        layout: "radio",
        direction: "horizontal",
      },

      initialValue: "image",

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",

      options: {
        hotspot: true,
      },

      hidden: ({ parent }) =>
        parent?.mediaType !== "image",

      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {
            mediaType?: string;
          };

          if (
            parent?.mediaType === "image" &&
            !value
          ) {
            return "Please upload an image.";
          }

          return true;
        }),
    }),

    defineField({
      name: "video",
      title: "Video",
      type: "file",

      options: {
        accept: "video/*",
      },

      hidden: ({ parent }) =>
        parent?.mediaType !== "video",

      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {
            mediaType?: string;
          };

          if (
            parent?.mediaType === "video" &&
            !value
          ) {
            return "Please upload a video.";
          }

          return true;
        }),
    }),

    defineField({
      name: "alt",
      title: "Alternative Text",
      type: "string",

      description:
        "Describe this image or video for accessibility.",
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",

      description:
        "Lower numbers appear first. Example: 1, 2, 3, 4.",

      validation: (Rule) =>
        Rule.min(0).integer(),
    }),
  ],

  orderings: [
    {
      title: "Display Order",
      name: "galleryOrder",

      by: [
        {
          field: "order",
          direction: "asc",
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
      mediaType: "mediaType",
      status: "status",
    },

    prepare({
      title,
      media,
      mediaType,
      status,
    }) {
      return {
        title: title || "Untitled",

        subtitle: `${
          status === "published"
            ? "● Published"
            : "○ Draft"
        } · ${
          mediaType === "video"
            ? "Video"
            : "Image"
        }`,

        media,
      };
    },
  },
});