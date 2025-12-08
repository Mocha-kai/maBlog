import { GetPostsAllData } from '@/app/api/controller/GET/GETmDBTypePosts';
import { BaseInsertPostType } from '@/app/api/models/posts/model_posts';

import ListMain from '@/app/component/pageComponent/list/studyMain';

const ListPage = async () => {
    const postsInfo: BaseInsertPostType[] = await GetPostsAllData();

    return <ListMain postsInfo={postsInfo}  /> 
};

export default ListPage;
