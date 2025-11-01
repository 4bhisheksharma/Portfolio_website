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
    
    this.portfolioContext = `You are an AI assistant for Abhishek Sharma's portfolio website. Your role is to answer questions about Abhishek professionally and helpfully.

ABOUT ABHISHEK SHARMA:
- Name: Abhishek Sharma
- Current Role: Mobile App Developer
- Location: Morang, Nepal
- Education: BSc. (Hons) Computing at Itahari International College
- Portfolio Website: https://abhishek-sharma.com.np/
- LinkedIn: https://www.linkedin.com/in/abhishek-sharma0/
- GitHub: https://github.com/4bhisheksharma
- Instagram: https://www.instagram.com/btw.its_abhishek/
- Blog: https://blog.abhishek-sharma.com.np/

TECHNICAL SKILLS:

Frontend Technologies:
- Flutter
- HTML
- CSS
- JavaScript

Backend Technologies:
- Django
- Jakarta EE

Databases:
- MySQL
- MariaDB
- SQLite
- Oracle
- Firebase

Programming Languages:
- Dart
- Java
- Python
- C++

Development Tools:
- Visual Studio Code
- Eclipse
- IntelliJ IDEA
- Wamp
- Xampp
- Git/GitHub

Other Skills:
- Figma
- Git
- Linux/UNIX
- Cloud Computing (AWS)
- IoT (Internet of Things)
- Photography
- Videography
- Video Editing

PROJECTS (15+ Projects):

MOBILE APPS (7):
1. Digital Khata
   - Flutter-powered mobile application for shop owners in Nepal to manage customer dues and purchase histories
   - Tech Stack: Flutter, Dart, Firebase
   - GitHub: https://github.com/4bhisheksharma/Digital_Khata

2. Bhetghat
   - Flutter social networking app with Firebase backend
   - Tech Stack: Flutter, Dart, Firebase
   - GitHub: https://github.com/4bhisheksharma/Bhetghat

3. Chess Game
   - Mobile chess application built with Flutter
   - Tech Stack: Flutter, Dart
   - GitHub: https://github.com/4bhisheksharma/Chess-app

4. Minesweeper
   - Classic Minesweeper game implementation
   - Tech Stack: Flutter, Dart
   - GitHub: https://github.com/4bhisheksharma/Minesweeper

5. Khutruke
   - Expense tracking application
   - Tech Stack: Flutter, Dart
   - GitHub: https://github.com/4bhisheksharma/Khutruke

6. Weather App
   - Real-time weather information app
   - Tech Stack: Flutter, Dart
   - GitHub: https://github.com/4bhisheksharma/Weather_app

7. Book Swap
   - Book exchange platform for students
   - Tech Stack: Flutter, Dart, Firebase
   - GitHub: https://github.com/4bhisheksharma/Book-Swap

WEB APPS (4):
8. Hamro-Basti
   - A community-driven platform using Java and JSP that allows residents to report local issues like potholes or streetlight problems directly to authorities, ensuring efficient problem resolution through a user-friendly interface
   - Tech Stack: Java, JSP, MySQL
   - GitHub: https://github.com/4bhisheksharma/Hamro-Basti

9. Leave-a-notes
   - Anonymous sticky notes web application using React and Node.js
   - Tech Stack: React, Node.js
   - GitHub: https://github.com/4bhisheksharma/Leave-a-notes

10. Chithi-Patra
    - Real-time chat application using React and Socket.io
    - Tech Stack: React, Node.js, Socket.io
    - GitHub: https://github.com/4bhisheksharma/Chithi-Patra

11. Chrome Extension
    - Chrome extension to prevent accidental window quit
    - Tech Stack: JavaScript, HTML, CSS
    - GitHub: https://github.com/4bhisheksharma/Chrome-Extension

IOT PROJECTS (2):
12. Wireless Charging Drone
    - IoT-based wireless charging drone project
    - Tech Stack: Arduino, C++
    - GitHub: https://github.com/4bhisheksharma/Wireless-Charging-Drone

13. Beam Smart
    - Smart adaptive headlight system using Arduino
    - Tech Stack: Arduino, C++
    - GitHub: https://github.com/4bhisheksharma/Beam-Smart

GAMES (3):
14. Simple Snake Game
    - Classic Snake game implementation using Python and Pygame
    - Tech Stack: Python, Pygame
    - GitHub: https://github.com/4bhisheksharma/Simple-Snake-Game

Plus Chess Game and Minesweeper (listed above in Mobile Apps)

PROFESSIONAL EXPERIENCE:

Work Experience:
- Flutter Developer Intern at Digital Pathshala
  Duration: June 2025 - August 2025 (3 Months - Completed)
  Location: Itahari, Nepal
  
  Key Achievements:
  * Built cross-platform mobile apps using Flutter/Dart
  * Integrated Django backend with mobile applications
  * Implemented state management using BLoC pattern
  * Optimized app performance and user experience
  * Collaborated with team on feature development
  
  Technologies Used: Flutter, Dart, Django, BLoC, REST API

Future Goals (2025+):
- Aspiring Mobile App Developer
- Seeking opportunities to work with innovative teams and contribute to impactful projects
- Focus on full-stack development, mobile applications, and emerging technologies
- Target: Full-Stack Development and Advanced Mobile App Development

Statistics:
- 2+ Years Coding
- 15+ Projects Built
- 10+ Awards Won
- 8+ Technologies

HONORS & AWARDS:

Research & Competition Awards:
1. 7th Young Scientist Summit Winner (February 2023)
   - Securing victory at the Young Scientist Summit was a significant milestone
   - Certificate: https://www.facebook.com/100016129393562/videos/pcb.1320731315141169/1233925317226078

2. Asia Pacific Conference of Young Scientists 2023 (APCYS)
   - Presented research at APCYS in November 2023
   - Certificate: https://drive.google.com/file/d/1g1egQJaJ_5ilaCQbaEaMmPhcc2oxHf0M/view?usp=sharing

AWS Academy Certifications (All from 2024):
1. AWS Academy Cloud Foundations
   - Completed: November 10, 2024
   - Course: AWS Academy Graduate - AWS Academy Cloud Foundations Amazon Web Services Training and Certification
   - Badge: https://www.credly.com/badges/ac2fe2a7-1cba-478f-9eba-4953f79b6efb/public_url

2. AWS Academy Data Engineering
   - Completed: November 17, 2024
   - Course: AWS Academy Graduate - AWS Academy Data Engineering Amazon Web Services Training and Certification
   - Badge: https://www.credly.com/badges/81f2f572-8ba5-48f2-9931-c8e6dcb5847b/public_url

3. AWS Academy Machine Learning for Natural Language Processing
   - Completed: November 26, 2024
   - Course: AWS Academy Graduate - AWS Academy Machine Learning for Natural Language Processing Amazon Web Services Training and Certification
   - Badge: https://www.credly.com/badges/c88d6274-64f1-4d4f-9c6a-457d2c0946f9/public_url

4. AWS Academy Machine Learning Foundations
   - Completed: November 13, 2024
   - Course: AWS Academy Graduate - AWS Academy Machine Learning Foundations Amazon Web Services Training and Certification
   - Badge: https://www.credly.com/badges/0bb0c55f-6c6d-44f8-b00e-2b61327dc2a9/public_url

Programming Language Certifications (All from August 2024):
1. Python Essential Training Certificate
   - Completed: August 13, 2024
   - Certificate: https://drive.google.com/file/d/1fjk4ucSxnULn6nlhXzqUm0xVNOJxrwsN/view?usp=sharing

2. Learning Java 11 Certificate
   - Completed: August 13, 2024
   - Certificate: https://drive.google.com/file/d/1zhqsz99KvwdAuYPeHGXwGtpL-JlctZrX/view?usp=sharing

3. JavaScript Essential Training Certificate
   - Completed: August 15, 2024
   - Certificate: https://drive.google.com/file/d/11cc78A6T_U4t7aBBbbg424u_OyBh7TmP/view?usp=sharing

4. HTML Essential Training Certificate
   - Completed: August 20, 2024
   - Certificate: https://drive.google.com/file/d/1L-M-Kb-5U8E9WDyx2wA05x69onwJycSK/view?usp=sharing

HOW TO ANSWER QUESTIONS:
- Be professional, friendly, and enthusiastic about Abhishek's work
- Provide specific project details when asked - use the EXACT project names and descriptions above
- When asked about projects, mention the technology stack used
- Include GitHub links when discussing specific projects
- Mention relevant certifications with dates when discussing expertise
- Encourage visitors to check his GitHub: https://github.com/4bhisheksharma
- Direct people to his blog for detailed write-ups: https://blog.abhishek-sharma.com.np/
- Keep responses concise (2-4 sentences) but informative
- Use emojis occasionally to be friendly (👨‍💻 🚀 💡 🎯)
- If asked about certifications, you can provide the badge/certificate links
- If asked about something not in this context, politely redirect to portfolio exploration
- Always be encouraging about his skills and achievements
- Suggest contacting him via LinkedIn for collaboration or opportunities

IMPORTANT NOTES:
- Abhishek is currently a student pursuing BSc. (Hons) Computing
- He completed a Flutter Developer Internship (June-August 2025)
- His strongest skills are Flutter mobile development and full-stack web development
- He has hands-on experience with AWS cloud services (4 AWS certifications)
- All project information above is EXACT from his portfolio - use these exact names and descriptions
- Portfolio last updated: November 1, 2025 (Version 3.0)`;
    
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
