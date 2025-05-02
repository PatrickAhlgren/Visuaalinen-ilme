(function () {
  const root = document.createElement("div");
  root.id = "chat-widget";
  document.body.appendChild(root);

  root.innerHTML = `
    <div id="chat-messages"></div>
    <form id="chat-form">
      <input type="text" id="user-input" placeholder="Lähetä viesti..." />
      <button type="submit">📨</button>
    </form>
  `;

  const messages = root.querySelector("#chat-messages");
  const form = root.querySelector("#chat-form");
  const input = root.querySelector("#user-input");

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.textContent = text;
    msg.className = sender === "user" ? "user-msg" : "bot-msg";
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, "user");
    input.value = "";

    try {
      const res = await fetch("https://bottipalvelin.onrender.com/kysy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ viesti: text })
      });
      const data = await res.json();
      addMessage(data.vastaus, "bot");
    } catch (err) {
      addMessage("Virhe palvelussa. Yritä myöhemmin uudelleen.", "bot");
    }
  });
})();
