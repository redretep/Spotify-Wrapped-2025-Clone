export type Language = 'de' | 'en' | 'es' | 'fr' | 'pt';

export interface WrappedData {
  topArtists: string[];
  topSongs: string[];
  minutesListened: string;
  topGenre: string;
  year: string;
  imageSrc: string;
  accentColor: string; // The purple/blue color for the year
  language: Language;
}

export const INITIAL_DATA: WrappedData = {
  topArtists: ["$OHO BANI", "01099", "Ski Aggu", "Symba", "NF"],
  topSongs: ["BERGSTEIGEN", "OLYMPIA", "NPCs (mit Aggu)", "Powerade", "Uludağ und Sor..."],
  minutesListened: "27.031",
  topGenre: "Deutscher...",
  year: "2023",
  imageSrc: "https://images.unsplash.com/photo-1585110396000-c92857419dae?q=80&w=1000&auto=format&fit=crop", // Rabbit placeholder
  accentColor: "#8B75FF",
  language: 'de'
};