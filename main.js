
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
const stopSpeechButton = document.getElementById("stopSpeechButton");
const cursorTrailContainer = document.getElementById("cursor-trail");

// === API Keys (replace with your own if needed) ===
const apiKey = "v1-Z0FBQUFBQm5HUEtMSjJkakVjcF9IQ0M0VFhRQ0FmSnNDSHNYTlJSblE0UXo1Q3RBcjFPcl9YYy1OZUhteDZWekxHdWRLM1M1alNZTkJMWEhNOWd4S1NPSDBTWC12M0U2UGc9PQ==";
const defaultAPI = `https://backend.buildpicoapps.com/aero/run/llm-api?pk=${apiKey}`;

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

// === Load Chat History from localStorage ===
function loadHistory() {
  const saved = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  saved.forEach(({ message, sender, time }) => {
    displayMessage(message, sender === "user", time);
  });
}

// === Save Chat Message to localStorage ===
function saveMessage(message, isUser) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const chatHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  chatHistory.push({ message, sender: isUser ? "user" : "bot", time });
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

// === Display a message in chatbox ===
function displayMessage(message, isUser, time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) {
  hideWelcomeMessage();
  const msgElem = document.createElement("div");
  msgElem.className = `chat-message ${isUser ? "user-message" : "assistant-message"}`;
  // Escape HTML to prevent injection
  msgElem.innerHTML = `${escapeHTML(message)}<div class="timestamp">${time}</div>`;
  chatbox.appendChild(msgElem);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Escape HTML helper to avoid injection:
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(match) {
    return ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[match];
  });
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

// === Voice Input (Web Speech API) ===
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let mic;
if (SpeechRecognition) {
  mic = new SpeechRecognition();
  mic.lang = "en-US";
  mic.interimResults = false;
  
  mic.onstart = () => {
  listeningIndicator.style.display = "inline";
  voiceButton.style.display = "none";
  stopSpeechButton.style.display = "inline-block";
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
  stopSpeechButton.style.display = "none";
  voiceButton.style.display = "inline-block";
};

  
  voiceButton.addEventListener("click", () => {
    try {
      mic.start();
    } catch (e) {
      
    }
  });
  stopSpeechButton.addEventListener("click", () => {
  if (mic && mic.stop) {
    mic.stop(); // Manually stop recording
  }

  // UI updates handled in mic.onend
  stopSpeechButton.style.display = "none";
  voiceButton.style.display = "inline-block";
  listeningIndicator.style.display = "none";
});

} else {
  voiceButton.style.display = "none"; // Hide voice button if unsupported
}
stopSpeechButton.addEventListener("click", () => {
  if (mic) {
    mic.stop(); // Stop the mic manually
  }
});

// === Speech Output (Web SpeechSynthesis API) ===
function speak(text) {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onstart = () => {
    stopSpeechButton.style.display = "inline-block";
  };

  utterance.onend = () => {
    stopSpeechButton.style.display = "none";
  };

  speechSynthesis.speak(utterance);
}

stopSpeechButton.addEventListener("click", () => {
  speechSynthesis.cancel();
  stopSpeechButton.style.display = "none";
});

// === Send Message Handler ===
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
    const reply = data.status === "success" ? data.text : "Error getting response.";
    displayMessage(reply, false);
    saveMessage(reply, false);
    speak(reply);
  } catch (err) {
    displayMessage("There was an error. Please try again.", false);
  } finally {
    typingIndicator.style.display = "none";
  }
});

// Enter key sends message
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

// === Startup ===
window.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
  loadHistory();
  checkWelcomeVisibility();
});

// === Logout Placeholder Function ===
function logout() {
  alert("Logout clicked! Implement your logout logic.");
}

// === Enhanced Snake Cursor Trail Implementation ===
(() => {
  const trailLength = 12; // Number of particles in the trail
  const particles = [];
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // Sizes for particles cycling
  const sizes = ["large", "medium", "small"];

  // Create particles
  for (let i = 0; i < trailLength; i++) {
    const particle = document.createElement("span");
    particle.classList.add("cursor-trail-particle");
    // Assign sizes cycling for layered effect
    particle.classList.add(sizes[i % sizes.length]);
    cursorTrailContainer.appendChild(particle);
    particles.push({
      el: particle,
      x: mouseX,
      y: mouseY,
      targetX: mouseX,
      targetY: mouseY,
      sizeClass: sizes[i % sizes.length],
      opacity: 0.8 - i * (0.05), // decreasing opacity for tail effect
      scale: 1 - i * 0.05, // slight scaling for smooth tapering
    });
  }

  // Update mouse position on move
  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animation loop for smooth snake effect
  function animate() {
    let prevX = mouseX;
    let prevY = mouseY;

    particles.forEach((particle, index) => {
      // Move particle toward previous position with easing
      particle.x += (prevX - particle.x) * 0.35;
      particle.y += (prevY - particle.y) * 0.35;
      prevX = particle.x;
      prevY = particle.y;

      // Update styles
      particle.el.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) scale(${particle.scale})`;
      particle.el.style.opacity = particle.opacity;
    });

    requestAnimationFrame(animate);
  }

  animate();
})();


// History Sidebar

const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggleSidebar');

toggleSidebarBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// history button
function updateHistorySidebar() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  const chats = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  if (chats.length === 0) return;

  const chatItem = document.createElement("button");
  chatItem.classList.add("history-item");
  chatItem.textContent = "Chat " + new Date().toLocaleString();
  chatItem.addEventListener("click", () => {
    // Reload chat history or session logic (optional enhancement)
    loadHistory();
  });

  historyList.appendChild(chatItem);
}


