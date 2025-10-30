// AI Chatbot for Abhishek Sharma's Portfolio
class PortfolioChatbot {
  constructor() {
    // Load configuration from config.js
    this.apiKey = CONFIG.API_KEY;
    this.apiUrl = CONFIG.API_URL;
    this.model = CONFIG.MODEL;
    this.siteUrl = CONFIG.SITE_URL;
    this.siteName = CONFIG.SITE_NAME;
    this.conversationHistory = [];
    this.isOpen = false;
    this.isTyping = false;
    this.touchStartY = 0;
    this.touchEndY = 0;
    
    // Portfolio context for the AI
    this.portfolioContext = `You are an AI assistant for Abhishek Sharma's portfolio website. Your role is to answer questions about Abhishek professionally and helpfully.

ABOUT ABHISHEK SHARMA:
- Current Role: Mobile App Developer
- Location: Morang, Nepal
- Education: BSc. (Hons) Computing at Itahari International College
- Contact: iam@abhishek-sharma.com.np | +977 9805390066

SKILLS:
Front-end: HTML, CSS, JavaScript, React, Flutter, React Native, Tailwind CSS
Back-end: Node.js, Express.js, Python, Flask, Django
Databases: Firebase, MongoDB, PostgreSQL, MySQL, SQLite, Supabase, Appwrite
Languages: Dart, JavaScript, Python, Java, C, C++, Kotlin
Tools: Git, GitHub, VS Code, Android Studio, Figma, Postman, Docker

PROJECTS:
Mobile Apps:
- E-Bus Sewa: Digital bus ticketing system with real-time tracking
- SLMS: Student Learning Management System with Flutter
- Flappy Bird: Mobile game built with Flutter
- Todo App: Task management with Firebase integration
- News App: Real-time news aggregator
- Weather App: Live weather information app

Web Apps:
- Neplai Web: Nepali language learning platform
- Hamro Krishi: Agriculture management system
- Movie Website: Movie browsing platform with API integration
- Portfolio Website: Personal portfolio showcasing work

IoT Projects:
- Smart Home Automation: IoT-based home control system
- Smart Dustbin: Automated waste management system

Games:
- Snake Game: Classic snake game implementation

EXPERIENCE:
- 2+ Years of experience in mobile and web development
- Worked on 15+ projects across various domains
- 100+ GitHub contributions
- Active in open-source community

ACHIEVEMENTS & AWARDS:
- Multiple project completions and certifications
- Active participant in tech communities
- Consistent contribution to open-source projects

SOCIAL LINKS:
- LinkedIn: https://www.linkedin.com/in/abhishek-sharma0/
- GitHub: https://github.com/4bhisheksharma
- Instagram: https://www.instagram.com/btw.its_abhishek/
- Blog: https://blog.abhishek-sharma.com.np/

INSTRUCTIONS:
- Be professional, friendly, and informative
- Answer questions about Abhishek's skills, projects, experience, and contact information
- If asked something not in the context, politely say you can help with information about Abhishek's portfolio
- Encourage visitors to check out projects and get in touch
- Keep responses concise but informative
- Don't make up information - only use what's provided above`;
    
    this.init();
  }

  init() {
    this.createChatWidget();
    this.attachEventListeners();
    this.initializeConversation();
  }

  createChatWidget() {
    const chatHTML = `
      <div class="chat-widget" id="chat-widget">
        <button class="chat-toggle" id="chat-toggle" aria-label="Open AI Assistant">
          <i class="fas fa-robot"></i>
          <span class="chat-badge">AI</span>
        </button>
        
        <div class="chat-container" id="chat-container">
          <div class="chat-header">
            <div class="swipe-indicator"></div>
            <div class="chat-header-info">
              <div class="chat-avatar">
                <i class="fas fa-robot"></i>
              </div>
              <div class="chat-header-text">
                <h3>Portfolio Assistant</h3>
                <p class="chat-status"><span class="status-dot"></span> Online</p>
              </div>
            </div>
            <button class="chat-close" id="chat-close" aria-label="Close chat">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="chat-messages" id="chat-messages">
            <div class="chat-message bot-message">
              <div class="message-avatar">
                <i class="fas fa-robot"></i>
              </div>
              <div class="message-content">
                <p>Hi! 👋 I'm Abhishek's AI assistant. I can help you learn more about his skills, projects, and experience. What would you like to know?</p>
                <span class="message-time">${this.getCurrentTime()}</span>
              </div>
            </div>
          </div>
          
          <div class="chat-input-container">
            <div class="suggested-questions" id="suggested-questions">
              <button class="suggestion-btn" data-question="What are Abhishek's main skills?">
                <i class="fas fa-code"></i> Skills
              </button>
              <button class="suggestion-btn" data-question="Tell me about Abhishek's projects">
                <i class="fas fa-project-diagram"></i> Projects
              </button>
              <button class="suggestion-btn" data-question="What is Abhishek's experience?">
                <i class="fas fa-briefcase"></i> Experience
              </button>
              <button class="suggestion-btn" data-question="How can I contact Abhishek?">
                <i class="fas fa-envelope"></i> Contact
              </button>
            </div>
            <div class="chat-input-wrapper">
              <input 
                type="text" 
                class="chat-input" 
                id="chat-input" 
                placeholder="Ask me anything about Abhishek..."
                autocomplete="off"
              />
              <button class="chat-send" id="chat-send" aria-label="Send message">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById('chat-toggle');
    const closeBtn = document.getElementById('chat-close');
    const sendBtn = document.getElementById('chat-send');
    const input = document.getElementById('chat-input');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    const container = document.getElementById('chat-container');

    toggleBtn.addEventListener('click', () => this.toggleChat());
    closeBtn.addEventListener('click', () => this.toggleChat());
    sendBtn.addEventListener('click', () => this.sendMessage());
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    suggestionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const question = btn.getAttribute('data-question');
        input.value = question;
        this.sendMessage();
      });
    });

    // Touch gesture support for mobile
    container.addEventListener('touchstart', (e) => {
      this.touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      this.touchEndY = e.changedTouches[0].screenY;
      this.handleSwipe();
    }, { passive: true });

    // Close chat on outside click (desktop only)
    document.addEventListener('click', (e) => {
      if (this.isOpen && window.innerWidth > 768) {
        if (!container.contains(e.target) && !toggleBtn.contains(e.target)) {
          this.toggleChat();
        }
      }
    });

    // Adjust chat on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 480 && this.isOpen) {
        document.body.style.overflow = '';
      } else if (window.innerWidth <= 480 && this.isOpen) {
        document.body.style.overflow = 'hidden';
      }
    });
  }

  handleSwipe() {
    const swipeDistance = this.touchStartY - this.touchEndY;
    
    // Swipe down to close (only on mobile)
    if (window.innerWidth <= 480 && swipeDistance < -50 && this.isOpen) {
      this.toggleChat();
    }
  }

  toggleChat() {
    const container = document.getElementById('chat-container');
    const toggle = document.getElementById('chat-toggle');
    
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      container.classList.add('active');
      toggle.classList.add('active');
      
      // Prevent body scroll on mobile when chat is open
      if (window.innerWidth <= 480) {
        document.body.style.overflow = 'hidden';
      }
      
      // Focus input with a delay for mobile keyboards
      setTimeout(() => {
        const input = document.getElementById('chat-input');
        if (window.innerWidth > 768) {
          input.focus();
        }
      }, 300);
    } else {
      container.classList.remove('active');
      toggle.classList.remove('active');
      
      // Re-enable body scroll
      document.body.style.overflow = '';
    }
  }

  async sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (!message || this.isTyping) return;

    // Haptic feedback on mobile
    this.triggerHapticFeedback();

    // Add user message
    this.addMessage(message, 'user');
    input.value = '';

    // Hide suggestions after first message
    document.getElementById('suggested-questions').style.display = 'none';

    // Blur input on mobile to hide keyboard
    if (window.innerWidth <= 768) {
      input.blur();
    }

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Get AI response
      const response = await this.getAIResponse(message);
      this.hideTypingIndicator();
      this.addMessage(response, 'bot');
    } catch (error) {
      console.error('Error getting AI response:', error);
      this.hideTypingIndicator();
      this.addMessage('Sorry, I encountered an error. Please try again or contact Abhishek directly at iam@abhishek-sharma.com.np', 'bot');
    }
  }

  addMessage(content, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageClass = sender === 'user' ? 'user-message' : 'bot-message';
    
    const messageHTML = `
      <div class="chat-message ${messageClass}">
        ${sender === 'bot' ? '<div class="message-avatar"><i class="fas fa-robot"></i></div>' : ''}
        <div class="message-content">
          <p>${this.formatMessage(content)}</p>
          <span class="message-time">${this.getCurrentTime()}</span>
        </div>
        ${sender === 'user' ? '<div class="message-avatar user-avatar"><i class="fas fa-user"></i></div>' : ''}
      </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    
    // Smooth scroll to bottom
    setTimeout(() => {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  }

  showTypingIndicator() {
    this.isTyping = true;
    const messagesContainer = document.getElementById('chat-messages');
    const typingHTML = `
      <div class="chat-message bot-message typing-indicator" id="typing-indicator">
        <div class="message-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    this.isTyping = false;
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  async getAIResponse(userMessage) {
    // Add message to conversation history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': this.siteUrl,
          'X-Title': this.siteName
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: this.portfolioContext
            },
            ...this.conversationHistory.slice(-10) // Keep last 10 messages for context
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Add AI response to conversation history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse
      });

      return aiResponse;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  initializeConversation() {
    // Initialize with system context
    this.conversationHistory = [];
  }

  formatMessage(message) {
    // Convert markdown-style formatting to HTML
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    message = message.replace(/\*(.*?)\*/g, '<em>$1</em>');
    message = message.replace(/\n/g, '<br>');
    
    // Convert URLs to links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    message = message.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    
    return message;
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  triggerHapticFeedback() {
    // Vibrate API for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const chatbot = new PortfolioChatbot();
});
