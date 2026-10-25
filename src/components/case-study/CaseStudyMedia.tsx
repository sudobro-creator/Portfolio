"use client";

import {
  useEffect,
  useRef,
} from "react";

import type {
  CaseStudyMedia as MediaType,
} from "./types";


export default function CaseStudyMedia({
  media,
}: {
  media: MediaType;
}) {
  const videoRef =
    useRef<HTMLVideoElement>(
      null
    );


  useEffect(() => {
    if (
      media.mediaType !==
      "video"
    ) {
      return;
    }


    const video =
      videoRef.current;


    if (!video) {
      return;
    }


    video
      .play()
      .catch(() => {
        /*
         * Some browsers can still
         * reject autoplay.
         *
         * The video remains available
         * and can start once interacted
         * with.
         */
      });

  }, [
    media.mediaType,
  ]);


  /* ==============================================================
     IMAGE / GIF
  =============================================================== */

  if (
    media.mediaType ===
      "image" &&
    media.image
      ?.asset
      ?.url
  ) {
    return (
      <img
        src={
          media.image
            .asset
            .url
        }
        alt={
          media.alt ||
          ""
        }
        className="case-study-content-media"
        loading="lazy"
      />
    );
  }


  /* ==============================================================
     VIDEO
  =============================================================== */

  if (
    media.mediaType ===
      "video" &&
    media.video
      ?.asset
      ?.url
  ) {
    return (
      <video
        ref={videoRef}
        src={
          media.video
            .asset
            .url
        }
        className="case-study-content-media"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }


  return null;
}