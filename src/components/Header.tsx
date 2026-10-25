"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  Menu,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import LanguageSwitcher from "@/components/LanguageSwitcher";


const navigation = [
  {
    label:
      "Home",

    href:
      "/",
  },

  {
    label:
      "Design",

    href:
      "/design",
  },

  {
    label:
      "Pricing",

    href:
      "/pricing",
  },

  {
    label:
      "About",

    href:
      "/about",
  },
];


export default function Header() {
  const pathname =
    usePathname();


  const [
    mobileOpen,
    setMobileOpen,
  ] =
    useState(false);


  /* ==============================================================
     CLOSE MOBILE MENU AFTER ROUTE CHANGE
  =============================================================== */

  useEffect(() => {
    setMobileOpen(
      false
    );
  }, [
    pathname,
  ]);


  /* ==============================================================
     BODY SCROLL
  =============================================================== */

  useEffect(() => {
    if (!mobileOpen) {
      document
        .body
        .style
        .overflow =
        "";

      return;
    }


    document
      .body
      .style
      .overflow =
      "hidden";


    return () => {
      document
        .body
        .style
        .overflow =
        "";
    };
  }, [
    mobileOpen,
  ]);


  /* ==============================================================
     ACTIVE ROUTE
  =============================================================== */

  const isActive = (
    href:
      string
  ) => {

    if (
      href === "/"
    ) {
      return (
        pathname ===
        "/"
      );
    }


    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`
      )
    );
  };


  return (
    <>

      <header className="site-header">

        {/* ========================================================
            LOGO
        ======================================================== */}

        <Link
          href="/"
          className="brand"
          aria-label="Gizkidesigns home"
          data-no-translate
        >

          <span
            className="brand-mark"
            aria-hidden="true"
          >

            <span className="mark-black">
              G
            </span>

            <span className="mark-pink">
              G
            </span>

          </span>


          <span className="brand-name">
            GIZKIDESIGNS
          </span>

        </Link>


        {/* ========================================================
            DESKTOP
        ======================================================== */}

        <div className="desktop-header-right">

          <nav
            className="desktop-nav"
            aria-label="Main navigation"
          >

            {navigation.map(
              (
                item
              ) => (

                <Link
                  key={
                    item.href
                  }
                  href={
                    item.href
                  }
                  className={
                    isActive(
                      item.href
                    )
                      ? "active"
                      : ""
                  }
                >
                  {
                    item.label
                  }
                </Link>

              )
            )}

          </nav>


          <LanguageSwitcher />

        </div>


        {/* ========================================================
            TABLET / MOBILE
        ======================================================== */}

        <div className="mobile-header-right">

          <LanguageSwitcher
            compact
          />


          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={
              mobileOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={
              mobileOpen
            }
            aria-controls="mobile-navigation"
            onClick={() =>
              setMobileOpen(
                (
                  current
                ) =>
                  !current
              )
            }
          >

            {mobileOpen ? (

              <X
                size={25}
                strokeWidth={
                  1.7
                }
              />

            ) : (

              <Menu
                size={25}
                strokeWidth={
                  1.7
                }
              />

            )}

          </button>

        </div>

      </header>


      {/* ==========================================================
          MOBILE NAVIGATION
      ========================================================== */}

      <div
        id="mobile-navigation"
        className={`mobile-navigation ${
          mobileOpen
            ? "open"
            : ""
        }`}
        aria-hidden={
          !mobileOpen
        }
      >

        <nav
          className="mobile-navigation-links"
          aria-label="Mobile navigation"
        >

          {navigation.map(
            (
              item
            ) => {

              const active =
                isActive(
                  item.href
                );


              return (
                <Link
                  key={
                    item.href
                  }
                  href={
                    item.href
                  }
                  className={
                    active
                      ? "active"
                      : ""
                  }
                >

                  <span>
                    {
                      item.label
                    }
                  </span>


                  <span
                    className="mobile-nav-indicator"
                    aria-hidden="true"
                  />

                </Link>
              );
            }
          )}

        </nav>


        <div
          className="mobile-navigation-footer"
          data-no-translate
        >

          <span>
            Gizkidesigns
          </span>

          <span>
            © 2026
          </span>

        </div>

      </div>


      {mobileOpen && (

        <button
          type="button"
          className="mobile-navigation-overlay"
          aria-label="Close navigation"
          onClick={() =>
            setMobileOpen(
              false
            )
          }
        />

      )}

    </>
  );
}