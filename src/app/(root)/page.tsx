export const dynamic = 'force-dynamic';

import { GetPostsAllData } from '../api/controller/GET/GETmDBTypePosts';
import { GetStackAllData } from '../api/controller/GET/GETmDBTypeStack';
import { IPostDataWithHtml } from '../api/models/posts/model_posts';
import { IStackDocument } from '../api/models/stacks/model_stacks';

import MainPageComponent from '../component/pageComponent/main/mainPageComponent';

const MainPage = async () => {
    let postsInfo: IPostDataWithHtml[] = [];
    let stackInfo: IStackDocument[] = [];
    try {
        postsInfo = await GetPostsAllData();
        stackInfo = await GetStackAllData();
    } catch (error) {
        console.error('❌ SERVER CRASH LOG: GetPostsAllData에서 치명적인 오류 발생!', error);
    }
    return <MainPageComponent postData={postsInfo} stackData={stackInfo} />;
};

export default MainPage;
