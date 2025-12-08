import { useState } from 'react';
import styles from './writeForm.module.css';

type InputTagType = 'input' | 'TextArea';
type InputType = {
    type: InputTagType;
    name: string;
};
type FormDataKeys = 'stack' | 'slug' | 'color';
const WriteFormStack = ({ inputList }: { inputList: InputType[] }) => {
    const [formData, setFormData] = useState({
        stack: '',
        slug: '',
        color: '',
    });

    const ChangeFormData = (value: string, target: FormDataKeys) => {
        setFormData((prev) => ({ ...prev, [target]: value }));
    };
    const ClickSubmit = async () => {
        try {
            const response = await fetch('/api/controller/INSERT/stack', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), // 데이터를 JSON 형태로 전송
            });
            setFormData({
                stack: '',
                slug: '',
                color: '',
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form onSubmit={(e)=>{e.preventDefault(); ClickSubmit();}}>
            {inputList.map((v) => (
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
            ))}

            {/* 버튼 영역 */}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <button type="submit" className={styles.saveButton}>
                    Upload
                </button>
            </div>
        </form>
    );
};

export default WriteFormStack;
