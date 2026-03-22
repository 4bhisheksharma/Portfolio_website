// Configuration file for API credentials
const CONFIG = {
  API_KEY: 'sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  API_URL: 'https://openrouter.ai/api/v1/chat/completions',
  MODEL: 'deepseek/deepseek-r1-distill-llama-70b',
  SITE_URL: 'https://abhishek-sharma.com.np',
  SITE_NAME: 'Abhishek Sharma Portfolio'
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
