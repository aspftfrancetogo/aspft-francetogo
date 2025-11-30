
import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

// Safe access to process.env to prevent crashing in browsers where process is undefined
const getApiKey = (): string | undefined => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore error if process is not defined
  }
  return undefined;
};

const getGenAI = () => {
  if (!genAI) {
    const apiKey = getApiKey();
    if (apiKey) {
      genAI = new GoogleGenAI({ apiKey });
    }
  }
  return genAI;
};

export const initializeChat = async (systemInstruction: string) => {
  const ai = getGenAI();
  if (!ai) return null;

  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  // If no API key is available, return a mock response to prevent crashing
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("Gemini API Key missing. Returning mock response.");
    return "L'Assistant IA est en mode démonstration (Clé API manquante). Veuillez configurer la clé API pour activer l'intelligence artificielle.";
  }

  if (!chatSession) {
    await initializeChat("You are a helpful assistant for an association management platform. You help the user manage members, plan events, and organize documents. You are polite, professional, and concise.");
  }
  
  if (!chatSession) {
     // Fallback if init still fails
     return "Erreur d'initialisation de l'IA.";
  }

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text || "Je n'ai pas reçu de réponse.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Désolé, une erreur est survenue lors de la communication avec l'IA.";
  }
};
