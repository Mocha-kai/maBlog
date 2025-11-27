export const formatPostDate = (date: Date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' } as const;
    // 'ko-KR' 로케일로 한국 날짜 형식 사용
    return new Intl.DateTimeFormat('ko-KR', options).format(new Date(date)).replace(/ /g, '').replace(/\./g, '. ');
};
