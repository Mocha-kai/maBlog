//===
import TopLayout from '../component/baseLayout/top';
import FooterLayout from '../component/baseLayout/bottom';
//===
import '../../app/globals.css';

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
                <TopLayout />

                {/* main 영역이 남은 공간을 다 차지하도록 flex: 1 설정 */}
                <main style={{ flex: 1, width: '100%' }}>{children}</main>

                <FooterLayout />
            </body>
        </html>
    );
}
