// ================= Hamburger =================
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// ================= Swiper =================
new Swiper('.swiper', {
  loop: true,
  autoplay: { delay: 3000 },
  pagination: { el: '.swiper-pagination', clickable: true },
  slidesPerView: 'auto', // اندازه خودکار با تصاویر کوچیک
  spaceBetween: 20,
  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }
});

// ================= Cart Counter =================
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
cartCountElement.style.display = 'none'; // ابتدا مخفی

document.querySelectorAll('.btn-add').forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';

    // افکت کوتاه روی شمارنده
    cartCountElement.animate([{ transform: 'scale(1.3)' }, { transform: 'scale(1)' }], { duration: 200 });
  });
});

// ================= Countdown Timer =================
function startCountdown() {
  // زمان پایان جشنواره (مثال: 52 ساعت از الان)
  const endTime = new Date().getTime() + (52 * 60 * 60 * 1000) + (34 * 60 * 1000); 

  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  const updateTimer = () => {
    const now = new Date().getTime();
    let distance = endTime - now;

    if (distance <= 0) {
      clearInterval(timerInterval);
      document.querySelector('.countdown').innerHTML =
        '<p style="color:#e74c3c; font-weight:700; font-size:1.2rem;">جشنواره به پایان رسید!</p>';
      return;
    }

    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
  };

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

document.addEventListener('DOMContentLoaded', startCountdown);

// ================= Discount Badge =================
document.querySelectorAll('.product-card').forEach(card => {
  const oldPriceEl = card.querySelector('.old');
  const newPriceEl = card.querySelector('.new');
  const badge = card.querySelector('.discount-badge');

  if (!oldPriceEl || !newPriceEl || !badge) return;

  const oldPrice = parseFloat(oldPriceEl.dataset.old);
  const newPrice = parseFloat(newPriceEl.dataset.new);

  if (!isNaN(oldPrice) && !isNaN(newPrice) && oldPrice > newPrice) {
    const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    badge.textContent = `${discount}%`;
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
});
