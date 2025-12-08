import { GetPostOneData } from '@/app/api/controller/GET/GETmDBTypePosts';
import ListDetailComponent from '@/app/component/pageComponent/list/detail/listDetail';

const ListDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const post = await GetPostOneData(slug);
    
    return <ListDetailComponent post={post} />;
};

export default ListDetailPage;
