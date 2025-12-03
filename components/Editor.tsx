import React from 'react';
import { WrappedData, Language } from '../types';

interface EditorProps {
  data: WrappedData;
  onChange: (newData: WrappedData) => void;
}

const Editor: React.FC<EditorProps> = ({ data, onChange }) => {

  const handleChange = (field: keyof WrappedData, value: string | string[]) => {
    onChange({ ...data, [field]: value });
  };

  const handleArrayChange = (field: 'topArtists' | 'topSongs', index: number, value: string) => {
    const newArray = [...data[field]];
    newArray[index] = value;
    handleChange(field, newArray);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('imageSrc', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#1e1e1e] p-6 rounded-xl border border-white/10 w-full max-w-md h-[711px] overflow-y-auto flex flex-col gap-6 shadow-xl font-['Montserrat']">
      
      {/* General Settings */}
      <div className="space-y-4">
        <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Appearance</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
             <label className="block text-[10px] text-gray-500 mb-1 font-semibold uppercase">Language</label>
             <select 
                value={data.language} 
                onChange={(e) => handleChange('language', e.target.value as Language)}
                className="w-full bg-[#121212] border border-white/10 rounded p-2 text-white text-sm font-medium focus:border-white/30 outline-none"
             >
                <option value="de">Deutsch</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
             </select>
          </div>
          <div>
             <label className="block text-[10px] text-gray-500 mb-1 font-semibold uppercase">Year</label>
             <input 
                type="text" 
                value={data.year} 
                onChange={(e) => handleChange('year', e.target.value)}
                className="w-full bg-[#121212] border border-white/10 rounded p-2 text-white text-sm font-medium focus:border-white/30 outline-none"
             />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] text-gray-500 mb-1 font-semibold uppercase">Main Image</label>
            <label className="flex items-center justify-center w-full h-[38px] bg-[#121212] border border-white/10 rounded cursor-pointer hover:bg-white/5 transition-colors">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Upload</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <div>
             <label className="block text-[10px] text-gray-500 mb-1 font-semibold uppercase">Accent Color</label>
             <input 
                type="color" 
                value={data.accentColor} 
                onChange={(e) => handleChange('accentColor', e.target.value)}
                className="w-full h-[38px] bg-[#121212] border border-white/10 rounded cursor-pointer"
             />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Your Stats</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] text-gray-500 mb-1 font-semibold uppercase">Minutes</label>
            <input 
                type="text" 
                value={data.minutesListened} 
                onChange={(e) => handleChange('minutesListened', e.target.value)}
                className="w-full bg-[#121212] border border-white/10 rounded p-2 text-white text-sm font-medium focus:border-white/30 outline-none"
             />
          </div>
          <div>
            <label className="block text-[10px] text-gray-500 mb-1 font-semibold uppercase">Genre</label>
            <input 
                type="text" 
                value={data.topGenre} 
                onChange={(e) => handleChange('topGenre', e.target.value)}
                className="w-full bg-[#121212] border border-white/10 rounded p-2 text-white text-sm font-medium focus:border-white/30 outline-none"
             />
          </div>
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 mb-2 font-semibold uppercase">Top Artists</label>
          <div className="space-y-2">
            {data.topArtists.map((artist, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="text-gray-600 text-xs w-3 font-bold">{i + 1}</span>
                <input 
                  value={artist}
                  onChange={(e) => handleArrayChange('topArtists', i, e.target.value)}
                  className="flex-1 bg-[#121212] border border-white/10 rounded p-1.5 text-white text-sm font-medium focus:border-white/30 outline-none transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 mb-2 font-semibold uppercase">Top Songs</label>
          <div className="space-y-2">
            {data.topSongs.map((song, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="text-gray-600 text-xs w-3 font-bold">{i + 1}</span>
                <input 
                  value={song}
                  onChange={(e) => handleArrayChange('topSongs', i, e.target.value)}
                  className="flex-1 bg-[#121212] border border-white/10 rounded p-1.5 text-white text-sm font-medium focus:border-white/30 outline-none transition-colors"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;