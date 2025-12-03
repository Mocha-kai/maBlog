import React, { useState } from 'react';
import styles from './WroteForm.module.css';

type InputTagType = 'input' | 'TextArea';
type InputType = {
    type: InputTagType;
    name: string;
};

const WriteForm = ({ category, inputList }: { category: string[]; inputList: InputType[] }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        date: new Date().toISOString().substring(0, 10),
        slug: '',
    });

    const ChangeFormData = (value: string, target:string) => {
        setFormData((prev) => ({ ...prev, [target]: value }));
    };
    const ClickSubmit = async () => {
        console.log('asd');
        try {
            // 💡 핵심: fetch를 사용하여 서버 API Route 호출
            const response = await fetch('/api/Insert', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData) // 데이터를 JSON 형태로 전송
            });

            console.log(response);

            setFormData({
                title: '',
                content: '',
                category: '',
                date: new Date().toISOString().substring(0, 10),
                slug: '',
            })
            
        }catch(e){
            console.log(e)
        }
    };

    return (
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
                        ChangeFormData(e.target.value,'category');
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
                            value={formData.title}
                            onChange={(e) => ChangeFormData(e.target.value, v.name)}
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
                            value={formData.content}
                            onChange={(e) => ChangeFormData(e.target.value, v.name)}
                            rows={4}
                            placeholder="contents"
                            required
                        />
                    </div>
                )
            )}
           

            {/* 버튼 영역 */}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <button type="submit" className={styles.saveButton}  >
                    Upload
                </button>
            </div>
        </form>
    );
};

export default WriteForm;
