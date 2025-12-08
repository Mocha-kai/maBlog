import { useState } from 'react';
import styles from './writeForm.module.css';
import { ConvertMarkdownToHtml } from '../../MKdouwn/transMD';

type InputTagType = 'input' | 'TextArea';
type InputType = {
    type: InputTagType;
    name: string;
};
type FormDataKeys = 'title' | 'content' | 'category' | 'date' | 'slug';
//====
const WriteForm = ({
    category,
    inputList,
    setIsClick,
}: {
    category: string[];
    inputList: InputType[];
    setIsClick: (bool: boolean) => void;
}) => {
    const [previewHtml, setPreviewHtml] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        date: new Date().toISOString().substring(0, 10),
        slug: '',
    });

    const ChangeFormData = (value: string, target: FormDataKeys) => {
        setFormData((prev) => ({ ...prev, [target]: value }));
    };

    const PreViewMK = async (value: string) => {
        const html = await ConvertMarkdownToHtml(value);
        setPreviewHtml(html.contentHtml);
    };

    const ClickSubmit = async () => {
        try {
            // 💡 핵심: fetch를 사용하여 서버 API Route 호출
            const response = await fetch('/api/Insert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), // 데이터를 JSON 형태로 전송
            });
            setFormData({
                title: '',
                content: '',
                category: '',
                date: new Date().toISOString().substring(0, 10),
                slug: '',
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div
                className="modalDiv"
                onClick={(e) => {
                    if (e.currentTarget === e.target) setIsClick(false);
                }}
            >
                <div className="modalContent">
                    <form onSubmit={ClickSubmit}>
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
                                        value={formData[v.name as FormDataKeys]}
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
                                        <div
                                            className={styles.preview}
                                            dangerouslySetInnerHTML={{ __html: previewHtml }}
                                        />
                                    </div>
                                </div>
                            )
                        )}
                        {/* 버튼 영역 */}
                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <button type="submit" className={styles.saveButton}>
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default WriteForm;
