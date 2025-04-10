
// Main OpenAI service for lesson generation and regeneration

import { Lesson, LessonGenerateRequest } from '@/types/course';
import { makeOpenAIRequest } from './api/openaiClient';
import { generateLessonPrompt, generateSectionPrompt } from './prompts/lessonPrompts';
import { createFallbackLesson } from './fallbacks/lessonFallbacks';
import { parseJsonResponse, parseSectionResponse } from './utils/responseParser';

// Export the LessonResponse type that's needed by LessonDisplay.tsx
export type LessonResponse = Lesson;

export const generateLesson = async (request: LessonGenerateRequest): Promise<Lesson> => {
  try {
    console.log('Generating lesson for:', request);
    
    try {
      const data = await makeOpenAIRequest([
        {
          role: 'system',
          content: 'You are an expert educational content creator specializing in creating detailed lesson plans for various educational levels.'
        },
        {
          role: 'user',
          content: generateLessonPrompt(request)
        }
      ]);
      
      // Parse the content as JSON
      const content = data.choices[0].message.content;
      const parsedContent = parseJsonResponse(content);
      
      if (parsedContent) {
        return parsedContent;
      } else {
        return createFallbackLesson(request);
      }
    } catch (error) {
      console.error('API call failed:', error);
      return createFallbackLesson(request);
    }
  } catch (error) {
    console.error('Error generating lesson:', error);
    return createFallbackLesson(request);
  }
};

export const regenerateSection = async (
  request: LessonGenerateRequest, 
  section: 'title' | 'description' | 'learningOutcomes' | 'keyConcepts' | 'activities' | 'assessments',
  currentValue?: any
): Promise<any> => {
  try {
    try {
      const data = await makeOpenAIRequest([
        {
          role: 'system',
          content: 'You are an expert educational content creator specializing in creating detailed lesson plans.'
        },
        {
          role: 'user',
          content: generateSectionPrompt(request, section, currentValue)
        }
      ], 0.7, 1000);

      const content = data.choices[0].message.content;
      return parseSectionResponse(content, section);
    } catch (error) {
      console.error(`Error regenerating ${section}:`, error);
      // Return fallback data for the specific section
      const fallbackLesson = createFallbackLesson(request);
      return fallbackLesson[section as keyof Lesson];
    }
  } catch (error) {
    console.error(`Error regenerating ${section}:`, error);
    // Return fallback data for the specific section
    const fallbackLesson = createFallbackLesson(request);
    return fallbackLesson[section as keyof Lesson];
  }
};
