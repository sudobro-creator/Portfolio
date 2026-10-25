"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";

import {
  useLanguage,
} from "@/i18n/LanguageProvider";

import {
  translateCurrentPage,
} from "@/i18n/pageTranslator";


export default function PageTranslator() {
  const pathname =
    usePathname();


  const {
    language,
    isReady,
  } =
    useLanguage();


  const [
    translating,
    setTranslating,
  ] =
    useState(false);


  const requestId =
    useRef(0);


  useEffect(() => {
    if (!isReady) {
      return;
    }


    /*
     * English is the source language.
     *
     * When switching back from another language,
     * reloading restores the original React/Sanity
     * English content cleanly without translating
     * backwards.
     */

    if (
      language === "en"
    ) {
      const currentDocumentLanguage =
        document
          .documentElement
          .dataset
          .translatedLanguage;


      if (
        currentDocumentLanguage &&
        currentDocumentLanguage !==
          "en"
      ) {
        document
          .documentElement
          .dataset
          .translatedLanguage =
          "en";


        window.location.reload();
      }


      return;
    }


    const currentRequest =
      ++requestId.current;


    const controller =
      new AbortController();


    const run =
      async () => {

        setTranslating(
          true
        );


        document
          .documentElement
          .classList
          .add(
            "page-is-translating"
          );


        /*
         * Give React/Sanity a moment to finish rendering
         * the newly navigated page before collecting text.
         */

        await new Promise<void>(
          (resolve) => {
            window.requestAnimationFrame(
              () => {
                window.requestAnimationFrame(
                  () => {
                    resolve();
                  }
                );
              }
            );
          }
        );


        try {
          await translateCurrentPage({
            language,
            pathname,
            signal:
              controller.signal,
          });


          if (
            currentRequest ===
            requestId.current
          ) {
            document
              .documentElement
              .dataset
              .translatedLanguage =
              language;
          }

        } catch (error) {

          if (
            error instanceof
              DOMException &&
            error.name ===
              "AbortError"
          ) {
            return;
          }


          console.error(
            "Page translation failed:",
            error
          );

        } finally {

          if (
            currentRequest ===
            requestId.current
          ) {
            setTranslating(
              false
            );


            document
              .documentElement
              .classList
              .remove(
                "page-is-translating"
              );
          }
        }
      };


    run();


    return () => {
      controller.abort();

      document
        .documentElement
        .classList
        .remove(
          "page-is-translating"
        );
    };

  }, [
    language,
    pathname,
    isReady,
  ]);


  return (
    <div
      className={`translation-status ${
        translating
          ? "active"
          : ""
      }`}
      aria-live="polite"
      aria-hidden={
        !translating
      }
      data-no-translate
    >
      <span className="translation-status-dot" />
    </div>
  );
}