"use client";

import {
  Expand,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type GalleryMediaProps = {
  type: "image" | "video";
  src: string;
  alt?: string;

  onImageClick?: () => void;
  onVideoExpand?: () => void;
};

export default function GalleryMedia({
  type,
  src,
  alt = "",
  onImageClick,
  onVideoExpand,
}: GalleryMediaProps) {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] =
    useState(true);

  const [muted, setMuted] =
    useState(true);


  /* ================================================================
     AUTOPLAY VIDEO
  ================================================================= */

  useEffect(() => {
    if (
      type === "video" &&
      videoRef.current
    ) {
      videoRef.current
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {
          setPlaying(false);
        });
    }
  }, [type]);


  /* ================================================================
     PLAY / PAUSE
  ================================================================= */

  const togglePlay = () => {
    const video =
      videoRef.current;

    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {
          setPlaying(false);
        });
    } else {
      video.pause();

      setPlaying(false);
    }
  };


  /* ================================================================
     MUTE / UNMUTE
  ================================================================= */

  const toggleMute = () => {
    const video =
      videoRef.current;

    if (!video) return;

    const nextMutedState =
      !video.muted;

    video.muted =
      nextMutedState;

    setMuted(
      nextMutedState
    );
  };


  /* ================================================================
     IMAGE
  ================================================================= */

  if (type === "image") {
    return (
      <button
        type="button"
        className="gallery-media-button"
        onClick={onImageClick}
        aria-label={
          alt
            ? `View ${alt}`
            : "View image"
        }
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="gallery-media-content"
        />
      </button>
    );
  }


  /* ================================================================
     VIDEO
  ================================================================= */

  return (
    <div className="gallery-video">

      <video
        ref={videoRef}
        src={src}
        className="gallery-media-content"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />


      {/* ============================================================
          VIDEO CONTROLS
      ============================================================= */}

      <div className="gallery-video-controls">

        {/* PLAY / PAUSE */}

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
            <Pause
              size={17}
              strokeWidth={2}
            />
          ) : (
            <Play
              size={17}
              strokeWidth={2}
            />
          )}
        </button>


        {/* MUTE / UNMUTE */}

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
            <VolumeX
              size={17}
              strokeWidth={2}
            />
          ) : (
            <Volume2
              size={17}
              strokeWidth={2}
            />
          )}
        </button>


        {/* EXPAND */}

        <button
          type="button"
          onClick={onVideoExpand}
          className="gallery-video-control"
          aria-label="Expand video"
        >
          <Expand
            size={17}
            strokeWidth={2}
          />
        </button>

      </div>

    </div>
  );
}