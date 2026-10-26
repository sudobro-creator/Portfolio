"use client";

import { Expand, X } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "./InteractiveEmbed.module.css";

type InteractiveEmbedProps = {
  src: string;
  title: string;
};

export default function InteractiveEmbed({
  src,
  title,
}: InteractiveEmbedProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expanded]);

  return (
    <>
      <div className={styles.shell}>
        <div className={styles.frameWrap}>
          <iframe
            src={src}
            title={title}
            className={styles.frame}
            loading="lazy"
            allow="clipboard-read; clipboard-write; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <button
          type="button"
          className={styles.expandButton}
          onClick={() => setExpanded(true)}
          aria-label={`Expand ${title}`}
          title="Expand interactive project"
        >
          <Expand size={18} strokeWidth={2} />
        </button>
      </div>

      {expanded && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} expanded preview`}
          onMouseDown={() => setExpanded(false)}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setExpanded(false)}
            aria-label="Close interactive preview"
          >
            <X size={24} strokeWidth={2} />
          </button>

          <div
            className={styles.modalPanel}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <iframe
              src={src}
              title={`${title} expanded`}
              className={styles.modalFrame}
              allow="clipboard-read; clipboard-write; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      )}
    </>
  );
}
