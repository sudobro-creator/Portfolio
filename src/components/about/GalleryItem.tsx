"use client";

import { useState } from "react";
import type { GalleryMedia } from "./AboutGallery";

export default function GalleryItem({
  item,
}: {
  item: GalleryMedia;
}) {
  const [loaded, setLoaded] = useState(false);

  if (item.mediaType === "video") {
    const videoUrl = item.video?.asset?.url;

    if (!videoUrl) return null;

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

  const imageUrl = item.image?.asset?.url;

  if (!imageUrl) return null;

  const dimensions =
    item.image?.asset?.metadata?.dimensions;

  return (
    <button
      type="button"
      className="masonry-item masonry-button"
      aria-label={`View ${item.alt || item.title || "image"}`}
    >
      <img
        src={imageUrl}
        alt={item.alt || item.title || ""}
        width={dimensions?.width}
        height={dimensions?.height}
        loading="lazy"
        className={`masonry-media ${
          loaded ? "media-loaded" : ""
        }`}
        onLoad={() => setLoaded(true)}
      />
    </button>
  );
}