document.getElementById("chat-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chat = document.getElementById("chat-messages");

  // Lisää käyttäjän viesti
  const userBubble = document.createElement("div");
  userBubble.className = "user-msg";
  userBubble.textContent = message;
  chat.appendChild(userBubble);
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch("https://bottipalvelin.onrender.com/kysy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ viesti: message })
    });

    const data = await res.json();

    // Lisää botin vastaus
    const botBubble = document.createElement("div");
    botBubble.className = "bot-msg";
    botBubble.textContent = data.vastaus;
    chat.appendChild(botBubble);
    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    // Näytä virheviesti
    const errorBubble = document.createElement("div");
    errorBubble.className = "bot-msg";
    errorBubble.textContent = "Virhe palvelussa. Yritä myöhemmin.";
    chat.appendChild(errorBubble);
    chat.scrollTop = chat.scrollHeight;
  }
});
