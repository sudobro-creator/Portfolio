"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

import GalleryMedia from "@/components/gallery/GalleryMedia";


/* ================================================================
   TYPES
================================================================ */

export type GalleryMediaItem = {
  _id: string;

  title?: string;

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
   EXPANDED VIDEO COMPONENT
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


  /* PLAY / PAUSE */

  const togglePlay = async () => {
    const video =
      videoRef.current;

    if (!video) return;


    if (video.paused) {
      try {
        await video.play();

        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();

      setPlaying(false);
    }
  };


  /* MUTE / UNMUTE */

  const toggleMute = () => {
    const video =
      videoRef.current;

    if (!video) return;


    const nextMuted =
      !video.muted;


    video.muted =
      nextMuted;


    setMuted(
      nextMuted
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
        preload="metadata"
        className="gallery-lightbox-video"
        onPlay={() =>
          setPlaying(true)
        }
        onPause={() =>
          setPlaying(false)
        }
        onVolumeChange={(
          event
        ) => {
          setMuted(
            event.currentTarget
              .muted
          );
        }}
      />


      {/* EXPANDED VIDEO CONTROLS */}

      <div className="gallery-expanded-controls">

        {/* PLAY / PAUSE */}

        <button
          type="button"
          className="gallery-video-control"
          onClick={
            togglePlay
          }
          aria-label={
            playing
              ? "Pause video"
              : "Play video"
          }
        >

          {playing ? (
            <Pause
              size={18}
              strokeWidth={2}
            />
          ) : (
            <Play
              size={18}
              strokeWidth={2}
            />
          )}

        </button>


        {/* MUTE / UNMUTE */}

        <button
          type="button"
          className="gallery-video-control"
          onClick={
            toggleMute
          }
          aria-label={
            muted
              ? "Unmute video"
              : "Mute video"
          }
        >

          {muted ? (
            <VolumeX
              size={18}
              strokeWidth={2}
            />
          ) : (
            <Volume2
              size={18}
              strokeWidth={2}
            />
          )}

        </button>

      </div>

    </div>
  );
}


/* ================================================================
   ABOUT GALLERY
================================================================ */

export default function AboutGallery({
  items,
}: {
  items: GalleryMediaItem[];
}) {
  const [
    selectedItem,
    setSelectedItem,
  ] =
    useState<GalleryMediaItem | null>(
      null
    );


  /* ==============================================================
     ESC CLOSES LIGHTBOX
  =============================================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        setSelectedItem(
          null
        );
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


  /* ==============================================================
     LOCK BACKGROUND SCROLL
  =============================================================== */

  useEffect(() => {
    if (selectedItem) {
      document.body.style
        .overflow =
        "hidden";
    } else {
      document.body.style
        .overflow =
        "";
    }


    return () => {
      document.body.style
        .overflow =
        "";
    };
  }, [selectedItem]);


  /* ==============================================================
     RENDER
  =============================================================== */

  return (
    <>

      {/* ==========================================================
          GRID
      =========================================================== */}

      <div className="portfolio-grid">

        {items.map(
          (item) => {

            const imageUrl =
              item.image
                ?.asset
                ?.url;


            const videoUrl =
              item.video
                ?.asset
                ?.url;


            /* ====================================================
               IMAGE
            ===================================================== */

            if (
              item.mediaType ===
                "image" &&
              imageUrl
            ) {
              return (
                <article
                  key={
                    item._id
                  }
                  className="portfolio-grid-cell"
                >

                  <GalleryMedia
                    type="image"
                    src={
                      imageUrl
                    }
                    alt={
                      item.alt ||
                      item.title ||
                      ""
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


            /* ====================================================
               VIDEO
            ===================================================== */

            if (
              item.mediaType ===
                "video" &&
              videoUrl
            ) {
              return (
                <article
                  key={
                    item._id
                  }
                  className="portfolio-grid-cell"
                >

                  <GalleryMedia
                    type="video"
                    src={
                      videoUrl
                    }
                    alt={
                      item.alt ||
                      item.title ||
                      ""
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
          }
        )}

      </div>


      {/* ==========================================================
          LIGHTBOX
      =========================================================== */}

      {selectedItem && (

        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={
            selectedItem.title ||
            "Gallery preview"
          }
          onMouseDown={() =>
            setSelectedItem(
              null
            )
          }
        >

          {/* CLOSE BUTTON */}

          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() =>
              setSelectedItem(
                null
              )
            }
            aria-label="Close preview"
          >

            <X
              size={25}
              strokeWidth={2}
            />

          </button>


          {/* LIGHTBOX CONTENT */}

          <div
            className="gallery-lightbox-content"
            onMouseDown={(
              event
            ) =>
              event
                .stopPropagation()
            }
          >

            {/* IMAGE */}

            {selectedItem
              .mediaType ===
                "image" &&
              selectedItem
                .image
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
                    selectedItem
                      .alt ||
                    selectedItem
                      .title ||
                    ""
                  }
                  className="gallery-lightbox-image"
                />

              )}


            {/* VIDEO */}

            {selectedItem
              .mediaType ===
                "video" &&
              selectedItem
                .video
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