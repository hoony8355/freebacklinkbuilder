import React from 'react';

interface HeaderProps {
  activeTab: 'generator' | 'articles';
  setActiveTab: (tab: 'generator' | 'articles') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const getTabClass = (tabName: 'generator' | 'articles') => {
    return activeTab === tabName
      ? 'bg-blue-600 text-white'
      : 'text-gray-400 hover:bg-gray-700 hover:text-white';
  };

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-2xl font-bold text-white mb-4 sm:mb-0">
          <h1>백링크무료생성 SEO 도우미</h1>
        </div>
        <nav className="flex space-x-2 bg-gray-900 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${getTabClass('generator')}`}
            aria-current={activeTab === 'generator'}
          >
            백링크 생성기
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${getTabClass('articles')}`}
            aria-current={activeTab === 'articles'}
          >
            SEO 아티클
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
