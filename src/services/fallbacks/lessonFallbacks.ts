
import { Lesson, LessonGenerateRequest } from '@/types/course';

// Function to create fallback lesson data when API fails
export const createFallbackLesson = (request: LessonGenerateRequest): Lesson => {
  const topic = request.topic || "Sample Topic";
  
  return {
    title: `Understanding ${topic}`,
    description: `A comprehensive lesson on ${topic} designed for ${request.targetAudience} at a ${request.difficultyLevel} level.`,
    learningOutcomes: [
      `Explain the core principles of ${topic}`,
      `Apply ${topic} concepts to solve practical problems`,
      `Analyze scenarios involving ${topic}`
    ],
    keyConcepts: [
      `${topic} fundamentals`,
      `${topic} applications`,
      `${topic} best practices`,
      `${topic} common challenges`
    ],
    activities: [
      {
        title: `${topic} Exploration`,
        description: `A hands-on activity to explore ${topic} concepts.`,
        content: `In this activity, you will:\n1. Identify key elements of ${topic}\n2. Apply ${topic} principles to a real-world scenario\n3. Reflect on your findings`,
        type: 'Exercise'
      },
      {
        title: `${topic} Case Study`,
        description: `Analyze a real-world application of ${topic}.`,
        content: `Review the provided case study and discuss:\n- How ${topic} was applied\n- Challenges encountered\n- Strategies for improvement`,
        type: 'Discussion'
      }
    ],
    assessments: [
      {
        title: `${topic} Knowledge Check`,
        description: `Test your understanding of key ${topic} concepts.`,
        type: 'Quiz',
        questions: [
          {
            question: `What is the primary purpose of ${topic}?`,
            type: 'Multiple Choice',
            options: ['To optimize resource allocation', 'To improve system performance', 'To enhance user experience', 'To reduce operational costs'],
            correctAnswer: 'To enhance user experience'
          },
          {
            question: `True or False: ${topic} is only applicable in enterprise environments.`,
            type: 'True/False',
            correctAnswer: 'False'
          },
          {
            question: `Describe a practical application of ${topic} in your field.`,
            type: 'Short Answer'
          }
        ]
      }
    ]
  };
};
