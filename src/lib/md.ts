import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

export function mdToSafeHtml(md: string): string {
  return DOMPurify.sanitize(marked.parse(md) as string);
}

