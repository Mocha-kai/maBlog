interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (num: number) => void;
}

const MakePage = ({
    totalPages,
    currentPage,
    onPageChange,
}: PaginationProps
) => {
    // 임시 더미 데이터로 페이지 버튼 생성
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <>
            <div className={'pagination'} style={{ display: 'flex', gap:'3px'}}>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={`${'pageButton'} ${number === currentPage ? 'active' : ''}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </>
    );
};

export default MakePage;