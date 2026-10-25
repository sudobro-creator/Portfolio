import {
  defineField,
  defineType,
} from "sanity";

export const pricingService =
  defineType({
    name: "pricingService",
    title: "Pricing",
    type: "document",

    fields: [
      defineField({
        name: "service",
        title: "Service",
        type: "string",

        options: {
          list: [
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
              title: "Video Editing",
              value: "video-editing",
            },
            {
              title: "Motion Graphics",
              value: "motion-graphics",
            },
          ],
        },

        validation: (Rule) =>
          Rule.required(),
      }),

      defineField({
        name: "status",
        title: "Website Status",
        type: "string",

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

        validation: (Rule) =>
          Rule.required(),
      }),

      /* ============================================================
         STANDARD
      ============================================================ */

      defineField({
        name: "standardTitle",
        title: "Standard Card Title",
        type: "string",

        initialValue: "Standard",

        validation: (Rule) =>
          Rule.required(),
      }),

      defineField({
        name: "standardIcon",
        title: "Standard Card Icon",
        type: "image",

        options: {
          hotspot: false,
        },
      }),

      defineField({
        name: "standardDescription",
        title: "Standard Description",
        type: "text",
        rows: 4,

        validation: (Rule) =>
          Rule.required(),
      }),

      defineField({
        name: "standardPrice",
        title: "Standard Price",
        type: "string",

        description:
          "Example: $2500",

        validation: (Rule) =>
          Rule.required(),
      }),

      defineField({
        name: "standardDeliverables",
        title: "Standard Deliverables",
        type: "array",

        of: [
          {
            type: "string",
          },
        ],

        validation: (Rule) =>
          Rule.required().min(1),
      }),

      /* ============================================================
         TAILORED
      ============================================================ */

      defineField({
        name: "tailoredTitle",
        title: "Tailored Card Title",
        type: "string",

        initialValue: "Tailored",

        validation: (Rule) =>
          Rule.required(),
      }),

      defineField({
        name: "tailoredIcon",
        title: "Tailored Card Icon",
        type: "image",

        options: {
          hotspot: false,
        },
      }),

      defineField({
        name: "tailoredDescription",
        title: "Tailored Description",
        type: "text",
        rows: 4,

        initialValue:
          "Have a project that doesn't quite fit the Standard package? Tell me what you're looking to create, and I'll put together a scope that works for you.",

        validation: (Rule) =>
          Rule.required(),
      }),

      defineField({
        name: "tailoredPriceText",
        title: "Tailored Price Text",
        type: "string",

        initialValue: "Let’s Talk",

        validation: (Rule) =>
          Rule.required(),
      }),

      defineField({
        name: "meetingUrl",
        title: "Book a Meeting URL",
        type: "url",

        validation: (Rule) =>
          Rule.required(),
      }),
    ],

    preview: {
      select: {
        service: "service",
        price: "standardPrice",
        status: "status",
        media: "standardIcon",
      },

      prepare({
        service,
        price,
        status,
        media,
      }) {
        return {
          title:
            service || "Pricing",

          subtitle: `${
            status === "published"
              ? "● Published"
              : "○ Draft"
          } · ${price || ""}`,

          media,
        };
      },
    },
  });