
export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: number;
  isEditing?: boolean;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  lastUpdated: string;
  modules: Module[];
  level: string;
  difficulty: string;
  duration?: string;
}

export interface LessonActivity {
  title: string;
  description: string;
  content: string;
  type: 'Exercise' | 'Discussion' | 'Project' | 'Other';
}

export interface AssessmentQuestion {
  question: string;
  type: 'Multiple Choice' | 'True/False' | 'Short Answer';
  options?: string[];
  correctAnswer?: string;
}

export interface Assessment {
  title: string;
  description: string;
  type: 'Quiz' | 'Test' | 'Assignment';
  questions: AssessmentQuestion[];
}

export interface Lesson {
  id?: string;
  title: string;
  description: string;
  courseId?: number;
  moduleId?: string;
  learningOutcomes: string[];
  keyConcepts: string[];
  activities: LessonActivity[];
  assessments: Assessment[];
}

export interface LessonGenerateRequest {
  topic: string;
  targetAudience: string;
  difficultyLevel: string;
  additionalInfo?: string;
}
