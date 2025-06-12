// Environment Configuration
// Add your API keys here

export const ENV = {
  // Add your Gemini API key here
  // Get it from: https://aistudio.google.com/app/apikey
  GEMINI_API_KEY: 'AIzaSyCk1XY9uVyu510-kNfW2ldhDsGEAq0mqvU', // Your actual API key
  
  // Other environment variables can be added here
  isDevelopment: __DEV__,
  
  // App configuration
  app: {
    name: 'BoostLab',
    version: '1.0.0',
  },
  
  // API endpoints
  api: {
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    geminiModel: 'gemini-2.0-flash',
  }
};

// Helper function to check if Gemini is configured
export const isGeminiConfigured = (): boolean => {
  return ENV.GEMINI_API_KEY.length > 0;
}; 