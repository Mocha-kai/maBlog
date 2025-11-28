import { GetPostsAllData } from '@/app/api/Get/MogoDB_Get';
import { IPostData } from '@/app/api/models/mDBTypeSetting';
import StudyMain from '@/app/component/pageComponent/study/studyMain';

const StudyPage = async () => {
    const postsInfo: IPostData[] = await GetPostsAllData();

    return <StudyMain postsInfo={postsInfo}  /> 
};

export default StudyPage;
