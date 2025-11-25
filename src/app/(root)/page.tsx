//더미 데이터
interface CardProps {
    title: string;
    category: string;
}

const PlaceholderCard: React.FC<CardProps> = ({ title, category }) => (
    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300">
        <span className="text-sm font-medium text-indigo-500">{category}</span>
        <h3 className="text-xl font-semibold mt-2 text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">간단한 요약...</p>
        <a href="/learn" className="text-indigo-600 mt-3 inline-block hover:underline">
            자세히 보기 &rarr;
        </a>
    </div>
);

interface SummaryProps {
    title: string;
    year: string;
    description: string;
}

const CareerSummaryItem: React.FC<SummaryProps> = ({ title, year, description }) => (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-200">
        <span className="text-xl font-bold text-indigo-500 mr-4 w-16 flex-shrink-0">{year}</span>
        <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    </div>
);
//=====================

const MainPage = () => {
    return <section>BASE</section>;
};

export default MainPage;
