import { createClient } from "next-sanity";

/* ================================================================
   SANITY CONFIGURATION

   Environment variables are used in production.

   The known Gizkidesigns values are used as fallbacks so that
   builds do not fail if an environment variable is temporarily
   unavailable.
================================================================ */

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "w6a33f8n";

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2026-10-13";


/* ================================================================
   SANITY CLIENT
================================================================ */

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,

  useCdn:
    process.env.NODE_ENV === "production",

  perspective:
    "published",
});


/* ================================================================
   DEFAULT EXPORT

   Keep this as well in case another existing file imports
   the client as a default import.
================================================================ */

export default sanityClient;