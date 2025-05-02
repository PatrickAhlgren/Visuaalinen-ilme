// Hae elementit
const chatWidget = document.getElementById("chat-widget");
const openButton = document.getElementById("open-chat");

// Avaa chat-widget
openButton.addEventListener("click", function() {
  if (chatWidget.style.right === "0px") {
    chatWidget.style.right = "-320px";  // Sulkee chatin
  } else {
    chatWidget.style.right = "0px";  // Avaa chatin
  }
});

// Lähetä viesti
document.getElementById("chat-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chat = document.getElementById("chat-messages");
  chat.innerHTML += `<div class="user-msg">${message}</div>`;
  input.value = "";

  const res = await fetch("https://bottipalvelin.onrender.com/kysy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ viesti: message })
  });

  const data = await res.json();
  chat.innerHTML += `<div class="bot-msg">${data.vastaus}</div>`;
});
