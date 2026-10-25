"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_EVENT,
  LANGUAGE_STORAGE_KEY,
  isLanguage,
  type Language,
} from "./types";


type LanguageContextValue = {
  language:
    Language;

  setLanguage:
    (
      language:
        Language
    ) => void;

  isReady:
    boolean;
};


const LanguageContext =
  createContext<
    LanguageContextValue
    | undefined
  >(undefined);


export function LanguageProvider({
  children,
}: {
  children:
    React.ReactNode;
}) {
  const [
    language,
    setLanguageState,
  ] =
    useState<Language>(
      DEFAULT_LANGUAGE
    );


  const [
    isReady,
    setIsReady,
  ] =
    useState(false);


  /* ==============================================================
     RESTORE SAVED LANGUAGE
  =============================================================== */

  useEffect(() => {
    const saved =
      window.localStorage
        .getItem(
          LANGUAGE_STORAGE_KEY
        );


    if (
      isLanguage(
        saved
      )
    ) {
      setLanguageState(
        saved
      );

      document
        .documentElement
        .lang =
        saved;
    } else {
      document
        .documentElement
        .lang =
        DEFAULT_LANGUAGE;
    }


    setIsReady(true);
  }, []);


  /* ==============================================================
     SET LANGUAGE
  =============================================================== */

  const setLanguage =
    useCallback(
      (
        nextLanguage:
          Language
      ) => {

        setLanguageState(
          nextLanguage
        );


        window.localStorage
          .setItem(
            LANGUAGE_STORAGE_KEY,
            nextLanguage
          );


        document
          .documentElement
          .lang =
          nextLanguage;


        window.dispatchEvent(
          new CustomEvent(
            LANGUAGE_EVENT,
            {
              detail: {
                language:
                  nextLanguage,
              },
            }
          )
        );
      },
      []
    );


  const value =
    useMemo(
      () => ({
        language,
        setLanguage,
        isReady,
      }),
      [
        language,
        setLanguage,
        isReady,
      ]
    );


  return (
    <LanguageContext.Provider
      value={value}
    >
      {children}
    </LanguageContext.Provider>
  );
}


export function useLanguage() {
  const context =
    useContext(
      LanguageContext
    );


  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider."
    );
  }


  return context;
}