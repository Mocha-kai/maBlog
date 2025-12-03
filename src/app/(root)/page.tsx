
export const dynamic = "force-dynamic";

import { GetPostsAllData } from '../api/Get/MogoDB_Get';
import { IPostDocument } from '../api/models/mDBTypeSetting';
import MainPageComponent from '../component/pageComponent/main/mainPageComponent';

const MainPage = async () => {
    let postsInfo: IPostDocument[] = [];
    try {
        postsInfo = await GetPostsAllData();
    } catch (error) {
        console.error('❌ SERVER CRASH LOG: GetPostsAllData에서 치명적인 오류 발생!', error);
    }
    return (
            <MainPageComponent data={postsInfo} />
    );
};

export default MainPage;