interface LibraryConfig {
  name: string;
  url: string;
  type: "script" | "css";
  global?: string;
  check?: () => boolean;
}

const CDN_LIBRARIES: LibraryConfig[] = [
  {
    name: "flatpickr",
    url: "https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js",
    type: "script",
    global: "flatpickr",
    check: () => typeof window.flatpickr !== "undefined",
  },
  {
    name: "flatpickr-css",
    url: "https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css",
    type: "css",
  },
  {
    name: "chart",
    url: "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js",
    type: "script",
    global: "Chart",
    check: () => typeof window.Chart !== "undefined",
  },
  {
    name: "sortable",
    url: "https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js",
    type: "script",
    global: "Sortable",
    check: () => typeof window.Sortable !== "undefined",
  },
  {
    name: "html2canvas",
    url: "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",
    type: "script",
    global: "html2canvas",
    check: () => typeof window.html2canvas !== "undefined",
  },
  {
    name: "jspdf",
    url: "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
    type: "script",
    global: "jsPDF",
    check: () => typeof window.jsPDF !== "undefined",
  },
  {
    name: "xlsx",
    url: "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",
    type: "script",
    global: "XLSX",
    check: () => typeof window.XLSX !== "undefined",
  },
  {
    name: "introjs",
    url: "https://cdn.jsdelivr.net/npm/intro.js@7.2.0/minified/intro.min.js",
    type: "script",
    global: "introJs",
    check: () => typeof window.introJs !== "undefined",
  },
  {
    name: "introjs-css",
    url: "https://cdn.jsdelivr.net/npm/intro.js@7.2.0/minified/introjs.min.css",
    type: "css",
  },
  {
    name: "tippy",
    url: "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js",
    type: "script",
    global: "Popper",
    check: () => typeof window.Popper !== "undefined",
  },
  {
    name: "tippy-js",
    url: "https://cdn.jsdelivr.net/npm/tippy.js@6.3.7/dist/tippy-bundle.umd.min.js",
    type: "script",
    global: "tippy",
    check: () => typeof window.tippy !== "undefined",
  },
  {
    name: "tippy-css",
    url: "https://cdn.jsdelivr.net/npm/tippy.js@6.3.7/dist/tippy.css",
    type: "css",
  },
];

class LibraryLoader {
  private loadedLibraries = new Set<string>();
  private loadingPromises = new Map<string, Promise<void>>();

  async loadLibrary(config: LibraryConfig): Promise<void> {
    if (this.loadedLibraries.has(config.name)) {
      return;
    }

    if (this.loadingPromises.has(config.name)) {
      return this.loadingPromises.get(config.name);
    }

    // Check if library is already available
    if (config.check && config.check()) {
      this.loadedLibraries.add(config.name);
      return;
    }

    const promise = this.createLoadPromise(config);
    this.loadingPromises.set(config.name, promise);

    try {
      await promise;
      this.loadedLibraries.add(config.name);
    } catch (error) {
      this.loadingPromises.delete(config.name);
      throw error;
    }

    return promise;
  }

  private createLoadPromise(config: LibraryConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      const element =
        config.type === "script"
          ? document.createElement("script")
          : document.createElement("link");

      element.onload = () => {
        // Additional check for script elements
        if (config.type === "script" && config.check && !config.check()) {
          reject(new Error(`Library ${config.name} loaded but not available`));
          return;
        }
        resolve();
      };

      element.onerror = () => {
        reject(new Error(`Failed to load ${config.name} from ${config.url}`));
      };

      if (config.type === "script") {
        (element as HTMLScriptElement).src = config.url;
        (element as HTMLScriptElement).type = "text/javascript";
      } else {
        (element as HTMLLinkElement).href = config.url;
        (element as HTMLLinkElement).rel = "stylesheet";
        (element as HTMLLinkElement).type = "text/css";
      }

      document.head.appendChild(element);
    });
  }

  async loadAllLibraries(): Promise<void> {
    const loadPromises = CDN_LIBRARIES.map((config) =>
      this.loadLibrary(config).catch((error) => {
        console.warn(`Failed to load ${config.name}:`, error);
        return null;
      }),
    );

    await Promise.all(loadPromises);
  }

  isLibraryLoaded(name: string): boolean {
    return this.loadedLibraries.has(name);
  }

  async waitForLibrary(name: string, timeout = 10000): Promise<boolean> {
    if (this.loadedLibraries.has(name)) {
      return true;
    }

    const config = CDN_LIBRARIES.find((lib) => lib.name === name);
    if (!config) {
      return false;
    }

    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (config.check && config.check()) {
        this.loadedLibraries.add(name);
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return false;
  }
}

export const libraryLoader = new LibraryLoader();
export { CDN_LIBRARIES };

// Auto-load on DOMContentLoaded
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      libraryLoader.loadAllLibraries();
    });
  } else {
    libraryLoader.loadAllLibraries();
  }
}

declare global {
  interface Window {
    flatpickr: any;
    Chart: any;
    Sortable: any;
    html2canvas: any;
    jsPDF: any;
    XLSX: any;
    introJs: any;
    tippy: any;
    Popper: any;
  }
}
