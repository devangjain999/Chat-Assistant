// === DOM Elements ===
const chatbox = document.getElementById("chatbox");
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const clearButton = document.getElementById("clearChat");
const voiceButton = document.getElementById("voiceButton");
const themeToggle = document.getElementById("toggleTheme");
const typingIndicator = document.getElementById("typingIndicator");
const listeningIndicator = document.getElementById("listeningIndicator");
const welcomeMessage = document.getElementById("welcomeMessage");

// === API Keys (replace with your own if needed) ===

const defaultAPI = "http://localhost:3000/api/chat";


// === Welcome Message Management ===
function showWelcomeMessage() {
  welcomeMessage.style.display = "flex";
}

function hideWelcomeMessage() {
  welcomeMessage.style.display = "none";
}

function checkWelcomeVisibility() {
  const chatMessages = chatbox.querySelectorAll('.chat-message');
  if (chatMessages.length === 0) {
    showWelcomeMessage();
  } else {
    hideWelcomeMessage();
  }
}

// === Load Chat History ===
function loadHistory() {
  const saved = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  saved.forEach(({ message, sender, time }) => {
    displayMessage(message, sender === "user", time);
  });
}

// === Save Chat History ===
function saveMessage(message, isUser) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const chatHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  chatHistory.push({ message, sender: isUser ? "user" : "bot", time });
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

// === Display Message ===
function displayMessage(message, isUser, time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) {
  hideWelcomeMessage();
  const msgElem = document.createElement("div");
  msgElem.className = `chat-message ${isUser ? "user-message" : "assistant-message"}`;
  msgElem.innerHTML = `${message}<div class="timestamp">${time}</div>`;
  chatbox.appendChild(msgElem);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// === Clear Chat ===
clearButton.addEventListener("click", () => {
  localStorage.removeItem("chatHistory");
  chatbox.innerHTML = `<div id="welcomeMessage" class="welcome-message">
    <div class="welcome-icon">💬</div>
    <h3>Welcome to Smart Chat Assistant!</h3>
    <p>Start a conversation by typing a message or using the microphone button.</p>
    <p>Try asking me anything - I'm here to help! 🤖</p>
  </div>`;
  showWelcomeMessage();
});

// === Voice Input ===
const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (recognition) {
  const mic = new recognition();
  mic.lang = "en-US";
  mic.interimResults = false;
  
  mic.onstart = () => {
    listeningIndicator.style.display = "block";
  };
  
  mic.onresult = e => {
    const transcript = e.results[0][0].transcript;
    chatInput.value = transcript;
    listeningIndicator.style.display = "none";
  };
  
  mic.onerror = () => {
    listeningIndicator.style.display = "none";
  };
  
  mic.onend = () => {
    listeningIndicator.style.display = "none";
  };
  
  voiceButton.addEventListener("click", () => mic.start());
}

// === Speech Output ===
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Show the stop button when speech starts
  utterance.onstart = () => {
    stopSpeechButton.style.display = "block";
  };

  // Hide the stop button when speech ends
  utterance.onend = () => {
    stopSpeechButton.style.display = "none";
  };

  speechSynthesis.speak(utterance);
}

// === Add listener for the new stop button ===
stopSpeechButton.addEventListener("click", () => {
  speechSynthesis.cancel(); // Immediately stops speech
  stopSpeechButton.style.display = "none";
});

// === Send Message ===
sendButton.addEventListener("click", async () => {
  const message = chatInput.value.trim();
  if (!message) return;

  displayMessage(message, true);
  saveMessage(message, true);
  chatInput.value = "";

  if (message.toLowerCase() === "/clear") {
    clearButton.click();
    return;
  }

  typingIndicator.style.display = "block";
  try {
    const response = await fetch(defaultAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: message }),
    });

    const data = await response.json();
    const reply = data.text || "Error getting response.";
    displayMessage(reply, false);
    saveMessage(reply, false);
    speak(reply);
  } catch (err) {
    displayMessage("There was an error. Please try again.", false);
  } finally {
    typingIndicator.style.display = "none";
  }
});

// === Enter Key Shortcut ===
chatInput.addEventListener("keydown", e => {
  if (e.key === "Enter") sendButton.click();
});

// === Theme Toggle and Persistence ===
function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

themeToggle.addEventListener("click", toggleTheme);
window.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
  loadHistory();
  checkWelcomeVisibility();
});
