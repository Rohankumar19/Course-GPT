
// This service integrates with the OpenAI API to generate lessons

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

export const generateLesson = async (request: LessonRequest): Promise<LessonResponse> => {
  try {
    console.log('Generating lesson for:', request);
    
    const prompt = `
      Create a comprehensive lesson plan about "${request.topic}" for ${request.level} level students.
      ${request.description ? `Additional context: ${request.description}` : ''}
      
      Format the response as a JSON object with the following structure:
      {
        "title": "A catchy title for the lesson",
        "description": "A comprehensive description of the lesson",
        "learningOutcomes": ["Outcome 1", "Outcome 2", "Outcome 3", "Outcome 4"],
        "keyConcepts": ["Concept 1", "Concept 2", "Concept 3", "Concept 4", "Concept 5"],
        "activities": ["Activity 1", "Activity 2", "Activity 3", "Activity 4"]
      }
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
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
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Parse the content as JSON
    const content = data.choices[0].message.content;
    let parsedContent: LessonResponse;
    
    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      // Handle case where OpenAI doesn't return proper JSON
      console.error('Failed to parse OpenAI response as JSON:', content);
      
      // Extract content with regex as fallback
      const title = content.match(/title"?\s*:\s*"([^"]+)"/)?.[1] || `${request.topic} for ${request.level.charAt(0).toUpperCase() + request.level.slice(1)}s`;
      const description = content.match(/description"?\s*:\s*"([^"]+)"/)?.[1] || request.description || `A comprehensive lesson about ${request.topic} for ${request.level} students.`;
      
      // Create a fallback response
      parsedContent = {
        title,
        description,
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
    
    return parsedContent;
  } catch (error) {
    console.error('Error generating lesson:', error);
    throw new Error('Failed to generate lesson. Please try again later.');
  }
};
