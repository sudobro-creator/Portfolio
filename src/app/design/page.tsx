import DesignNavigation from "@/components/design/DesignNavigation";

import DesignGallery, {
  type DesignItem,
} from "@/components/design/DesignGallery";

import SidebarFooter from "@/components/SidebarFooter";

import {
  sanityClient,
} from "@/sanity/client";

import {
  ALL_DESIGNS_QUERY,
} from "@/sanity/queries";


export default async function DesignPage() {

  const designs =
    await sanityClient.fetch<
      DesignItem[]
    >(
      ALL_DESIGNS_QUERY
    );


  return (
    <main className="design-page">

      {/* ============================================================
          LEFT SIDE
      ============================================================= */}

      <aside className="design-sidebar">

        <div className="design-sidebar-navigation">

          <DesignNavigation />

        </div>


        {/* SHARED FOOTER */}

        <SidebarFooter />

      </aside>


      {/* ============================================================
          RIGHT SIDE
      ============================================================= */}

      <section className="design-gallery">

        <DesignGallery
          items={designs}
        />

      </section>

    </main>
  );
}