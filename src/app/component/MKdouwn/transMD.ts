// lib/posts.ts
import { remark } from 'remark';
import remarkGfm from 'remark-gfm'; 
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw'; 
import matter from 'gray-matter';

export async function ConvertMarkdownToHtml(markdownContent: string) {
    const matterResult = matter(markdownContent);

    const processedContent = await remark()
        .use(remarkGfm) 
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw) 
        .use(rehypeHighlight)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        contentHtml,
        ...matterResult.data,
    };
}
