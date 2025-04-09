
// This service handles OpenAI API integration
// In a production app, you should handle API calls through a backend
// to avoid exposing your API key in the frontend

export interface LessonRequest {
  topic: string;
  level: string;
  description?: string;
}

export interface LessonResponse {
  title: string;
  description: string;
  learningOutcomes: string[];
  keyConcepts: string[];
  activities: string[];
}

// Warning: This is not secure for production - API keys should be handled server-side
const OPENAI_API_KEY = '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';

export const generateLesson = async (request: LessonRequest): Promise<LessonResponse> => {
  try {
    // In production, you should call your backend endpoint instead
    // which would securely handle the API key
    const prompt = `
      Create a comprehensive lesson plan for a ${request.level} level course on the topic: "${request.topic}".
      ${request.description ? `Additional context: ${request.description}` : ''}
      
      Format the output as a JSON object with the following structure:
      {
        "title": "A catchy and descriptive title for the lesson",
        "description": "A paragraph describing what the lesson covers and why it's important",
        "learningOutcomes": ["Outcome 1", "Outcome 2", "Outcome 3", "Outcome 4"],
        "keyConcepts": ["Concept 1", "Concept 2", "Concept 3", "Concept 4", "Concept 5"],
        "activities": ["Activity 1", "Activity 2", "Activity 3", "Activity 4"]
      }
      
      The response must be valid JSON.
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Try to parse the JSON response
    try {
      const parsedResponse = JSON.parse(content);
      return parsedResponse;
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      
      // Fallback with a default response
      return {
        title: `${request.topic} for ${request.level.charAt(0).toUpperCase() + request.level.slice(1)}s`,
        description: request.description || `A comprehensive lesson about ${request.topic} for ${request.level} students.`,
        learningOutcomes: [
          `Understand the core concepts of ${request.topic}`,
          `Apply ${request.topic} principles in real-world scenarios`,
          `Analyze the impact of ${request.topic} in the broader context`,
          `Evaluate different approaches to ${request.topic}`
        ],
        keyConcepts: [
          `Introduction to ${request.topic}`,
          `History and evolution of ${request.topic}`,
          `Core principles of ${request.topic}`,
          `Advanced techniques in ${request.topic}`,
          `Future trends in ${request.topic}`
        ],
        activities: [
          `Group discussion: The importance of ${request.topic}`,
          `Case study analysis: ${request.topic} in action`,
          `Interactive exercise: Applying ${request.topic} principles`,
          `Quiz: Test your knowledge of ${request.topic}`
        ]
      };
    }
  } catch (error) {
    console.error('Error generating lesson:', error);
    throw new Error('Failed to generate lesson. Please try again later.');
  }
};
