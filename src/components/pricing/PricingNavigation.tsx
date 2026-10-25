"use client";

import {
  useEffect,
  useRef,
} from "react";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  pricingServices,
} from "@/data/pricingServices";


export default function PricingNavigation() {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const shortcutPosition =
    useRef<
      Record<string, number>
    >({});


  const currentSlug =
    pathname
      .replace(
        "/pricing/",
        ""
      )
      .split("/")[0];


  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      const target =
        event.target as HTMLElement;


      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }


      const key =
        event.key.toUpperCase();


      const matches =
        pricingServices.filter(
          (service) =>
            service.shortcut === key
        );


      if (
        matches.length === 0
      ) {
        return;
      }


      event.preventDefault();


      const currentIndex =
        matches.findIndex(
          (service) =>
            service.slug ===
            currentSlug
        );


      let nextIndex: number;


      if (
        currentIndex >= 0
      ) {
        nextIndex =
          (currentIndex + 1) %
          matches.length;
      } else {
        const remembered =
          shortcutPosition
            .current[key] ??
          -1;


        nextIndex =
          (remembered + 1) %
          matches.length;
      }


      shortcutPosition
        .current[key] =
        nextIndex;


      router.push(
        `/pricing/${matches[nextIndex].slug}`
      );
    };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    router,
    currentSlug,
  ]);


  return (
    <nav
      className="pricing-navigation"
      aria-label="Pricing services"
    >

      {pricingServices.map(
        (service) => {

          const active =
            currentSlug ===
            service.slug;


          return (
            <Link
              key={
                service.slug
              }
              href={
                `/pricing/${service.slug}`
              }
              className={`pricing-nav-item ${
                active
                  ? "active"
                  : ""
              }`}
            >

              <kbd className="pricing-shortcut">
                {
                  service.shortcut
                }
              </kbd>


              <span>
                {
                  service.name
                }
              </span>

            </Link>
          );
        }
      )}

    </nav>
  );
}