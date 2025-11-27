'use client';
import Link from 'next/link';
import Style from './top.module.css';
import CurTime from '../common/curTime';

const TopLayout = () => {
    return (
        <header className={Style.glassHeader}>
            <div className={Style.headerInner}>
                {/* 1. 로고 영역 */}
                <Link href="/" className={Style.logoLink}>
                    <div className={Style.logoText}>
                        Ma<span className={Style.accent}>_</span>Blog
                    </div>
                </Link>

                {/* 2. 네비게이션 메뉴 영역 추가 */}
                <nav className={Style.navMenu}>
                    <ul className={Style.navList}>
                        <li className={Style.navItem}>
                            <Link href="/career" className={Style.navLink}>
                                career
                            </Link>
                        </li>
                        <li className={Style.navItem}>
                            <Link href="/study" className={Style.navLink}>
                                study
                            </Link>
                        </li>
                        <li className={Style.navItem}>
                            <Link href="/record" className={Style.navLink}>
                                record
                            </Link>
                        </li>
                        <li className={Style.navItem}>
                            <Link href="/hobby" className={Style.navLink}>
                                hobby
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default TopLayout;
