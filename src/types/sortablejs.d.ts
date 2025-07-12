
declare module 'sortablejs' {
  interface SortableOptions {
    animation?: number;
    chosenClass?: string;
    delay?: number;
    delayOnTouchOnly?: boolean;
    disabled?: boolean;
    dragClass?: string;
    draggable?: string;
    emptyInsertThreshold?: number;
    easing?: string;
    fallbackClass?: string;
    fallbackOnBody?: boolean;
    fallbackTolerance?: number;
    filter?: string | ((evt: Event, item: HTMLElement, target: HTMLElement) => boolean);
    forceFallback?: boolean;
    ghostClass?: string;
    group?: string | { name: string; pull?: boolean | string | ((to: any, from: any, dragEl: HTMLElement, evt: Event) => boolean); put?: boolean | string[] | ((to: any, from: any, dragEl: HTMLElement, evt: Event) => boolean) };
    handle?: string;
    ignore?: string;
    invertSwap?: boolean;
    invertedSwapThreshold?: number;
    onAdd?: (evt: any) => void;
    onChoose?: (evt: any) => void;
    onClone?: (evt: any) => void;
    onEnd?: (evt: any) => void;
    onFilter?: (evt: any) => void;
    onMove?: (evt: any, originalEvent: Event) => boolean | -1 | 1;
    onRemove?: (evt: any) => void;
    onSort?: (evt: any) => void;
    onStart?: (evt: any) => void;
    onUnchoose?: (evt: any) => void;
    onUpdate?: (evt: any) => void;
    preventOnFilter?: boolean;
    removeCloneOnHide?: boolean;
    sort?: boolean;
    store?: {
      get: (sortable: Sortable) => string[];
      set: (sortable: Sortable) => void;
    };
    swapThreshold?: number;
    touchStartThreshold?: number;
  }

  class Sortable {
    public el: HTMLElement;
    public options: SortableOptions;

    constructor(el: HTMLElement, options?: SortableOptions);

    static create(el: HTMLElement, options?: SortableOptions): Sortable;
    static get(el: HTMLElement): Sortable | undefined;
    static mount(...plugins: any[]): void;
    static unmount(...plugins: any[]): void;

    destroy(): void;
    option(name: string, value?: any): any;
    closest(el: HTMLElement, selector: string): HTMLElement | null;
    toArray(): string[];
    sort(order: string[]): void;
    save(): void;
  }

  export = Sortable;
}
