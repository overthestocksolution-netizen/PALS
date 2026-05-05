// CSS side-effect imports
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// SVG imports
declare module '*.svg' {
  const content: string;
  export default content;
}
