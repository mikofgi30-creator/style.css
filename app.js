const tg = window.Telegram.WebApp;
tg.expand();

let userId = null;

// USER
const user = tg.initDataUnsafe.user;

if (user) {
  userId = user.id;
  username.innerText = user.first_name;
  avatar.src = user.photo_url || "https://i.pravatar.cc/100";
}

// API
const API = "https://ТВОЙ-RAILWAY-URL";

// баланс
async function loadBalance() {
  if (!userId) return;

  try {
    const res = await fetch(API + "/profile?user_id=" + userId);
    const data = await res.json();

    balance.innerText = data.balance + " TON";
  } catch {}
}

setInterval(loadBalance, 5000);
loadBalance();

// вкладки
function openTab(tab, el) {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  el.classList.add("active");

  const content = document.getElementById("content");

  // MARKET
  if (tab === "market") {
    content.innerHTML = `
      <div class="card">
        <img src="https://picsum.photos/300?1">
        <div class="card-title">Rare NFT</div>
        <div class="card-price">0.2 TON</div>
        <div class="buy-btn">Buy</div>
      </div>

      <div class="card">
        <img src="https://picsum.photos/300?2">
        <div class="card-title">Epic NFT</div>
        <div class="card-price">0.5 TON</div>
        <div class="buy-btn">Buy</div>
      </div>
    `;
  }

  // PROFILE
  if (tab === "profile") {
    content.innerHTML = `
      <div class="card">
        <h2>Profile</h2>
        <p>ID: ${userId}</p>
      </div>

      <div class="card">
        <div class="buy-btn" onclick="deposit()">💎 Deposit</div>
      </div>
    `;
  }
}

// депозит
function deposit() {
  tg.sendData("deposit_gift");
}

// старт
openTab("market", document.querySelector(".nav-btn"));
