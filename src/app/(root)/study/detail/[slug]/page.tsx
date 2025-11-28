import { GetPostOneData } from '@/app/api/Get/MogoDB_Get';
import StudyDetailComponent from '@/app/component/pageComponent/study/detail/studyDetail';

const StudyDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const post = await GetPostOneData(slug);
    
    return <StudyDetailComponent post={post} />;
};

export default StudyDetailPage;
