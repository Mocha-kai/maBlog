'use client';

import { env } from 'process';
import Style from './footer.module.css';

const FooterLayout = () => {
    const currentYear = new Date().getFullYear();
    const email = env.GIT_EMAIL;

    return (
        <footer className={Style.footerContainer}>
            <div className={Style.footerInner}>
                {/* 상단: 브랜드 및 간단한 소개 */}
                <div className={Style.topSection}>
                    <div className={Style.brand}>
                        Ma<span className={Style.accent}>_</span>Blog
                    </div>
                    <p className={Style.description}>평안하기를</p>
                </div>

                {/* 중간: 링크 영역 (소셜, 연락처 등) */}
                <div className={Style.linkSection}>
                    <a href={email} target="_blank" rel="noopener noreferrer" className={Style.link}>
                        GitHub
                    </a>
                    <span className={Style.separator}>/</span>
                    <a href={`mailto:${email}`} className={Style.link}>
                        Email:kai@mocha-company.com
                    </a>
                </div>

                {/* 하단: 저작권 표시 */}
                <div className={Style.copyright}>&copy; {currentYear} Ma_Blog. All rights reserved.</div>
            </div>
        </footer>
    );
};

export default FooterLayout;
