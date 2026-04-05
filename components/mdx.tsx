import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { EditorBlock } from '@/components/EditorBlock';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    EditorBlock,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
