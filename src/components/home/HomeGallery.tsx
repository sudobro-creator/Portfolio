"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

import {
  useRef,
} from "react";

import GalleryMedia from "@/components/gallery/GalleryMedia";


export type HomeGalleryItem = {
  _id: string;

  title: string;

  mediaType:
    | "image"
    | "video";

  alt?: string;

  order?: number;

  image?: {
    asset?: {
      url?: string;

      metadata?: {
        dimensions?: {
          width?: number;
          height?: number;
          aspectRatio?: number;
        };
      };
    };
  };

  video?: {
    asset?: {
      url?: string;
      mimeType?: string;
    };
  };
};


/* ================================================================
   EXPANDED VIDEO
================================================================ */

function ExpandedVideo({
  src,
}: {
  src: string;
}) {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] =
    useState(true);

  const [muted, setMuted] =
    useState(true);


  const togglePlay = () => {
    const video =
      videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play();

      setPlaying(true);
    } else {
      video.pause();

      setPlaying(false);
    }
  };


  const toggleMute = () => {
    const video =
      videoRef.current;

    if (!video) return;

    video.muted =
      !video.muted;

    setMuted(
      video.muted
    );
  };


  return (
    <div className="gallery-expanded-video">

      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="gallery-lightbox-video"
      />


      <div className="gallery-expanded-controls">

        <button
          type="button"
          onClick={togglePlay}
          className="gallery-video-control"
          aria-label={
            playing
              ? "Pause video"
              : "Play video"
          }
        >
          {playing ? (
            <Pause size={18} />
          ) : (
            <Play size={18} />
          )}
        </button>


        <button
          type="button"
          onClick={toggleMute}
          className="gallery-video-control"
          aria-label={
            muted
              ? "Unmute video"
              : "Mute video"
          }
        >
          {muted ? (
            <VolumeX size={18} />
          ) : (
            <Volume2 size={18} />
          )}
        </button>

      </div>

    </div>
  );
}


export default function HomeGallery({
  items,
}: {
  items: HomeGalleryItem[];
}) {
  const [
    selectedItem,
    setSelectedItem,
  ] =
    useState<HomeGalleryItem | null>(
      null
    );


  /* ================================================================
     ESCAPE KEY
  ================================================================= */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape"
      ) {
        setSelectedItem(null);
      }
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
  }, []);


  /* ================================================================
     LOCK PAGE SCROLL
  ================================================================= */

  useEffect(() => {
    document.body.style.overflow =
      selectedItem
        ? "hidden"
        : "";


    return () => {
      document.body.style.overflow =
        "";
    };
  }, [selectedItem]);


  return (
    <>

      {/* ============================================================
          GRID
      ============================================================= */}

      <div className="portfolio-grid">

        {items.map((item) => {
          const imageUrl =
            item.image
              ?.asset
              ?.url;

          const videoUrl =
            item.video
              ?.asset
              ?.url;


          /* IMAGE */

          if (
            item.mediaType ===
              "image" &&
            imageUrl
          ) {
            return (
              <article
                key={item._id}
                className="portfolio-grid-cell"
              >
                <GalleryMedia
                  type="image"
                  src={imageUrl}
                  alt={
                    item.alt ||
                    item.title
                  }
                  onImageClick={() =>
                    setSelectedItem(
                      item
                    )
                  }
                />
              </article>
            );
          }


          /* VIDEO */

          if (
            item.mediaType ===
              "video" &&
            videoUrl
          ) {
            return (
              <article
                key={item._id}
                className="portfolio-grid-cell"
              >
                <GalleryMedia
                  type="video"
                  src={videoUrl}
                  alt={
                    item.alt ||
                    item.title
                  }
                  onVideoExpand={() =>
                    setSelectedItem(
                      item
                    )
                  }
                />
              </article>
            );
          }


          return null;
        })}

      </div>


      {/* ============================================================
          LIGHTBOX
      ============================================================= */}

      {selectedItem && (

        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={
            selectedItem.title
          }
          onMouseDown={() =>
            setSelectedItem(
              null
            )
          }
        >

          {/* CLOSE */}

          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() =>
              setSelectedItem(
                null
              )
            }
            aria-label="Close"
          >
            <X size={25} />
          </button>


          {/* CONTENT */}

          <div
            className="gallery-lightbox-content"
            onMouseDown={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            {/* IMAGE */}

            {selectedItem.mediaType ===
              "image" &&
              selectedItem.image
                ?.asset
                ?.url && (

                <img
                  src={
                    selectedItem
                      .image
                      .asset
                      .url
                  }
                  alt={
                    selectedItem.alt ||
                    selectedItem.title
                  }
                  className="gallery-lightbox-image"
                />

              )}


            {/* VIDEO */}

            {selectedItem.mediaType ===
              "video" &&
              selectedItem.video
                ?.asset
                ?.url && (

                <ExpandedVideo
                  src={
                    selectedItem
                      .video
                      .asset
                      .url
                  }
                />

              )}

          </div>

        </div>

      )}

    </>
  );
}