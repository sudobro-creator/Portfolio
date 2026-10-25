"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Check,
  ChevronDown,
} from "lucide-react";

import {
  useLanguage,
} from "@/i18n/LanguageProvider";

import {
  languageNames,
  languageShortNames,
  type Language,
} from "@/i18n/types";


const languageOptions:
  Language[] = [
    "en",
    "fr",
    "de",
  ];


export default function LanguageSwitcher({
  compact = false,
}: {
  compact?: boolean;
}) {
  const {
    language,
    setLanguage,
  } =
    useLanguage();


  const [
    open,
    setOpen,
  ] =
    useState(false);


  const wrapperRef =
    useRef<HTMLDivElement>(
      null
    );


  /* ==============================================================
     OUTSIDE CLICK
  =============================================================== */

  useEffect(() => {
    const handleClickOutside = (
      event:
        MouseEvent
    ) => {

      const target =
        event.target;


      if (
        !(
          target instanceof
          Node
        )
      ) {
        return;
      }


      if (
        wrapperRef.current &&
        !wrapperRef.current
          .contains(
            target
          )
      ) {
        setOpen(false);
      }
    };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);


  /* ==============================================================
     ESCAPE
  =============================================================== */

  useEffect(() => {
    const handleEscape = (
      event:
        KeyboardEvent
    ) => {

      if (
        event.key ===
        "Escape"
      ) {
        setOpen(false);
      }
    };


    document.addEventListener(
      "keydown",
      handleEscape
    );


    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);


  /* ==============================================================
     SELECT
  =============================================================== */

  const selectLanguage = (
    nextLanguage:
      Language
  ) => {

    if (
      nextLanguage ===
      language
    ) {
      setOpen(false);

      return;
    }


    setLanguage(
      nextLanguage
    );


    setOpen(false);
  };


  return (
    <div
      ref={wrapperRef}
      className="language-switcher"
      data-no-translate
    >

      <button
        type="button"
        className={
          compact
            ? "mobile-language"
            : "language"
        }
        aria-label="Select language"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() =>
          setOpen(
            (current) =>
              !current
          )
        }
      >

        <span>
          {compact
            ? languageShortNames[
                language
              ]
            : languageNames[
                language
              ]}
        </span>


        <ChevronDown
          size={
            compact
              ? 16
              : 18
          }
          strokeWidth={1.8}
          className={
            open
              ? "language-chevron open"
              : "language-chevron"
          }
        />

      </button>


      {open && (

        <div
          className={
            compact
              ? "language-menu language-menu-mobile"
              : "language-menu"
          }
          role="menu"
          aria-label="Languages"
        >

          {languageOptions.map(
            (
              option
            ) => {

              const active =
                option ===
                language;


              return (
                <button
                  key={
                    option
                  }
                  type="button"
                  role="menuitemradio"
                  aria-checked={
                    active
                  }
                  className={`language-option ${
                    active
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    selectLanguage(
                      option
                    )
                  }
                >

                  <span>
                    {
                      languageNames[
                        option
                      ]
                    }
                  </span>


                  {active && (

                    <Check
                      size={17}
                      strokeWidth={
                        1.8
                      }
                    />

                  )}

                </button>
              );
            }
          )}

        </div>

      )}

    </div>
  );
}