import { useEffect, useState } from 'react';
import styles from './writeForm.module.css';
import { ConvertMarkdownToHtml } from '../../MKdouwn/transMD';
import { IPostDataWithHtml } from '@/app/api/models/posts/model_posts';

type InputTagType = 'input' | 'TextArea';
type InputType = {
    type: InputTagType;
    name: string;
};
export type FormDataKeys = 'title' | 'content' | 'category';
//====
const WriteFormFix = ({
    setIsOpen,
    formData,
    category,
    inputList,
    setPData,
    setDetailData,
}: {
    setIsOpen: (bool: boolean) => void;
    formData: IPostDataWithHtml;
    category: string[];
    inputList: InputType[];
    setPData: (data: IPostDataWithHtml[]) => void;
    setDetailData: (data: IPostDataWithHtml) => void;
}) => {
    const [previewHtml, setPreviewHtml] = useState('');
    const [updateData, setUpdateData] = useState<IPostDataWithHtml>(formData);

    useEffect(() => {
        //AbortController = 비동기 작업을 강제로 중단시키는 도구
        const controller = new AbortController();

        const convert = async () => {
            try {
                const { contentHtml } = await ConvertMarkdownToHtml(updateData.content);
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
    }, [updateData.content]);
    //===
    const ChangeFormData = (value: string, target: FormDataKeys) => {
        setUpdateData((prev) => ({ ...prev, [target]: value }));
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

        data.map((v) => {
            if (v._id === updateData._id) setDetailData(v);
        });
    };
    //===
    const ClickSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 💡 핵심: fetch를 사용하여 서버 API Route 호출
            const response = await fetch('/api/controller/UPDATE', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData), // 데이터를 JSON 형태로 전송
            });
            if (!response) return;
            RefreshData();
            setIsOpen(false);
        } catch (e) {
            console.log(e);
        }
    };

    if (!updateData) return;
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
                        value={updateData.category}
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
                                value={updateData[v.name as FormDataKeys]}
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
                                    value={updateData[v.name as FormDataKeys]}
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
                        Update
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

export default WriteFormFix;
