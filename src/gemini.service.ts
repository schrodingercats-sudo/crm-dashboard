import { Injectable } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    // The API key is expected to be available in the process.env object.
    if (process.env.API_KEY) {
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        console.error('API_KEY not found in process.env');
    }
  }

  async generateContent(prompt: string): Promise<string> {
    if (!this.ai) {
      return Promise.reject(
        new Error('Gemini AI not initialized. Make sure API_KEY is provided.')
      );
    }

    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are an AI assistant within a CRM called Base44. Your responses should be professional, concise, and helpful for sales, marketing, or operations professionals. Format your response using markdown where appropriate (e.g., lists, bold text).',
        },
      });
      return response.text;
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate content. Please try again.');
    }
  }
}
