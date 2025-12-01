'use client'

import { IPostData, IPostDocument } from "@/app/api/models/mDBTypeSetting";
import { useState } from "react";
import PostCard from "../../card/card";
import WriteForm from "../../common/writeForm";

const MainPageComponent = ({data}: {data: IPostDocument[]}) =>{

    const [isClick, setIsClick] = useState<boolean>(false);

        return <>
          <main className="main-content">
                         {/* 1. 환영 섹션 */}
                         <section
                             style={{
                                 padding: '60px 0',
                                 textAlign: 'center',
                                 maxWidth: '800px',
                                 margin: '0 auto',
                             }}
                         >
                             <h1
                                 style={{
                                     fontSize: '3rem',
                                     fontWeight: '900',
                                     marginBottom: '0.5rem',
                                     color: '#2c2c2c',
                                 }}
                             >
                                 Ma_Dev
                             </h1>
                             <p
                                 style={{
                                     fontSize: '1.25rem',
                                     color: '#f7931e',
                                     fontWeight: '700',
                                     marginBottom: '2rem',
                                 }}
                             >
                                하루가 짧다.
                             </p>
                         </section>
         
                         {/* 2. 게시글 목록 섹션 */}
                         <section style={{ padding: '40px 0', borderTop: '1px solid #eee' }}>
                           
                             <h2 style={{ display: 'flex',justifyContent:'space-between' , textAlign: 'left', color: '#444', marginBottom: '30px' }}>Recent Contents
                                 <button className="blog-primary-btn" onClick={()=>setIsClick(true)}>Insert</button>
                             </h2>
                             {/* 💡 카드 목록을 위한 Grid 컨테이너 (인라인 스타일 사용) */}
                             <div
                                 style={{
                                     // Grid 레이아웃 적용
                                     display: 'grid',
                                     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                     gap: '30px', /* 카드 사이 간격 */
                                     maxWidth: '1200px',
                                 }}
                             >
                                 {data.map((v) => (
                                     <PostCard key={v._id.toString()} post={v} />
                                 ))}
                             </div>
                         </section>
                        {isClick && 
                        <div className='modalDiv'>
                                <div className='modalContent'>
                                    <WriteForm category={['study', 'career', 'hobby']} inputList={[
                                        {name: 'title', type:'input'},   
                                        {name: 'content', type:'TextArea'},
                                        {name: 'slug', type:'input'},
                                    ]} />
                                    <button className='blog-exit-btn' onClick={()=>setIsClick(false)}>exit</button>
                                </div> 
                            </div>
                        }
                 </main>
        </>
}

export default MainPageComponent;