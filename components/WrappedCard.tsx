import React from 'react';
import { WrappedData, Language } from '../types';
import { SpotifyLogo, Checkerboard } from './Icons';

interface WrappedCardProps {
  data: WrappedData;
  cardRef?: React.RefObject<HTMLDivElement>;
}

const TRANSLATIONS: Record<Language, { artists: string; songs: string; minutes: string; genre: string }> = {
  de: { artists: "Top-Artists", songs: "Top-Songs", minutes: "Gehörte Minuten", genre: "Top-Genre" },
  en: { artists: "Top Artists", songs: "Top Songs", minutes: "Minutes Listened", genre: "Top Genre" },
  es: { artists: "Artistas Top", songs: "Canciones Top", minutes: "Minutos Escuchados", genre: "Top Género" },
  fr: { artists: "Top Artistes", songs: "Top Titres", minutes: "Minutes D'écoute", genre: "Top Genre" },
  pt: { artists: "Top Artistas", songs: "Top Músicas", minutes: "Minutos Ouvidos", genre: "Top Gênero" },
};

const WrappedCard: React.FC<WrappedCardProps> = ({ data, cardRef }) => {
  const t = TRANSLATIONS[data.language] || TRANSLATIONS.de;

  return (
    <div 
      ref={cardRef}
      className="relative w-[400px] h-[711px] bg-[#191919] overflow-hidden flex flex-col font-['Montserrat'] shadow-2xl select-none text-white"
      style={{ aspectRatio: '9/16' }}
    >
      {/* --- TOP SECTION (Graphics) --- */}
      <div className="relative h-[390px] w-full flex bg-[#191919]">
        
        {/* Left: Year Graphic */}
        <div className="w-[85px] h-full relative overflow-hidden bg-[#191919] flex items-center justify-center">
             {/* Large Year Text */}
             <div 
               className="absolute whitespace-nowrap text-[150px] leading-none font-black tracking-tighter italic origin-center -rotate-90 select-none opacity-90"
               style={{ 
                 color: data.accentColor,
                 textShadow: '3px 3px 0px rgba(0,0,0,0.3)',
                 left: '-160px', /* Adjust based on length/rotation center */
               }}
             >
               {data.year}
             </div>
             
             {/* Decorative graphic lines behind year if any */}
             <div className="absolute inset-y-0 right-0 w-[1px] bg-white/10"></div>
        </div>

        {/* Right: Main Image */}
        <div className="flex-1 h-full relative flex items-center justify-center p-4 pl-2">
          {/* Image Container with White Border */}
          <div className="relative w-full aspect-square border-[5px] border-white shadow-lg overflow-hidden z-10">
             <img 
               src={data.imageSrc} 
               alt="Top Artist" 
               className="w-full h-full object-cover"
             />
             {/* Gloss/Reflection effect overlay */}
             <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none"></div>
          </div>
          
          {/* Abstract graphic element behind the image (optional based on 2023 style) */}
          <div 
            className="absolute top-10 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: data.accentColor }}
          ></div>
        </div>
      </div>

      {/* --- MIDDLE DIVIDER --- */}
      <div className="w-full z-20">
        <Checkerboard />
      </div>

      {/* --- BOTTOM SECTION (Stats) --- */}
      <div className="flex-1 bg-[#191919] p-5 pt-6 flex flex-col relative overflow-hidden">
        
        {/* Background gradient hint */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Lists Grid */}
        <div className="grid grid-cols-2 gap-x-6 mb-6">
          
          {/* Top Artists */}
          <div className="flex flex-col gap-1">
            <h3 className="text-[11px] font-bold text-[#b3b3b3] uppercase tracking-[0.05em] mb-1">{t.artists}</h3>
            <ol className="space-y-[2px]">
              {data.topArtists.slice(0, 5).map((artist, i) => (
                <li key={i} className="flex items-baseline gap-2 overflow-hidden">
                  <span className="font-bold text-sm min-w-[12px] text-white">{i + 1}</span>
                  <span className="font-extrabold text-[15px] whitespace-nowrap overflow-hidden text-ellipsis leading-tight text-white">{artist}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Top Songs */}
          <div className="flex flex-col gap-1">
            <h3 className="text-[11px] font-bold text-[#b3b3b3] uppercase tracking-[0.05em] mb-1">{t.songs}</h3>
            <ol className="space-y-[2px]">
              {data.topSongs.slice(0, 5).map((song, i) => (
                <li key={i} className="flex items-baseline gap-2 overflow-hidden">
                  <span className="font-bold text-sm min-w-[12px] text-white">{i + 1}</span>
                  <span className="font-extrabold text-[15px] whitespace-nowrap overflow-hidden text-ellipsis leading-tight text-white">{song}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-x-6 mt-auto mb-6">
          <div>
            <h3 className="text-[11px] font-bold text-[#b3b3b3] uppercase tracking-[0.05em] mb-0">{t.minutes}</h3>
            <div className="font-black text-[32px] leading-tight tracking-tight text-white">{data.minutesListened}</div>
          </div>
          <div>
            <h3 className="text-[11px] font-bold text-[#b3b3b3] uppercase tracking-[0.05em] mb-0">{t.genre}</h3>
            <div className="font-black text-[26px] leading-tight tracking-tight text-white break-words">{data.topGenre}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <SpotifyLogo />
          </div>
          <span className="font-black text-[13px] tracking-[0.15em] text-white/90">SPOTIFY.COM/WRAPPED</span>
        </div>

      </div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-50"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}
      ></div>
    </div>
  );
};

export default WrappedCard;