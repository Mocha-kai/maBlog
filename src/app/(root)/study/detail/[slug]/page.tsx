import StudyDetailComponent from '@/app/component/pageComponent/study/detail/studyDetail';

const StudyDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    return <StudyDetailComponent slug={slug} />;
};

export default StudyDetailPage;
