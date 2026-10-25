import {
  Video,
} from "lucide-react";

import AboutGallery, {
  type GalleryMediaItem,
} from "@/components/about/AboutGallery";

import SidebarFooter from "@/components/SidebarFooter";

import {
  sanityClient,
} from "@/sanity/client";

import {
  ABOUT_GALLERY_QUERY,
} from "@/sanity/queries";


export const revalidate = 60;


export default async function AboutPage() {

  const gallery =
    await sanityClient.fetch<
      GalleryMediaItem[]
    >(
      ABOUT_GALLERY_QUERY
    );


  return (
    <main className="about-page">

      {/* ============================================================
          LEFT SIDE
      ============================================================= */}

      <aside className="about-sidebar">

        <div className="about-copy">

          <p>
            This journey began in 2019.
          </p>


          <p>
            Since then, I've worked with founders and
            brands across fintech, e-commerce, and
            consumer products starting with pencil art,
            then moving to illustration, brand identity,
            social content, and eventually product design.
          </p>


          <p>
            That foundation shaped how I think:
          </p>


          <p>
            Design isn't just how something looks, it's
            how it solves a problem, communicates an idea
            clearly, and connects a brand to the people
            using it.
          </p>


          <p>
            When a product, pitch deck, or website feels
            intentional, it signals competence that the
            thinking has been done.
          </p>


          <p>
            I am also passionate about mentoring the next
            generation of creatives and building a
            supportive design community.
          </p>


          <p>
            I charge $3K–$5K USD/month.

            <br />

            Projects typically run 3–6 weeks.
          </p>


          <a
            href="https://cal.com/"
            target="_blank"
            rel="noreferrer"
            className="button button-primary about-book"
          >

            <Video
              size={17}
              strokeWidth={1.8}
            />

            <span>
              Book a call
            </span>

          </a>

        </div>


        {/* SHARED FOOTER */}

        <SidebarFooter />

      </aside>


      {/* ============================================================
          RIGHT SIDE
      ============================================================= */}

      <section className="about-gallery-container">

        <AboutGallery
          items={gallery}
        />

      </section>

    </main>
  );
}