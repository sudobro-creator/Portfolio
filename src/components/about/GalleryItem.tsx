"use client";

import { useState } from "react";

import type {
  GalleryMediaItem,
} from "./AboutGallery";


/* ================================================================
   GALLERY ITEM
================================================================ */

export default function GalleryItem({
  item,
}: {
  item: GalleryMediaItem;
}) {
  const [
    loaded,
    setLoaded,
  ] = useState(false);


  /* ==============================================================
     VIDEO
  =============================================================== */

  if (
    item.mediaType ===
    "video"
  ) {
    const videoUrl =
      item.video
        ?.asset
        ?.url;


    if (!videoUrl) {
      return null;
    }


    return (
      <div className="masonry-item">

        <video
          className="masonry-media"
          src={videoUrl}
          controls
          playsInline
          preload="metadata"
        >
          Your browser does not support video.
        </video>

      </div>
    );
  }


  /* ==============================================================
     IMAGE
  =============================================================== */

  const imageUrl =
    item.image
      ?.asset
      ?.url;


  if (!imageUrl) {
    return null;
  }


  const dimensions =
    item.image
      ?.asset
      ?.metadata
      ?.dimensions;


  const altText =
    item.alt ||
    item.title ||
    "";


  /* ==============================================================
     RENDER IMAGE
  =============================================================== */

  return (
    <button
      type="button"
      className="masonry-item masonry-button"
      aria-label={
        `View ${
          altText ||
          "image"
        }`
      }
    >

      <img
        src={imageUrl}
        alt={altText}
        width={
          dimensions
            ?.width
        }
        height={
          dimensions
            ?.height
        }
        loading="lazy"
        className={`masonry-media ${
          loaded
            ? "media-loaded"
            : ""
        }`}
        onLoad={() =>
          setLoaded(true)
        }
      />

    </button>
  );
}