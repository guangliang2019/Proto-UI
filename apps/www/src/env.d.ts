declare module 'shiki' {
  export function codeToHtml(
    code: string,
    options?: {
      lang?: string;
      theme?: string;
      themes?: Record<string, string>;
    }
  ): Promise<string>;
}
