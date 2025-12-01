//===
import QueryProvider from '../component/queryProvider/queryProvider';
//===
import TopLayout from '../component/baseLayout/top';
import FooterLayout from '../component/baseLayout/bottom';
//===
import '../../app/globals.css';
import '@/app/css/study/study.css';
import '@/app/css/study/studyDetail.css';
import '@/app/css/common/makePage.css';
import '@/app/css/common/btn.css';
import '@/app/css/common/modal.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    margin: 0,
                }}
            >
                <QueryProvider>
                    <TopLayout />
                    <main style={{ flex: 1, width: '100%' }}>{children}</main>
                </QueryProvider>

                <FooterLayout />
            </body>
        </html>
    );
}
