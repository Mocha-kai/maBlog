//===
import AuthProviderWrapper from '../component/authProvider/authProviderWrapper';
//===
import TopLayout from '../component/baseLayout/top';
import FooterLayout from '../component/baseLayout/bottom';
//===
import '../../app/globals.css';
import '@/app/css/list/listDetail.css';
import '@/app/css/common/makePage.css';
import '@/app/css/common/btn.css';
import '@/app/css/common/modal.css';
import '@/app/css/common/aboutMe.css';
import '@/app/css/common/main.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body>
                <AuthProviderWrapper>
                    {/* top */}
                    <TopLayout />
                    {/* main */}
                    <main style={{ flex: 1 }}>{children}</main>
                    {/* bottom */}
                    {/* <FooterLayout /> */}
                </AuthProviderWrapper>
            </body>
        </html>
    );
}
