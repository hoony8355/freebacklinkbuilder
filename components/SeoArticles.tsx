import React, { useEffect } from 'react';

const mockArticles = [
  {
    title: '2024년 SEO 트렌드: 검색 엔진 최적화의 미래',
    summary: '인공지능, 음성 검색, 사용자 경험(UX)이 SEO에 미치는 영향과 최신 전략을 알아봅니다.',
    link: '#',
  },
  {
    title: '초보자를 위한 키워드 리서치 완벽 가이드',
    summary: '효과적인 키워드를 발굴하고 콘텐츠에 적용하여 자연 유입을 늘리는 방법을 단계별로 설명합니다.',
    link: '#',
  },
  {
    title: '백링크 구축의 중요성과 효과적인 전략 5가지',
    summary: '웹사이트의 권위를 높이는 고품질 백링크를 확보하기 위한 검증된 전략들을 소개합니다.',
    link: '#',
  },
  {
    title: '콘텐츠 마케팅과 SEO의 시너지 효과 극대화하기',
    summary: '매력적인 콘텐츠를 제작하고 SEO와 결합하여 검색 순위를 높이는 통합 마케팅 접근법을 다룹니다.',
    link: '#',
  },
];

const SeoArticles: React.FC = () => {
  useEffect(() => {
    console.log('[SeoArticles] Component Mounted.');
    console.info('Displaying mock article data. In a real application, this would be fetched from an API.');
  }, []);

  return (
    <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-white mb-2">최신 SEO 아티클</h2>
      <p className="text-center text-gray-400 mb-8">
        (참고: 이 섹션은 데모용이며, 실제로는 외부 RSS 피드를 통해 자동으로 업데이트됩니다.)
      </p>

      <div className="space-y-6">
        {mockArticles.map((article, index) => (
          <div key={index} className="bg-gray-700 p-6 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">{article.title}</h3>
            <p className="text-gray-300 mb-4">{article.summary}</p>
            <a href={article.link} className="font-medium text-white hover:text-blue-300 group">
              더 알아보기
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &nbsp;→
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeoArticles;
