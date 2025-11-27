import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IPostData } from '@/app/api/models/mDBTypeSetting';

async function fetchPostBySlug(slug: string): Promise<IPostData> {
    const res = await fetch(`/api/posts/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    return res.json();
}

export function usePost(slug: string) {
    const queryClient = useQueryClient();

    // 1. 전체 목록 캐시를 조회합니다.
    const allPostsCache = queryClient.getQueryData<IPostData[]>(['posts']);
    console.log('test', allPostsCache);

    return useQuery({
        queryKey: ['posts', slug],
        // 2. 캐시가 없을 때를 대비한 필수 옵션
        queryFn: () => fetchPostBySlug(slug),
        // 3. 캐시 재활용: 전체 목록 캐시가 있다면 initialData로 사용
        initialData: () => {
            if (allPostsCache) return allPostsCache.find((post) => post.slug === slug);
            return undefined; // 캐시가 없으면 queryFn 실행
        },

        // 4. 캐시된 데이터를 사용 후 바로 최신 데이터를 가져오도록 설정
        staleTime: 0,
        enabled: !!slug, // slug가 있을 때만 쿼리 실행
    });
}
// DB에서 모든 데이터를 가져오는 API 호출 함수 (가정)
async function fetchAllPosts(): Promise<IPostData[]> {
    // API Route를 통해 getPostsData를 호출하도록 변경해야 함
    const res = await fetch('/api/posts');
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
}

export function usePosts() {
    return useQuery({
        // 쿼리 키를 통일
        queryKey: ['posts'],
        queryFn: fetchAllPosts,
    });
}
