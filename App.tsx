import React, { useState, useRef, useCallback } from 'react';
import WrappedCard from './components/WrappedCard';
import Editor from './components/Editor';
import { WrappedData, INITIAL_DATA } from './types';
import { toPng } from 'html-to-image';

const App: React.FC = () => {
  const [data, setData] = useState<WrappedData>(INITIAL_DATA);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (cardRef.current === null) {
      return;
    }
    setIsDownloading(true);

    try {
      // Small delay to ensure any webfonts or images are settled if needed, 
      // though html-to-image usually handles this.
      
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `my-wrapped-${data.year}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image', err);
      alert('Could not download image. Try using a screenshot instead.');
    } finally {
      setIsDownloading(false);
    }
  }, [data.year]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row items-center justify-center p-4 gap-8 md:gap-16">
      
      {/* Editor Panel */}
      <div className="w-full md:w-auto order-2 md:order-1 flex flex-col items-center">
        <Editor data={data} onChange={setData} />
      </div>

      {/* Preview Panel */}
      <div className="order-1 md:order-2 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold font-['Kanit'] tracking-tight text-white/50 mb-2 hidden md:block">PREVIEW</h1>
        
        <div className="p-4 border border-white/5 rounded-2xl bg-[#121212] shadow-2xl">
           <WrappedCard data={data} cardRef={cardRef} />
        </div>

        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="mt-4 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 hover:scale-105 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
        >
          {isDownloading ? (
            <span>Generating...</span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M12 9.75V15m0 0 3-3m-3 3-3-3m-6-6h1.5l2.5-5.25L12 3l2.25.75L16.5 9H18" />
              </svg>
              Download Image
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default App;