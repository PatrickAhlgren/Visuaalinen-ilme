(function() {
  // Luo root-div
  const root = document.getElementById('chat-widget');
  // Jos ei ole olemassa, alusta se
  if (!root) return console.error('Puuttuu #chat-widget -elementti');

  const messages = document.getElementById('chat-messages');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('user-input');
  const openBtn = document.getElementById('open-chat');

  // Lisää viesti DOMiin
  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.className = sender === 'user' ? 'user-msg' : 'bot-msg';
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  // Käsittele lomake
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';
    try {
      const res = await fetch('https://bottipalvelin.onrender.com/kysy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ viesti: text })
      });
      const data = await res.json();
      addMessage(data.vastaus, 'bot');
    } catch (err) {
      addMessage('Virhe palvelussa. Yritä myöhemmin uudelleen.', 'bot');
    }
  });

  // Toggle-funktio
  function toggleChat() {
    const isOpen = root.style.right === '20px' || root.style.right === '0px';
    if (isOpen) {
      // Sulje
      root.style.right = '-100%';
    } else {
      // Avaa
      root.style.right = window.innerWidth <= 768 ? '0' : '20px';
    }
  }

  // Avaa nappi
  openBtn.addEventListener('click', toggleChat);

  // Piilota oletuksena
  root.style.right = '-100%';
})();
