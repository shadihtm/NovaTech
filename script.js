// Hamburger
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Swiper
new Swiper('.swiper', {
  loop: true,
  autoplay: { delay: 3000 },
  pagination: { el: '.swiper-pagination', clickable: true },
  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }
});

// شمارنده سبد خرید
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');

// وقتی روی دکمه "افزودن به سبد" کلیک شد
document.querySelectorAll('.btn-add').forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = 'flex'; // نمایش شمارنده
  });
});

function startCountdown() {
  let hours = 52;
  let minutes = 34;
  let seconds = 0;

  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  const updateTimer = () => {
    // کاهش ثانیه
    if (seconds > 0) {
      seconds--;
    } else {
      seconds = 59;
      if (minutes > 0) {
        minutes--;
      } else {
        minutes = 59;
        if (hours > 0) {
          hours--;
        } else {
          // تایمر تموم شد
          clearInterval(timerInterval);
          document.querySelector('.countdown').innerHTML = 
            '<p style="color:#e74c3c; font-weight:700; font-size:1.2rem;">جشنواره به پایان رسید!</p>';
          return;
        }
      }
    }

    // آپدیت نمایش
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
  };

  // شروع فوری + هر ثانیه
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

// بعد از لود صفحه
document.addEventListener('DOMContentLoaded', startCountdown);

// محاسبه خودکار درصد تخفیف
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
        badge.style.display = "none"; // اگر تخفیف نبود
    }
});
