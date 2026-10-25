import { defineField, defineType } from "sanity";

export const homeGalleryItem = defineType({
  name: "homeGalleryItem",
  title: "Home Gallery",
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
        "Draft items stay hidden. Published items appear on the homepage.",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
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
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
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
        hotspot: false,
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
        "Describe the media for accessibility.",
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "1 appears first, 2 appears second, and so on.",
      validation: (Rule) =>
        Rule.required().integer().min(1),
    }),
  ],

  orderings: [
    {
      title: "Display Order",
      name: "displayOrder",
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
      order: "order",
    },

    prepare({
      title,
      media,
      mediaType,
      status,
      order,
    }) {
      return {
        title: `${order ?? "-"} · ${title || "Untitled"}`,
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