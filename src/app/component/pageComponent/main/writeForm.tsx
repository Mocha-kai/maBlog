import { useEffect, useState } from 'react';
import styles from './writeForm.module.css';
import { ConvertMarkdownToHtml } from '../../MKdouwn/transMD';
import { BaseInsertPostType, IPostDataWithHtml } from '@/app/api/models/posts/model_posts';

type InputTagType = 'input' | 'TextArea' | 'date';
type InputType = {
    type: InputTagType;
    name: string;
};
export type FormDataKeys = 'title' | 'content' | 'category' | 'slug';
//====
const WriteForm = ({
    setIsOpen,
    category,
    inputList,
    setPData,
}: {
    setIsOpen: (bool: boolean) => void;
    category: string[];
    inputList: InputType[];
    setPData: (data: IPostDataWithHtml[]) => void;
}) => {
    const [previewHtml, setPreviewHtml] = useState<string>('');
    const [formData, setFormData] = useState<BaseInsertPostType>({
        title: '',
        content: '',
        category: category[0],
        date: new Date(),
        slug: '',
    });

    useEffect(() => {
        //AbortController = 비동기 작업을 강제로 중단시키는 도구
        const controller = new AbortController();

        const convert = async () => {
            try {
                const { contentHtml } = await ConvertMarkdownToHtml(formData.content);
                if (!controller.signal.aborted) {
                    setPreviewHtml(contentHtml || '');
                }
            } catch (e) {
                if (!controller.signal.aborted) {
                    console.log(e);
                    setPreviewHtml('');
                }
            }
        };

        convert();
        return () => controller.abort();
    }, [formData.content]);
    //===
    const ChangeFormData = (value: string, target: FormDataKeys) => {
        setFormData((prev) => ({ ...prev, [target]: value }));
    };
    //===
    const PreViewMK = async (value: string) => {
        const html = await ConvertMarkdownToHtml(value);
        setPreviewHtml(html.contentHtml);
    };
    //===
    const RefreshData = async () => {
        const res = await fetch('/api/controller/GET/posts');
        const data: IPostDataWithHtml[] = await res.json();
        setPData(data);
    };
    //===
    const ClickSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/controller/INSERT/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response) return;

            setFormData({
                title: '',
                content: '',
                category: '',
                date: new Date(),
                slug: '',
            });
            //넣었으니 데이터 최신화 작업
            RefreshData();
            setIsOpen(false);
        } catch (e) {
            console.log(e);
        }
    };
    //===
    return (
        <section style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            <form onSubmit={ClickSubmit} style={{ width: '600px', margin: '0 auto' }}>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="modal-category">
                        category
                    </label>
                    <select
                        className={styles.select}
                        id="modal-category"
                        name="category"
                        value={formData.category}
                        onChange={(e) => {
                            ChangeFormData(e.target.value, 'category');
                        }}
                        required
                    >
                        {category.map((v) => (
                            <option value={v} key={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </div>

                {inputList.map((v) =>
                    v.type === 'input' ? (
                        <div className={styles.inputGroup} key={v.name}>
                            <label className={styles.label} htmlFor="modal-title">
                                {v.name}
                            </label>
                            <input
                                className={styles.input}
                                id="modal-title"
                                name="title"
                                type="text"
                                value={formData[v.name as FormDataKeys].toString()}
                                onChange={(e) => ChangeFormData(e.target.value, v.name as FormDataKeys)}
                                required
                            />
                        </div>
                    ) : (
                        <div className={styles.inputGroup} key={v.name}>
                            <label className={styles.label} htmlFor="modal-content">
                                {v.name}
                            </label>
                            <div className={styles.editorRow}>
                                <textarea
                                    className={styles.textarea}
                                    id="modal-content"
                                    name="content"
                                    value={formData[v.name as FormDataKeys]}
                                    onChange={(e) => {
                                        ChangeFormData(e.target.value, v.name as FormDataKeys);
                                        PreViewMK(e.target.value);
                                    }}
                                    rows={4}
                                    placeholder="contents"
                                    required
                                />
                            </div>
                        </div>
                    )
                )}
                {/* 버튼 영역 */}
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end' }}>
                    <button type="submit" className={'dashboardBtn'}>
                        Upload
                    </button>
                    <button type="submit" className={'dashboardBtn'} onClick={() => setIsOpen(false)}>
                        [x]
                    </button>
                </div>
            </form>
            <div className={styles.preview} dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </section>
    );
};

export default WriteForm;
