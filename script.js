// Toggle chat-widgetin näkyvyys
function toggleChat() {
  const widget = document.getElementById('chat-widget');
  widget.style.right = widget.style.right === '0px' ? '-100%' : '0px'; // Vaihtaa sijaintia
}

// Viestin lähettäminen
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

