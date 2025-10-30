// فتح وإغلاق المينو
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const btu = document.getElementById("btu");

function getmanu_toggle() {
  navbar.style.display = 'block';
}

function getbtu() {
  navbar.style.display = 'none';
}

menuToggle.addEventListener('click', getmanu_toggle);
btu.addEventListener('click', getbtu);

// إخفاء الهيدر عند التمرير
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    header.style.top = "-100px";
  } else {
    header.style.top = "0";
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// البحث عن الأفلام
let searchInput = document.getElementById("search");
let items = document.querySelectorAll(".item");

searchInput.addEventListener("keyup", function () {
  let value = searchInput.value.toLowerCase().trim();
  items.forEach(item => {
    let movieName = item.querySelector("p").textContent.toLowerCase();
    if (movieName.includes(value)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

// main.js

// ====== 1. لما تضغط على أي فيلم (يتضاف في آخر المشاهدة) ======
document.querySelectorAll('.image a').forEach(link => {
  link.addEventListener('click', () => {
    const movieName = link.nextElementSibling.textContent.trim(); // اسم الفيلم
    const moviePage = link.getAttribute('href'); // رابط الفيلم
    const movieImg = link.querySelector('img').getAttribute('src'); // صورة الفيلم

    // خزن الفيلم في localStorage
    let watched = JSON.parse(localStorage.getItem("watchedMovies")) || [];
    // اتأكد إنه مش مكرر
    const exists = watched.some(m => m.page === moviePage);
    if (!exists) {
      watched.push({ name: movieName, page: moviePage, img: movieImg });
      localStorage.setItem("watchedMovies", JSON.stringify(watched));
    }
  });
});


// ====== 2. لما تدوس على زرار "اعجباني" ======
document.querySelectorAll('.item').forEach(item => {
  const likeBtn = item.querySelectorAll('#btu1')[0];
  const movieName = item.querySelector('.image p').textContent.trim();
  const movieImg = item.querySelector('.image img').getAttribute('src');
  const moviePage = item.querySelector('.image a').getAttribute('href');

  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('active');
    let liked = JSON.parse(localStorage.getItem("likedMovies")) || [];

    if (likeBtn.classList.contains('active')) {
      // أضف للفيفوريت
      liked.push({ name: movieName, page: moviePage, img: movieImg });
      localStorage.setItem("likedMovies", JSON.stringify(liked));
      likeBtn.style.background = "red";
    } else {
      // احذف لو اتشال
      liked = liked.filter(m => m.page !== moviePage);
      localStorage.setItem("likedMovies", JSON.stringify(liked));
      likeBtn.style.background = "";
    }
  });
});


// ====== 3. لما تدوس على زرار "المفضلة" ======
document.querySelectorAll('.item').forEach(item => {
  const favBtn = item.querySelectorAll('#btu2')[0];
  const movieName = item.querySelector('.image p').textContent.trim();
  const movieImg = item.querySelector('.image img').getAttribute('src');
  const moviePage = item.querySelector('.image a').getAttribute('href');

  favBtn.addEventListener('click', () => {
    favBtn.classList.toggle('active');
    let fav = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favBtn.classList.contains('active')) {
      fav.push({ name: movieName, page: moviePage, img: movieImg });
      localStorage.setItem("favorites", JSON.stringify(fav));
      favBtn.style.background = "gold";
    } else {
      fav = fav.filter(m => m.page !== moviePage);
      localStorage.setItem("favorites", JSON.stringify(fav));
      favBtn.style.background = "";
    }
  });
});
