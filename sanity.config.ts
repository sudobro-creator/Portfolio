import {
  defineConfig,
} from "sanity";

import {
  structureTool,
} from "sanity/structure";

import {
  visionTool,
} from "@sanity/vision";

import {
  schemaTypes,
} from "./src/sanity/schemaTypes";


export default defineConfig({
  name: "default",

  title: "Gizkidesigns",

  projectId: "w6a33f8n",

  dataset: "production",

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types:
      schemaTypes,
  },
});