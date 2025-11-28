// lib/posts.ts
import { remark } from 'remark';
import remarkRehype from 'remark-rehype'; // 💡 추가
import rehypeStringify from 'rehype-stringify'; // 💡 추가
import rehypeHighlight from 'rehype-highlight'; // 💡 rehype-highlight 사용
import matter from 'gray-matter';

export async function ConvertMarkdownToHtml(markdownContent: string) {
    const matterResult = matter(markdownContent);

    const processedContent = await remark()
        .use(remarkRehype, { allowDangerousHtml: true }) // 1. 마크다운 트리를 HTML 트리로 변환
        .use(rehypeHighlight) // 2. HTML 트리에서 코드 블록 하이라이팅 적용
        .use(rehypeStringify, { allowDangerousHtml: true }) // 3. HTML 트리를 문자열로 변환
        .process(matterResult.content); // 💡 여기서 성공해야 합니다.

    const contentHtml = processedContent.toString(); 

    return {
        contentHtml,
        ...matterResult.data,
    };
}
