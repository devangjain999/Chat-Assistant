
# 🤖 Smart Chat Assistant


A sleek, responsive, and voice-enabled web-based chat assistant powered by a Large Language Model (LLM) API. This project integrates a modern UI, dark mode toggle, voice input/output, chat history via local storage, and real-time typing indicators — delivering a truly intuitive and engaging assistant right in your browser.


### Live Deployment Link : 
[View Project](https://chat-assistant-gray.vercel.app/)



## 🚀 Features

- ✅ Real-time conversation with a powerful LLM API
- 🎤 Voice input using Web Speech API
- 🗣️ Speech output for bot replies
- 💬 Chat history stored using `localStorage`
- 🌗 Toggle between light and dark mode
- 🕐 Timestamps for each message
- 🧹 One-click chat clear button
- 🧠 Typing animation/indicator for real-time feedback


## 📁 Project Structure
Smart-Chat-Assistant/

├── index.html # Main HTML document with basic structure

├── style.css # Complete styling including dark/light themes

├── main.js # App logic: API interaction, voice I/O, local storage, UI control

├── api.txt # Legacy version of bot code (not actively used)

├── settings.json # Live Server settings for VS Code

├── LICENSE # License file (MIT recommended)

└── README.md # This project documentation


## ⚙️ Setup & Usage

### 📦 Requirements

- A modern browser (Chrome recommended for best compatibility with speech features)
- A valid LLM API key (free/public/private)


## 🚀 Getting Started

1. **Clone the repository**
   
   ```bash
   git clone https://github.com/your-username/Smart-Chat-Assistant.git
   cd Smart-Chat-Assistant
   ```
2. **Add your API key**
   
  - Open main.js
  - Replace the placeholder with your API endpoint
  - Replace YOUR_API_KEY with your actual key.
    
    ```bash
    const API_URL = "https://backend.buildpicoapps.com/aero/run/llm-api?pk=YOUR_API_KEY";
    ```
 
3. **Run the App Locally**
  - Open index.html in a web browser directly, or
  - Use a live server like the Live Server extension in VS Code.
    
4. **Start Chatting**
   
  - Type or speak your message.
  - Toggle light/dark themes.
  - Clear conversation with the ✨ "Clear Chat" button.


## 🔐 API Info
- LLM API Endpoint
   ```bash
   https://backend.buildpicoapps.com/aero/run/llm-api?pk=YOUR_API_KEY
   ```
- Replace the key in main.js to activate the assistant.
- ⚠️ Important: Avoid exposing your API key in public repositories or frontend deployments.

## 🎤 Voice Recognition Support
- Uses Web Speech API
- Supported in Chrome and most modern browsers
- Make sure you allow microphone access when prompted

# 📸 Demo & Screenshots
- 💡 Add screenshots to the /screenshots/ folder and replace the links below.
- 💡 Light Mode
  
  ![](https://github.com/lohi-cell/gemini-ai-browser-ui/blob/b3437805284aa2500b605b827cffa4e3814069d4/Screenshot%202025-08-01%20204035.png)
  
- 🌙 Dark Mode
  
	![](https://github.com/lohi-cell/gemini-ai-browser-ui/blob/ba683b71a5a96475d56a0e13f1ac22a496e175a0/Screenshot%202025-08-01%20204055.png)

# 📦 Dependencies
- Google Fonts
- Material Icons
- Web Speech API (built-in browser support)
  
# 📌 Notes
- Chat history is stored in your browser via localStorage.
- Type /clear to reset the chat manually.
- No backend or external database required — 100% client-side!

# 🧑‍💻 Contributing
- Contributions are always welcome!

✅ **How to Contribute**
1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push your branch
5. Open a pull request and describe your changes.
 
## 📝 Suggestions Welcome
- If you encounter bugs or have ideas to improve the assistant, open an Issue or submit a PR.
  
# 📄 License
- This project is licensed under the MIT License.
- Feel free to use, fork, and distribute!
  
## 🙌 Acknowledgements
- Made with ❤️ by devangjain999
- Thanks to open LLM APIs and browser-native voice technologies.
---
