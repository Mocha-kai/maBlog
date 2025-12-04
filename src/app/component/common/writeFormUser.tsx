import { useState } from 'react';
import styles from './writeForm.module.css';

type InputTagType = 'input' | 'TextArea';
type InputType = {
    type: InputTagType;
    name: string;
};
type FormDataKeys = 'stack' | 'slug';
const WriteFormUser = ({ inputList }: { inputList: InputType[] }) => {
    const [formData, setFormData] = useState({
        name: '',
        stack: [],
        age: 0,
        msg: '',
        slug: '',
    });

    const ChangeFormData = (value: string, target: FormDataKeys) => {
        setFormData((prev) => ({ ...prev, [target]: value }));
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
                name: '',
                stack: [],
                age: 0,
                msg: '',
                slug: '',
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form onSubmit={ClickSubmit}>
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
                        <textarea
                            className={styles.textarea}
                            id="modal-content"
                            name="content"
                            value={formData[v.name as FormDataKeys]}
                            onChange={(e) => ChangeFormData(e.target.value, v.name as FormDataKeys)}
                            rows={4}
                            placeholder="contents"
                            required
                        />
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
    );
};

export default WriteFormUser;
