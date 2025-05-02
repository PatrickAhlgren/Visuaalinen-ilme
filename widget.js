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

  // Tyylit ja animaatiot
  const chatWidget = document.getElementById("chat-widget");
  chatWidget.style.position = "fixed";
  chatWidget.style.bottom = "20px";
  chatWidget.style.right = "-100%";  // Piilota aluksi oikealta
  chatWidget.style.transition = "right 0.5s ease-in-out"; // Animaatio
  chatWidget.style.zIndex = "9999"; // Varmistaa, että widget näkyy aina päällä

  // Chat-viestit ja syöte
  const messages = root.querySelector("#chat-messages");
  const form = root.querySelector("#chat-form");
  const input = root.querySelector("#user-input");

  // Funktio viestien lisäämiselle
  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.textContent = text;
    msg.className = sender === "user" ? "user-msg" : "bot-msg";
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  // Viestin lähettäminen ja vastaanottaminen
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

  // Toiminnallisuus chatin avaamiselle
  const openChatButton = document.createElement("button");
  openChatButton.textContent = "Avaa chat";
  openChatButton.style.position = "fixed";
  openChatButton.style.bottom = "20px";
  openChatButton.style.right = "20px";
  openChatButton.style.backgroundColor = "#007bff";
  openChatButton.style.color = "#fff";
  openChatButton.style.border = "none";
  openChatButton.style.padding = "10px 15px";
  openChatButton.style.borderRadius = "50%";
  openChatButton.style.cursor = "pointer";
  openChatButton.style.zIndex = "10000"; // Varmistaa, että painike on näkyvissä

  document.body.appendChild(openChatButton);

  // Chatin avaaminen ja sulkeminen
  openChatButton.addEventListener("click", () => {
    if (chatWidget.style.right === "0px") {
      chatWidget.style.right = "-100%";
    } else {
      chatWidget.style.right = "20px";
    }
  });
})();

