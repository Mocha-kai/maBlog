
'use client';

import { InsertPostData } from '@/app/api/Insert/MongDB_Insert';
import { useState } from 'react';

export type BaseInsertType = {
    title: string;
    content: string;
    category: string;
    date: Date;
    slug: string;
};

const CATEGORIES = ['study', 'career', 'hobby', 'record'];

const WriteComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // 폼 상태 관리
    const [postData, setPostData] = useState<BaseInsertType>({
        title: '',
        content: '',
        category: '',
        date: new Date(),
        slug: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPostData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const ClickForm = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // 1. 데이터 유효성 검사 (간단한 예시)
        if (!postData.title || !postData.content) {
            setIsLoading(false);
            return;
        }

        try {
            // 2. 실제 데이터 저장 로직 (API 호출 또는 Firestore 저장) 구현 위치
            console.log('--- Post Data Submitted ---');
            // Mongoose Document 객체가 아닌 순수 postData 객체만 전송해야 합니다
       
            InsertPostData({
                title: postData.title,
                content: postData.content,
                category: postData.category,
                date: new Date(),
                slug: postData.title.toLowerCase().replace(/ /g, '-'),
            });

            // 4. 폼 초기화
            setPostData({ title: '', category: CATEGORIES[0], date: new Date(), content: '', slug: '' });
        } catch (error) {
            console.error('Save failed:', error);
        }
    };

    return (
        <>
            <section className={'writeSection'} onSubmit={ClickForm}>
                <form>
                    <h1 className={'editorTitle'}>새 포스트 작성</h1>

                    {/* 상단 메타데이터 영역 */}
                    <div className={'metadataGrid'}>
                        {/* 제목 */}
                        <div className={'inputGroup'}>
                            <label htmlFor="title" className={'label'}>
                                제목
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                className={'input'}
                                value={postData.title}
                                onChange={handleChange}
                                placeholder="포스트 제목을 입력하세요"
                                required
                            />
                        </div>

                        {/* 카테고리 */}
                        <div className={'inputGroup'}>
                            <label htmlFor="category" className={'label'}>
                                카테고리
                            </label>
                            <select
                                id="category"
                                name="category"
                                className={'select'}
                                value={postData.category}
                                onChange={handleChange}
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 요약 */}
                    <div className={'inputGroup'}>
                        <label htmlFor="summary" className={'label'}>
                            요약 (Study List에 표시)
                        </label>
                        <input
                            id="summary"
                            name="summary"
                            type="text"
                            className={'input'}
                            value={postData.slug}
                            onChange={handleChange}
                            placeholder="리스트에서 보여줄 간결한 요약을 입력하세요 (50자 이내 권장)"
                        />
                    </div>

                    {/* 본문 에디터 (여기서는 간단한 TextArea 사용) */}
                    <div className={'inputGroup'}>
                        <label htmlFor="content" className={'label'}>
                            본문 (Markdown 지원)
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            className={'textarea'}
                            rows={20}
                            value={postData.content}
                            onChange={handleChange}
                            placeholder="여기에 Markdown 형식으로 본문을 작성하세요..."
                            required
                        />
                    </div>

                    {/* 저장 및 상태 표시 영역 */}
                    <div className={'actionArea'}>
                        <button type="submit" className={'saveButton'} disabled={isLoading}>
                            {isLoading ? '저장 중...' : '포스트 저장하기'}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default WriteComponent;
