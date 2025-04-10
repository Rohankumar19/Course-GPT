
// This service integrates with the OpenAI API to generate lessons

import { Lesson, LessonGenerateRequest } from '@/types/course';

// Export the LessonResponse type that's needed by LessonDisplay.tsx
export type LessonResponse = Lesson;

export const generateLesson = async (request: LessonGenerateRequest): Promise<Lesson> => {
  try {
    console.log('Generating lesson for:', request);
    
    // Check if API key is available
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key is missing. Please set the VITE_OPENAI_API_KEY environment variable.");
    }
    
    const prompt = `
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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational content creator specializing in creating detailed lesson plans for various educational levels.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Parse the content as JSON
    const content = data.choices[0].message.content;
    let parsedContent: Lesson;
    
    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      console.error('Failed to parse OpenAI response as JSON:', content);
      
      // Create a fallback response
      parsedContent = {
        title: `${request.topic} for ${request.targetAudience}`,
        description: request.additionalInfo || `A comprehensive lesson about ${request.topic} for ${request.difficultyLevel} ${request.targetAudience}.`,
        learningOutcomes: [
          `Understand the core concepts of ${request.topic}`,
          `Apply ${request.topic} principles in real-world scenarios`,
          `Evaluate different approaches to ${request.topic}`
        ],
        keyConcepts: [
          `Introduction to ${request.topic}`,
          `Core principles of ${request.topic}`,
          `Advanced techniques in ${request.topic}`,
          `Applications of ${request.topic}`,
          `Future trends in ${request.topic}`
        ],
        activities: [
          {
            title: `${request.topic} Exploration`,
            description: `A hands-on activity to explore ${request.topic} concepts.`,
            content: `In this activity, you will:\n1. Identify key elements of ${request.topic}\n2. Apply principles to a real-world scenario\n3. Reflect on your findings`,
            type: 'Exercise'
          },
          {
            title: `${request.topic} Case Study`,
            description: `Analyze a real-world application of ${request.topic}.`,
            content: `Review the provided case study and discuss:\n- How ${request.topic} was applied\n- Challenges encountered\n- Strategies for improvement`,
            type: 'Discussion'
          }
        ],
        assessments: [
          {
            title: `${request.topic} Knowledge Check`,
            description: `Test your understanding of key ${request.topic} concepts.`,
            type: 'Quiz',
            questions: [
              {
                question: `What is the primary purpose of ${request.topic}?`,
                type: 'Multiple Choice',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'Option A'
              },
              {
                question: `True or False: ${request.topic} is only applicable in enterprise environments.`,
                type: 'True/False',
                correctAnswer: 'False'
              },
              {
                question: `Describe a practical application of ${request.topic} in your field.`,
                type: 'Short Answer'
              }
            ]
          }
        ]
      };
    }
    
    return parsedContent;
  } catch (error) {
    console.error('Error generating lesson:', error);
    throw new Error('Failed to generate lesson. Please try again later.');
  }
};

export const regenerateSection = async (
  request: LessonGenerateRequest, 
  section: 'title' | 'description' | 'learningOutcomes' | 'keyConcepts' | 'activities' | 'assessments',
  currentValue?: any
): Promise<any> => {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key is missing.");
    }

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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational content creator specializing in creating detailed lesson plans.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Handle different return types based on section
    if (section === 'activities' || section === 'assessments') {
      try {
        // Find JSON in the response text
        const jsonMatch = content.match(/\[.*\]/s) || content.match(/\{.*\}/s);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        throw new Error('No valid JSON found in response');
      } catch (error) {
        console.error('Failed to parse JSON in OpenAI response:', content);
        return currentValue || [];
      }
    } else if (section === 'learningOutcomes' || section === 'keyConcepts') {
      // Try to parse list items
      try {
        const items = content.match(/(?:- |\d+\. )([^\n]+)/g) || [];
        if (items.length > 0) {
          return items.map(item => item.replace(/^(?:- |\d+\. )/, '').trim());
        }
        return content.split('\n').filter(line => line.trim().length > 0);
      } catch (error) {
        return [content.trim()];
      }
    } else {
      return content.trim();
    }
  } catch (error) {
    console.error(`Error regenerating ${section}:`, error);
    throw new Error(`Failed to regenerate ${section}. Please try again later.`);
  }
};
