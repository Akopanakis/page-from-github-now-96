import { useState, useEffect } from "react";

interface MobileBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}

export function useMobile(): MobileBreakpoints {
  const [breakpoints, setBreakpoints] = useState<MobileBreakpoints>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setBreakpoints({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width,
        height,
      });
    };

    // Initial calculation
    updateBreakpoints();

    // Add event listener
    window.addEventListener("resize", updateBreakpoints);

    // Cleanup
    return () => window.removeEventListener("resize", updateBreakpoints);
  }, []);

  return breakpoints;
}

export function useIsMobile(): boolean {
  const { isMobile } = useMobile();
  return isMobile;
}

export function useIsTablet(): boolean {
  const { isTablet } = useMobile();
  return isTablet;
}

export function useIsDesktop(): boolean {
  const { isDesktop } = useMobile();
  return isDesktop;
}

// Touch device detection
export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0;

    setIsTouch(isTouchDevice);
  }, []);

  return isTouch;
}

// Device orientation
export function useOrientation(): "portrait" | "landscape" {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait",
  );

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? "portrait" : "landscape",
      );
    };

    updateOrientation();
    window.addEventListener("resize", updateOrientation);
    window.addEventListener("orientationchange", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  return orientation;
}

// Safe area insets for mobile devices
export function useSafeArea() {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const updateSafeArea = () => {
      if (
        typeof CSS !== "undefined" &&
        CSS.supports("padding-top: env(safe-area-inset-top)")
      ) {
        const computedStyle = getComputedStyle(document.documentElement);
        setSafeArea({
          top: parseInt(
            computedStyle.getPropertyValue("--safe-area-inset-top") || "0",
          ),
          right: parseInt(
            computedStyle.getPropertyValue("--safe-area-inset-right") || "0",
          ),
          bottom: parseInt(
            computedStyle.getPropertyValue("--safe-area-inset-bottom") || "0",
          ),
          left: parseInt(
            computedStyle.getPropertyValue("--safe-area-inset-left") || "0",
          ),
        });
      }
    };

    updateSafeArea();
    window.addEventListener("resize", updateSafeArea);

    return () => window.removeEventListener("resize", updateSafeArea);
  }, []);

  return safeArea;
}
