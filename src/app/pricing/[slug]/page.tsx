import {
  notFound,
} from "next/navigation";

import PricingNavigation from "@/components/pricing/PricingNavigation";

import PricingCards, {
  type PricingData,
} from "@/components/pricing/PricingCards";

import SidebarFooter from "@/components/SidebarFooter";

import {
  pricingServices,
} from "@/data/pricingServices";

import {
  sanityClient,
} from "@/sanity/client";

import {
  PRICING_SERVICE_QUERY,
} from "@/sanity/queries";


type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};


export default async function PricingServicePage({
  params,
}: PageProps) {

  const {
    slug,
  } =
    await params;


  const service =
    pricingServices.find(
      (item) =>
        item.slug === slug
    );


  if (!service) {
    notFound();
  }


  const pricing =
    await sanityClient.fetch<
      PricingData | null
    >(
      PRICING_SERVICE_QUERY,
      {
        service:
          service.slug,
      }
    );


  return (
    <main className="pricing-page">

      {/* ============================================================
          LEFT SIDE
      ============================================================= */}

      <aside className="pricing-sidebar">

        <div className="pricing-sidebar-navigation">

          <PricingNavigation />

        </div>


        {/* SHARED FOOTER */}

        <SidebarFooter />

      </aside>


      {/* ============================================================
          RIGHT SIDE
      ============================================================= */}

      <section className="pricing-content">

        {pricing ? (

          <PricingCards
            pricing={pricing}
          />

        ) : (

          <div className="pricing-empty">

            <p>
              Pricing for {service.name} has not been published yet.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}