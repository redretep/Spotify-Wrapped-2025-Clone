import { GoogleGenAI, Type } from "@google/genai";
import { WrappedData } from "../types";

export const generateWrappedData = async (persona: string): Promise<Partial<WrappedData>> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `You are a creative engine generating "Year in Music" summary stats (Wrapped style).
  Generate realistic looking data for Top Artists, Top Songs, Minutes Listened, and Top Genre based on a user persona.
  The output must be JSON.
  Minutes listened should be formatted like "27.031" (dot as thousand separator).
  Artist and Song names should be short and punchy.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate a music summary for this persona: "${persona}"`,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topArtists: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of 5 artist names",
          },
          topSongs: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of 5 song titles",
          },
          minutesListened: {
            type: Type.STRING,
            description: "Total minutes formatted like 12.345",
          },
          topGenre: {
            type: Type.STRING,
            description: "The top music genre",
          },
        },
        required: ["topArtists", "topSongs", "minutesListened", "topGenre"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as Partial<WrappedData>;
};
