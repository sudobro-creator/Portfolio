import {
  MessageCircle,
  Video,
} from "lucide-react";

import HomeGallery, {
  type HomeGalleryItem,
} from "@/components/home/HomeGallery";

import SidebarFooter from "@/components/SidebarFooter";

import {
  sanityClient,
} from "@/sanity/client";

import {
  HOME_GALLERY_QUERY,
} from "@/sanity/queries";


export default async function Home() {

  const gallery =
    await sanityClient.fetch<
      HomeGalleryItem[]
    >(
      HOME_GALLERY_QUERY
    );


  return (
    <main className="home">

      {/* ============================================================
          LEFT SIDE
      ============================================================= */}

      <aside className="profile-panel">

        <div className="profile-content">

          <p className="role">
            Staff Product Designer · Product Strategy · Systems
          </p>


          <h1 className="hero-title">

            I design products

            <br />

            <span>
              make complex things
            </span>

            <br />

            feel simple.

          </h1>


          <p className="hero-description">

            I’m a Product Designer and Design Engineer. I solve product problems, design how things should work, and get involved in building them too.

          </p>


          <div className="hero-actions">

            <a
              href="https://cal.com/"
              target="_blank"
              rel="noreferrer"
              className="button button-primary"
            >

              <Video
                size={17}
                strokeWidth={1.8}
              />

              <span>
                Book a call
              </span>

            </a>


            <a
              href="mailto:gizkidesigns@gmail.com"
              className="button button-secondary"
            >

              <MessageCircle
                size={17}
                strokeWidth={1.8}
                className="pink-icon"
              />

              <span>
                Let’s Chat
              </span>

            </a>

          </div>

        </div>


        {/* SHARED FOOTER */}

        <SidebarFooter />

      </aside>


      {/* ============================================================
          RIGHT SIDE
      ============================================================= */}

      <section className="project-gallery">

        {gallery.length > 0 ? (

          <HomeGallery
            items={gallery}
          />

        ) : (

          <div className="home-gallery-empty">

            <p>
              No homepage projects have been published yet.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}