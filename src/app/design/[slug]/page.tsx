import {
  notFound,
} from "next/navigation";

import DesignNavigation from "@/components/design/DesignNavigation";

import DesignGallery, {
  type DesignItem,
} from "@/components/design/DesignGallery";

import SidebarFooter from "@/components/SidebarFooter";

import {
  designCategories,
} from "@/data/designCategories";

import {
  sanityClient,
} from "@/sanity/client";

import {
  DESIGNS_BY_CATEGORY_QUERY,
} from "@/sanity/queries";


type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};


export default async function DesignCategoryPage({
  params,
}: PageProps) {

  const {
    slug,
  } =
    await params;


  const category =
    designCategories.find(
      (item) =>
        item.slug === slug
    );


  if (!category) {
    notFound();
  }


  const designs =
    await sanityClient.fetch<
      DesignItem[]
    >(
      DESIGNS_BY_CATEGORY_QUERY,
      {
        category:
          category.slug,
      }
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