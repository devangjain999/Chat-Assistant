🤖 Smart Chat Assistant:

A sleek, responsive, and voice-enabled web-based chat assistant powered by a large language model (LLM) API. This project integrates modern UI design, dark mode toggle, voice input, local storage for chat history, and real-time typing indicators — delivering an intuitive chat experience straight from your browser.

🚀 Features:

- ✅ Real-time chat with LLM API
- 🎤 Voice input using Web Speech API
- 💬 Chat history stored in `localStorage`
- 🌗 Dark mode toggle
- 🧹 One-click chat clear button
- 🕐 Timestamps for messages
- 🔊 Speech output for bot replies
- ⚙️ .env support for API key security (via dotenv)

📁 Project Structure:

📦 Smart-Chat-Assistant/
📦 Smart-Chat-Assistant/
├── public/
│   ├── index.html      # Main HTML UI
│   ├── style.css       # Light/Dark mode styling
│   ├── main.js         # Frontend logic: chat, voice, theme, storage
│   └── favicon-32x32.png  # (Optional) Favicon for your site
├── server.js           # Express.js backend to proxy API calls securely
├── .env                # Stores API key (e.g., API_KEY=your_key_here)
├── .gitignore          # Ignore .env and node_modules
├── package.json        # Node.js dependencies and scripts
├── README.md           # Project documentation
└── settings.json       # (Optional) VS Code or project settings


📸 Demo

- Type or speak a message and receive intelligent responses in real time.  
- ✨ Enjoy the UI with toggled themes and smooth animations.

🔐 API Info:

Instead of hardcoding the API key in your JavaScript, the project now uses:

A secure Node.js backend (server.js) that proxies your frontend requests.

Your API key is stored securely in the .env file:

LLM_API_KEY=your_api_key_here

The backend reads this key using the dotenv package and forwards it securely.

Frontend talks to:
http://localhost:3000/api/chat

⚙️ Voice Recognition Support:

Voice input works on most modern browsers (Chrome recommended).
Ensure microphone permissions are allowed.

📦 Dependencies:

- Frontend
- [Google Fonts Material Icons](https://fonts.google.com/icons)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) (for voice recognition/output)

- Backend
- express
- dotenv
- node-fetch (Note: Use as ES module or switch to Axios or native fetch with Node v18+)

📌 Notes:

- Chat history is stored locally in the browser and can be cleared using the delete button.
- Type `/clear` to wipe messages from memory.
- This is a fully functional frontend + backend project, ideal for deployment or extending.



> Created by devangjain999 — Feel free to fork and enhance!
