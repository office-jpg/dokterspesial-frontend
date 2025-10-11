import { marked } from "marked";

/**
 * Sanitizes content that may contain HTML or Markdown
 * @param content - The raw content string
 * @param options - Configuration options
 * @returns Sanitized content
 */
export interface SanitizeOptions {
    allowedTags?: string[];
    allowedAttributes?: string[];
    returnAsHtml?: boolean;
    enableMarkdown?: boolean;
}

const DEFAULT_ALLOWED_TAGS = ["p", "br", "strong", "em", "b", "i", "u", "span"];
const DEFAULT_ALLOWED_ATTRIBUTES: string[] = [];

let DOMPurify: any = null;

if (typeof window !== "undefined") {
    import("dompurify")
        .then((module) => {
            DOMPurify = module.default;
        })
        .catch(() => {
            DOMPurify = null;
        });
}

/**
 * Simple HTML tag removal for server-side rendering
 */
function stripHtmlTags(html: string): string {
    return html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
}

export function sanitizeContent(
    content: string,
    options: SanitizeOptions = {}
): string {
    const {
        allowedTags = DEFAULT_ALLOWED_TAGS,
        allowedAttributes = DEFAULT_ALLOWED_ATTRIBUTES,
        returnAsHtml = false,
        enableMarkdown = true,
    } = options;

    if (!content) return "";

    let processedContent = content;

    if (enableMarkdown) {
        try {
            processedContent = marked.parse(content, {
                breaks: true,
                gfm: true,
            }) as string;
        } catch (error) {
            processedContent = content;
        }
    }

    if (typeof window === "undefined" || !DOMPurify) {
        if (returnAsHtml) {
            return processedContent
                .replace(/<script[^>]*>.*?<\/script>/gi, "")
                .replace(/<style[^>]*>.*?<\/style>/gi, "")
                .replace(/on\w+="[^"]*"/gi, "")
                .replace(/javascript:/gi, "");
        } else {
            return stripHtmlTags(processedContent);
        }
    }

    const cleanHtml = DOMPurify.sanitize(processedContent, {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: allowedAttributes,
    });

    if (returnAsHtml) {
        return cleanHtml;
    }

    return stripHtmlTags(cleanHtml);
}

/**
 * Sanitizes content and returns it as safe HTML for dangerouslySetInnerHTML
 * @param content - The raw content string
 * @param options - Configuration options
 * @returns Object with __html property for dangerouslySetInnerHTML
 */
export function sanitizeContentAsHtml(
    content: string,
    options: SanitizeOptions = {}
): { __html: string } {
    const cleanHtml = sanitizeContent(content, {
        ...options,
        returnAsHtml: true,
    });

    return { __html: cleanHtml };
}

/**
 * Sanitizes content and returns it as plain text
 * @param content - The raw content string
 * @param options - Configuration options
 * @returns Sanitized plain text
 */
export function sanitizeContentAsText(
    content: string,
    options: SanitizeOptions = {}
): string {
    return sanitizeContent(content, {
        ...options,
        returnAsHtml: false,
    });
}
