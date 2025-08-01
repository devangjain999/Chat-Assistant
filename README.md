### 🤖 Smart Chat Assistant 

A sleek, responsive, and voice-enabled web-based chat assistant powered by a large language model (LLM) API. This project integrates modern UI design, dark mode toggle, voice input, local storage for chat history, and real-time typing indicators — delivering an intuitive chat experience straight from your browser.

---
<!-- top -->
### Live Deployment Link : 
[View Project](https://chat-assistant-gray.vercel.app/)

---

### 🚀 Features :

- ✅ Real-time chat with LLM API
- 🎤 Voice input using Web Speech API
- 💬 Chat history stored in `localStorage`
- 🌗 Dark mode toggle
- 🧹 One-click chat clear button
- 🕐 Timestamps for messages
- 🔊 Speech output for bot replies

---

### 📁 Project Structure :
```
📦 Smart-Chat-Assistant/
├── index.html        # Main HTML page
├── style.css         # All UI styling (light & dark mode)
├── main.js           # App logic, API integration, voice I/O, theme, storage
├── api.txt           # Legacy bot code (now integrated)
├── settings.json     # VS Code live server settings
├── LICENSE           # Project license (MIT, Apache, etc.)
└── README.md         # Project overview, setup instructions, features
```
---

### 📸 Demo :

- Type or speak a message and receive intelligent responses in real time.  
- ✨ Enjoy the UI with toggled themes and smooth animations.

---

### 🔐 API Info :

This project uses the following LLM API:
https://backend.buildpicoapps.com/aero/run/llm-api?pk=YOUR_API_KEY
You must obtain your own API key and replace it in `main.js`.

---

### ⚙️ Voice Recognition Support :

Voice input works on most modern browsers (Chrome recommended).
Ensure microphone permissions are allowed.

---

### 📦 Dependencies :

- [Google Fonts Material Icons](https://fonts.google.com/icons)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) (for voice recognition/output)

---

### 🔧 Setup Instructions :

- Clone the Repository

```bash
git clone https://github.com/devangjain999/Chat-Assistant.git
cd Chat-Assistant
npm run start
```
- Run using Live Server or open index.html in browser.
- Make sure microphone permissions are enabled for voice input.


---

### Contribution Guidelines :

- 🧹 Maintain code style & lint rules
- 🚫 Don’t break existing features
- 🧪 Write/modify tests (if applicable)
- 💬 Be clear in PR descriptions
- 🙌 Respect others and give constructive feedback
  
---

### 🤝 How to Contribute :

 1.Fork the repository

 2.Clone to local

 3.Create a new branch for your feature/bug

 4.Commit changes with meaningful messages

 5.Push and create a Pull Request

 6.Comment on the Issue : If the task was assigned via an Issue, comment something like: I have created a PR that addresses this. Please review it here: [#PR-Link]

---

### 📌 Notes :

- Chat history is stored locally in the browser and can be cleared using the delete button.
- Type `/clear` to wipe messages from memory.
- No backend or database required — 100% frontend.

--- 

<div align="center">
  
  > Created by devangjain999 — Feel free to fork and enhance!

</div>

<br>

<p align="center">
  <a href="#top" style="font-size: 18px; padding: 8px 16px; display: inline-block; border: 1px solid #ccc; border-radius: 6px; text-decoration: none;">
    ⬆️ Back to Top
  </a>
</p>
