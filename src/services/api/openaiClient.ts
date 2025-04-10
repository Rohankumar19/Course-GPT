
// OpenAI API client for making requests

// Export the API key - either from env var or hardcoded for demo
export const getApiKey = (): string => {
  return import.meta.env.VITE_OPENAI_API_KEY || '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';
};

// Make a request to the OpenAI API
export const makeOpenAIRequest = async (
  messages: Array<{ role: string; content: string }>,
  temperature: number = 0.7,
  maxTokens: number = 2000
) => {
  try {
    const apiKey = getApiKey();
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature,
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
