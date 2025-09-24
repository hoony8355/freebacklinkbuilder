import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BacklinkGenerator from './components/BacklinkGenerator';
import SeoArticles from './components/SeoArticles';

type ActiveTab = 'generator' | 'articles';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('generator');

  useEffect(() => {
    console.log('--- 🚀 백링크무료생성 SEO 도우미 App Mounted ---');
    console.log('개발자 콘솔(F12)에서 앱의 동작 상태를 확인할 수 있습니다.');
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    console.log(`[App] Tab switched to '${tab}'`);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={handleTabChange} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {activeTab === 'generator' && <BacklinkGenerator />}
        {activeTab === 'articles' && <SeoArticles />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
