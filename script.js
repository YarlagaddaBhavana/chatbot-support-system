function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value;

  if (message.trim() === "") return;

  addMessage("user", message);

  let reply = getBotReply(message);

  addMessage("bot", reply);

  speak(reply);

  input.value = "";
}

function addMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");

  const msg = document.createElement("div");
  msg.classList.add(sender);
  msg.innerText = text;

  chatBox.appendChild(msg);

  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotReply(message) {
  message = message.toLowerCase();

  if (message.includes("hello")) {
    return "Hello! How can I help you?";
  }

  if (message.includes("name")) {
    return "I am your AI support chatbot.";
  }

  if (message.includes("bye")) {
    return "Goodbye! Have a great day.";
  }

  return "Sorry, I didn't understand that.";
}

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(speech);
}

function startVoice() {
  const recognition = new webkitSpeechRecognition();

  recognition.onresult = function(event) {
    const voiceText = event.results[0][0].transcript;

    document.getElementById("user-input").value = voiceText;

    sendMessage();
  };

  recognition.start();
}
