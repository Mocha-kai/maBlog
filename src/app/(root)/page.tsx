// MainPage.tsx (일부 수정)

import { GetPostsAllData } from '../api/Get/MogoDB_Get';
import MainPageComponent from '../component/pageComponent/main/mainPageComponent';

const MainPage = async () => {
    const postsInfo = await GetPostsAllData();
  
    return  <MainPageComponent data={postsInfo} />
    
};

export default MainPage;