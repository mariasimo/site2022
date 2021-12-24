/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
  const content: React.FC<React.SVGAttributes<SVGElement>>;
  export default content;
}
