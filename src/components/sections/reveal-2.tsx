"use client";

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface ComparisonImage {
  src: string;
  alt: string;
}

interface Reveal2Props {
  beforeImage: ComparisonImage;
  afterImage: ComparisonImage;
  beforeLabel?: string;
  afterLabel?: string;
  showLabels?: boolean;
  orientation?: "horizontal" | "vertical";
  initialPosition?: number;
  dividerWidth?: number;
  className?: string;
}

export function Reveal2({
  beforeImage,
  afterImage,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  showLabels = true,
  orientation = "horizontal",
  initialPosition = 50,
  dividerWidth = 4,
  className,
}: Reveal2Props) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHorizontal = orientation === "horizontal";

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const percentage = isHorizontal
        ? ((clientX - rect.left) / rect.width) * 100
        : ((clientY - rect.top) / rect.height) * 100;
      setPosition(Math.max(0, Math.min(100, percentage)));
    },
    [isHorizontal],
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (event: MouseEvent) => {
      handleMove(event.clientX, event.clientY);
    };
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      event.preventDefault();
      handleMove(touch.clientX, touch.clientY);
    };
    const handleEnd = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMove]);

  const nudge = (delta: number) => {
    setPosition((current) => Math.max(0, Math.min(100, current + delta)));
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label="Comparação antes e depois"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-valuetext={`${Math.round(position)}% ${beforeLabel.toLowerCase()}`}
      tabIndex={0}
      className={`relative aspect-[4/5] cursor-ew-resize touch-none overflow-hidden rounded-[1.75rem] border border-line bg-paper-deep select-none ${isHorizontal ? "" : "cursor-ns-resize"} ${className ?? ""}`}
      onMouseDown={(event) => {
        event.preventDefault();
        setIsDragging(true);
        handleMove(event.clientX, event.clientY);
      }}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        if (!touch) return;
        setIsDragging(true);
        handleMove(touch.clientX, touch.clientY);
      }}
      onKeyDown={(event) => {
        const step = event.shiftKey ? 10 : 4;
        const decrease = isHorizontal ? event.key === "ArrowLeft" : event.key === "ArrowDown";
        const increase = isHorizontal ? event.key === "ArrowRight" : event.key === "ArrowUp";
        if (decrease) {
          event.preventDefault();
          nudge(-step);
        }
        if (increase) {
          event.preventDefault();
          nudge(step);
        }
        if (event.key === "Home") {
          event.preventDefault();
          setPosition(0);
        }
        if (event.key === "End") {
          event.preventDefault();
          setPosition(100);
        }
      }}
    >
      <Image
        src={afterImage.src}
        alt={afterImage.alt}
        fill
        sizes="(min-width: 1024px) 36rem, 100vw"
        draggable={false}
        className="object-cover object-[center_18%]"
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: isHorizontal ? `inset(0 ${100 - position}% 0 0)` : `inset(0 0 ${100 - position}% 0)`,
        }}
      >
        <Image
          src={beforeImage.src}
          alt={beforeImage.alt}
          fill
          sizes="(min-width: 1024px) 36rem, 100vw"
          draggable={false}
          className="object-cover object-center"
        />
      </div>
      <div
        className={`absolute z-10 bg-paper shadow-lg ${isHorizontal ? "top-0 bottom-0 -translate-x-1/2" : "right-0 left-0 -translate-y-1/2"}`}
        style={{
          [isHorizontal ? "left" : "top"]: `${position}%`,
          [isHorizontal ? "width" : "height"]: `${dividerWidth}px`,
        }}
      >
        <div
          className={`absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold bg-paper shadow-xl ${isDragging ? "scale-110" : ""}`}
          style={{
            [isHorizontal ? "marginLeft" : "marginTop"]: position > 94 ? "-1.25rem" : position < 6 ? "1.25rem" : undefined,
          }}
        >
          {isHorizontal ? (
            position > 50 ? (
              <ArrowLeft aria-hidden="true" strokeWidth={2} className="size-5 text-gold" />
            ) : (
              <ArrowRight aria-hidden="true" strokeWidth={2} className="size-5 text-gold" />
            )
          ) : position > 50 ? (
            <ArrowUp aria-hidden="true" strokeWidth={2} className="size-5 text-gold" />
          ) : (
            <ArrowDown aria-hidden="true" strokeWidth={2} className="size-5 text-gold" />
          )}
        </div>
      </div>
      {showLabels ? (
        <>
          {position > 6 ? (
            <span className="absolute top-4 left-4 z-20 rounded-full bg-ink/80 px-3 py-1.5 text-sm font-medium text-paper backdrop-blur-sm">
              {beforeLabel}
            </span>
          ) : null}
          {position < 94 ? (
            <span
              className={`absolute z-20 rounded-full bg-ink/80 px-3 py-1.5 text-sm font-medium text-paper backdrop-blur-sm ${isHorizontal ? "top-4 right-4" : "bottom-4 left-4"}`}
            >
              {afterLabel}
            </span>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
