// @pagefind/default-ui 1.1 exposes this small imperative interface without types.
declare module "@pagefind/default-ui" {
  export class PagefindUI {
    constructor(options: Record<string, unknown>);
    destroy(): void;
  }
}
