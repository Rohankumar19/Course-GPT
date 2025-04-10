
// Utilities for parsing OpenAI API responses

// Parse a complete lesson response
export const parseJsonResponse = (content: string): any => {
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error('Failed to parse response as JSON:', content);
    return null;
  }
};

// Parse section responses based on the section type
export const parseSectionResponse = (content: string, section: string): any => {
  if (section === 'activities' || section === 'assessments') {
    try {
      // Find JSON in the response text
      const jsonMatch = content.match(/\[.*\]/s) || content.match(/\{.*\}/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No valid JSON found in response');
    } catch (error) {
      console.error(`Failed to parse JSON in response for ${section}:`, content);
      return [];
    }
  } else if (section === 'learningOutcomes' || section === 'keyConcepts') {
    // Try to parse list items
    try {
      const items = content.match(/(?:- |\d+\. )([^\n]+)/g) || [];
      if (items.length > 0) {
        return items.map((item: string) => item.replace(/^(?:- |\d+\. )/, '').trim());
      }
      return content.split('\n').filter((line: string) => line.trim().length > 0);
    } catch (error) {
      return [content.trim()];
    }
  }
  
  return content.trim();
};
