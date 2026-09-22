import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductImageSlider({
  images = [],
  alt = "",
  height = "100%",
  showThumbs = false,
  brandLogo = "",
  stockLabel = "", // NEW: rendered bottom-left of the MAIN IMAGE only
  hideArrowsOnMobile = false, // true => arrows sirf desktop (>= 992px) par dikhenge
}) {
  // --------------------------------------------------
  // MAXIMUM 5 PRODUCT IMAGES
  // --------------------------------------------------
  const list = (images || []).filter(Boolean).slice(0, 5);

  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);

  // --------------------------------------------------
  // DESKTOP DETECTION (Bootstrap lg = 992px)
  // --------------------------------------------------
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 992;
  });

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 992);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --------------------------------------------------
  // THUMBNAILS ONLY DESKTOP
  // --------------------------------------------------
  const showDesktopThumbs = showThumbs && isDesktop;

  // --------------------------------------------------
  // NO IMAGE
  // --------------------------------------------------
  if (list.length === 0) {
    return null;
  }

  const total = list.length;
  const current = Math.min(index, total - 1);

  // --------------------------------------------------
  // ARROWS VISIBILITY
  // - 1 se zyada image ho tabhi
  // - hideArrowsOnMobile ON ho to mobile/tablet par hide
  // --------------------------------------------------
  const showArrows = total > 1 && !(hideArrowsOnMobile && !isDesktop);

  // --------------------------------------------------
  // NEXT / PREVIOUS
  // --------------------------------------------------
  const go = (e, direction) => {
    if (e) e.stopPropagation();

    setIndex((prev) => {
      const safeIndex = Math.min(prev, total - 1);
      return (safeIndex + direction + total) % total;
    });
  };

  // --------------------------------------------------
  // TOUCH SWIPE
  // --------------------------------------------------
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(diff) > 40) {
      go(null, diff < 0 ? 1 : -1);
    }
  };

  // --------------------------------------------------
  // ARROW STYLE
  // --------------------------------------------------
  const arrowStyle = (side) => ({
    position: "absolute",
    top: "50%",
    [side]: 10,
    transform: "translateY(-50%)",
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.92)",
    color: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 2px 7px rgba(0,0,0,0.25)",
    zIndex: 20,
    padding: 0,
  });

  return (
    <div
      style={{
        width: "100%",
        height: height,
        display: showDesktopThumbs ? "flex" : "block",
        gap: showDesktopThumbs ? 10 : 0,
        alignItems: "stretch",
      }}
    >
      {/* =====================================================
          DESKTOP THUMBNAILS (LEFT SIDE, only >= 992px)
      ===================================================== */}
      {showDesktopThumbs && total > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: 70,
            minWidth: 70,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            padding: "4px 0",
            background: "#fff",
            overflow: "hidden",
          }}
        >
          {list.map((src, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1}`}
              onClick={() => setIndex(i)}
              style={{
                width: 62,
                height: 62,
                minWidth: 62,
                minHeight: 62,
                padding: 0,
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "#fff",
                border: i === current ? "2px solid #dfa00b" : "2px solid #ddd",
                opacity: i === current ? 1 : 0.7,
                transition: "all 0.2s ease",
                flex: "0 0 auto",
              }}
            >
              <img
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                loading="lazy"
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* =====================================================
          MAIN PRODUCT IMAGE AREA
          (brand logo + stock label isi ke andar hain,
          thumbnails ke upar/beech kabhi nahi)
      ===================================================== */}
      <div
        style={{
          position: "relative",
          width: showDesktopThumbs ? "calc(100% - 80px)" : "100%",
          flex: showDesktopThumbs ? "1 1 auto" : "none",
          height: height,
          overflow: "hidden",
          minWidth: 0,
          borderRadius: 8,
        }}
        onTouchStart={total > 1 ? handleTouchStart : undefined}
        onTouchEnd={total > 1 ? handleTouchEnd : undefined}
      >
        {/* BRAND LOGO (top-left) */}
        {brandLogo && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              width: 62,
              height: 62,
              borderRadius: "50%",
              background: "#fff",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(255,255,255,0.95)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.30)",
              zIndex: 15,
            }}
          >
            <img
              src={brandLogo}
              alt="Kavi Shawls"
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: 4,
                display: "block",
              }}
            />
          </div>
        )}

        {/* STOCK LABEL (bottom-left, main image only) */}
        {stockLabel && (
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 12,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(0,0,0,0.75)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 500,
              whiteSpace: "nowrap",
              boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
              zIndex: 15,
            }}
          >
            {stockLabel}
          </div>
        )}

        {/* IMAGE SLIDER */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            transform: `translateX(-${current * 100}%)`,
            transition: "transform 0.35s ease",
          }}
        >
          {list.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${alt} ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
              style={{
                flex: "0 0 100%",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                userSelect: "none",
              }}
            />
          ))}
        </div>

        {/* LEFT ARROW */}
        {showArrows && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => go(e, -1)}
            style={arrowStyle("left")}
          >
            <FaChevronLeft />
          </button>
        )}

        {/* RIGHT ARROW */}
        {showArrows && (
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => go(e, 1)}
            style={arrowStyle("right")}
          >
            <FaChevronRight />
          </button>
        )}

        {/* DOTS (only card mode) */}
        {total > 1 && !showThumbs && (
          <div
            style={{
              position: "absolute",
              bottom: 6,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 4,
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            {list.map((_, i) => (
              <span
                key={i}
                style={{
                  width: i === current ? 14 : 6,
                  height: 6,
                  borderRadius: 6,
                  background:
                    i === current ? "#dfa00b" : "rgba(255,255,255,0.8)",
                  boxShadow: "0 0 2px rgba(0,0,0,0.4)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}