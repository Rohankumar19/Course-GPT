
import { LessonGenerateRequest } from '@/types/course';

// Generate a prompt for creating a complete lesson
export const generateLessonPrompt = (request: LessonGenerateRequest): string => {
  return `
    Create a comprehensive lesson plan about "${request.topic}" for ${request.difficultyLevel} level ${request.targetAudience}.
    ${request.additionalInfo ? `Additional context: ${request.additionalInfo}` : ''}
    
    Format the response as a JSON object with the following structure:
    {
      "title": "A catchy title for the lesson",
      "description": "A comprehensive description of the lesson",
      "learningOutcomes": ["Outcome 1", "Outcome 2", "Outcome 3"],
      "keyConcepts": ["Concept 1", "Concept 2", "Concept 3", "Concept 4", "Concept 5"],
      "activities": [
        {
          "title": "Activity 1 Title",
          "description": "Activity 1 Description",
          "content": "Step-by-step content for the activity",
          "type": "Exercise"
        },
        {
          "title": "Activity 2 Title",
          "description": "Activity 2 Description",
          "content": "Step-by-step content for the activity",
          "type": "Discussion"
        }
      ],
      "assessments": [
        {
          "title": "Assessment 1 Title",
          "description": "Assessment 1 Description",
          "type": "Quiz",
          "questions": [
            {
              "question": "Question 1",
              "type": "Multiple Choice",
              "options": ["Option A", "Option B", "Option C", "Option D"],
              "correctAnswer": "Option A"
            },
            {
              "question": "Question 2",
              "type": "True/False",
              "correctAnswer": "True"
            },
            {
              "question": "Question 3",
              "type": "Short Answer"
            }
          ]
        }
      ]
    }
  `;
};

// Generate a prompt for regenerating a specific section
export const generateSectionPrompt = (
  request: LessonGenerateRequest,
  section: 'title' | 'description' | 'learningOutcomes' | 'keyConcepts' | 'activities' | 'assessments',
  currentValue?: any
): string => {
  let prompt = `
    I'm creating a lesson about "${request.topic}" for ${request.difficultyLevel} level ${request.targetAudience}.
    ${request.additionalInfo ? `Additional context: ${request.additionalInfo}` : ''}
    
    Please generate only the "${section}" section for this lesson.
  `;

  // Add specific instructions based on section
  switch(section) {
    case 'title':
      prompt += ' Create a catchy, engaging title for this lesson.';
      break;
    case 'description':
      prompt += ' Write a comprehensive description (3-5 sentences) that explains what the lesson covers.';
      break;
    case 'learningOutcomes':
      prompt += ' Create 3-5 specific learning outcomes that start with action verbs.';
      break;
    case 'keyConcepts':
      prompt += ' List 4-6 key concepts that are central to understanding this topic.';
      break;
    case 'activities':
      prompt += ` Create 2 engaging learning activities that help students master the material. Format as JSON array with activities having title, description, content, and type fields.`;
      break;
    case 'assessments':
      prompt += ` Create 1-2 assessments to evaluate student understanding, including multiple choice, true/false and short answer questions. Format as JSON.`;
      break;
  }

  if (currentValue) {
    prompt += `\n\nCurrent content: ${JSON.stringify(currentValue)}\n\nPlease improve upon this.`;
  }

  return prompt;
};
