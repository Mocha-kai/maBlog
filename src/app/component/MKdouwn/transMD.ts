// lib/posts.ts
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw'; // 🔥 매우 중요!
import matter from 'gray-matter';

export async function ConvertMarkdownToHtml(markdownContent: string) {
    const matterResult = matter(markdownContent);

    const processedContent = await remark()
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw) // 🔥 빠져있으면 Markdown 요소가 escape됨
        .use(rehypeHighlight)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        contentHtml,
        ...matterResult.data,
    };
}
