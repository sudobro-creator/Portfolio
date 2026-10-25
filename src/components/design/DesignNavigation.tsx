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
  designCategories,
} from "@/data/designCategories";


export default function DesignNavigation() {
  const router =
    useRouter();

  const pathname =
    usePathname();


  /*
   * Remembers where we currently are
   * for duplicate keyboard shortcuts.
   *
   * Example:
   *
   * P:
   * Product → Poster → Print Out → Product
   */

  const shortcutPosition =
    useRef<
      Record<string, number>
    >({});


  const currentSlug =
    pathname === "/design"
      ? "all"
      : pathname
          .replace(
            "/design/",
            ""
          )
          .split("/")[0];


  useEffect(() => {

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {

      /*
       * Don't trigger portfolio
       * shortcuts while typing.
       */

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
        event.key
          .toUpperCase();


      /*
       * A = All
       */

      if (key === "A") {

        event.preventDefault();

        router.push(
          "/design"
        );

        return;
      }


      /*
       * Find every category using
       * this keyboard shortcut.
       */

      const matches =
        designCategories.filter(
          (category) =>
            category.shortcut ===
            key
        );


      if (
        matches.length === 0
      ) {
        return;
      }


      event.preventDefault();


      /*
       * Work out where we currently
       * are within this shortcut group.
       */

      const currentIndex =
        matches.findIndex(
          (category) =>
            category.slug ===
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
        `/design/${matches[nextIndex].slug}`
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
      className="design-navigation"
      aria-label="Design categories"
    >

      {/* ALL */}

      <Link
        href="/design"
        className={`design-nav-item design-nav-all ${
          currentSlug === "all"
            ? "active"
            : ""
        }`}
      >

        <span className="design-all-line" />

        <span>
          All
        </span>

      </Link>


      {/* CATEGORIES */}

      {designCategories.map(
        (category) => {

          const active =
            currentSlug ===
            category.slug;


          return (
            <Link
              key={
                category.slug
              }
              href={
                `/design/${category.slug}`
              }
              className={`design-nav-item ${
                active
                  ? "active"
                  : ""
              }`}
            >

              <kbd className="design-shortcut">

                {
                  category.shortcut
                }

              </kbd>


              <span>
                {
                  category.name
                }
              </span>

            </Link>
          );
        }
      )}

    </nav>
  );
}