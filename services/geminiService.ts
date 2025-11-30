import { GoogleGenAI, Type } from "@google/genai";
import { QuestionPaperAnalysis } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeQuestionPaper = async (paperContent: string, courseName: string): Promise<QuestionPaperAnalysis> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data.");
    return {
      bloomsDistribution: {
        'Remember': 20,
        'Understand': 30,
        'Apply': 25,
        'Analyze': 15,
        'Evaluate': 10
      },
      syllabusCoverage: 85,
      qualityScore: 78,
      suggestions: ["API Key missing. This is mock data.", "Add more analytical questions."],
      missingTopics: ["Unit 5: Advanced Concepts"]
    } as any;
  }

  const prompt = `
    You are an expert academic auditor. Analyze the following question paper content for the course "${courseName}".
    
    Paper Content:
    ${paperContent}

    Perform the following:
    1. Categorize questions based on Bloom's Taxonomy (Remember, Understand, Apply, Analyze, Evaluate, Create). Estimate percentage distribution.
    2. Estimate syllabus coverage (0-100%).
    3. Give a quality score (0-100) based on clarity, difficulty balance, and standard compliance.
    4. Provide 3 specific suggestions for improvement.
    5. Identify potential missing topics if standard curriculum implies them (make a best guess).

    Return ONLY a valid JSON object matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bloomsDistribution: {
              type: Type.OBJECT,
              properties: {
                Remember: { type: Type.NUMBER },
                Understand: { type: Type.NUMBER },
                Apply: { type: Type.NUMBER },
                Analyze: { type: Type.NUMBER },
                Evaluate: { type: Type.NUMBER },
                Create: { type: Type.NUMBER },
              }
            },
            syllabusCoverage: { type: Type.NUMBER },
            qualityScore: { type: Type.NUMBER },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            missingTopics: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as QuestionPaperAnalysis;
    }
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};

export const suggestTimetable = async (courses: string[], startDate: string): Promise<string> => {
   if (!apiKey) return "API Key Missing: Unable to generate schedule.";

   const prompt = `Generate a tentative exam timetable for these courses: ${courses.join(', ')}. 
   Exams start on ${startDate}. Avoid scheduling hard subjects back-to-back. 
   Return the output as a clean HTML table string (only the table content, <table>...</table>) with columns: Date, Day, Session (FN/AN), Course Code. Use Tailwind classes for styling (border, p-2).`;

   try {
     const response = await ai.models.generateContent({
       model: 'gemini-2.5-flash',
       contents: prompt,
     });
     return response.text || "Failed to generate timetable.";
   } catch (e) {
     console.error(e);
     return "Error generating timetable.";
   }
}
