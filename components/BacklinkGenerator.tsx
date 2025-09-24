import React, { useState, useCallback, useEffect } from 'react';
import { BACKLINK_TEMPLATES } from '../constants';
import { LinkStatus, GeneratedLink } from '../types';
import CheckIcon from './icons/CheckIcon';
import SpinnerIcon from './icons/SpinnerIcon';

const BacklinkGenerator: React.FC = () => {
  const [urlInput, setUrlInput] = useState<string>('');
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    console.log('[BacklinkGenerator] Component Mounted.');
  }, []);

  const handleGenerate = useCallback(async () => {
    console.groupCollapsed('[BacklinkGenerator] Starting Generation Process');
    console.log(`User Input URL: "${urlInput}"`);
    
    if (!urlInput.trim()) {
      setError('웹사이트 URL을 입력해주세요.');
      console.warn('Validation failed: URL input is empty.');
      console.groupEnd();
      return;
    }
    
    let formattedUrl = urlInput.trim();
    if (!/^(https?:\/\/)/i.test(formattedUrl)) {
      formattedUrl = `http://${formattedUrl}`;
      console.log(`Protocol "http://" added: ${formattedUrl}`);
    }

    try {
      new URL(formattedUrl);
      setError('');
      console.log('URL format is valid.');
    } catch (_) {
      setError('유효한 URL 형식이 아닙니다.');
      console.error(`Validation failed: Invalid URL format for "${formattedUrl}"`);
      console.groupEnd();
      return;
    }
    
    const domain = new URL(formattedUrl).hostname.replace(/^www\./, '');
    console.log(`Extracted domain: ${domain}`);

    setIsGenerating(true);
    setError('');
    setProgress(0);
    setGeneratedLinks([]);
    console.log(`Found ${BACKLINK_TEMPLATES.length} backlink templates.`);

    const initialLinks: GeneratedLink[] = BACKLINK_TEMPLATES.map((template, index) => ({
      id: index,
      template,
      url: '',
      status: LinkStatus.PENDING,
    }));
    setGeneratedLinks(initialLinks);
    console.log('Initialized link states to PENDING.');
    console.groupEnd();

    console.group('[BacklinkGenerator] Link Generation Loop');
    for (let i = 0; i < initialLinks.length; i++) {
      console.log(`--- Processing link #${i + 1} ---`);
      await new Promise(resolve => setTimeout(resolve, 150));
      
      setGeneratedLinks(prev => {
        const newLinks = [...prev];
        newLinks[i] = { ...newLinks[i], status: LinkStatus.GENERATING };
        return newLinks;
      });
      console.log(`Status for link #${i + 1} updated to GENERATING.`);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let finalUrl = '';
      setGeneratedLinks(prev => {
        const newLinks = [...prev];
        finalUrl = newLinks[i].template.replace('[사이트주소]', domain);
        newLinks[i] = { ...newLinks[i], url: finalUrl, status: LinkStatus.COMPLETED };
        return newLinks;
      });
      console.log(`Status for link #${i + 1} updated to COMPLETED. URL: ${finalUrl}`);

      const newProgress = Math.round(((i + 1) / initialLinks.length) * 100);
      setProgress(newProgress);
      console.log(`Progress: ${newProgress}%`);
    }
    console.groupEnd();

    console.log('[BacklinkGenerator] Generation Process Finished.');
    setIsGenerating(false);
  }, [urlInput]);

  return (
    <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-white mb-2">무료 백링크 생성기</h2>
      <p className="text-center text-gray-400 mb-6">당신의 웹사이트 URL을 입력하고 SEO를 강화하세요.</p>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://example.com"
          className="flex-grow bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          disabled={isGenerating}
          aria-label="웹사이트 URL 입력"
        />
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-blue-600 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-300 transform hover:scale-105"
        >
          {isGenerating ? <SpinnerIcon className="animate-spin h-5 w-5 mx-auto" /> : '생성 시작'}
        </button>
      </div>

      {error && <p className="text-red-400 text-center mb-4" role="alert">{error}</p>}
      
      {(isGenerating || generatedLinks.length > 0) && (
        <div className="mt-8" aria-live="polite">
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-4 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-400 mt-2">{progress}% 완료</p>
        </div>
      )}

      {generatedLinks.length > 0 && (
        <div className="mt-6 max-h-[50vh] overflow-y-auto pr-2">
          <ul className="space-y-3">
            {generatedLinks.map((link) => (
              <li key={link.id} className="bg-gray-700 p-4 rounded-lg flex items-center justify-between transition-all duration-300">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {link.status === LinkStatus.COMPLETED ? <CheckIcon className="text-green-400"/> : <SpinnerIcon className="animate-spin text-blue-400"/>}
                  </div>
                  <span className="truncate text-gray-300">{link.status === LinkStatus.COMPLETED ? link.url : link.template.replace('[사이트주소]','...')}</span>
                </div>
                {link.status === LinkStatus.COMPLETED ? (
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 font-semibold whitespace-nowrap">
                    방문하기
                  </a>
                ) : (
                  <span className="text-sm text-gray-500 whitespace-nowrap">생성 중...</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {progress === 100 && !isGenerating && (
         <div className="mt-8 text-center bg-green-900/50 border border-green-500 text-green-300 px-4 py-3 rounded-lg" role="status">
            <p className="font-bold">성공!</p>
            <p className="text-sm">총 {generatedLinks.length}개의 백링크 생성이 완료되었습니다.</p>
        </div>
      )}
    </div>
  );
};

export default BacklinkGenerator;
