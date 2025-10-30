document.querySelectorAll('.item a').forEach(link => {
  link.addEventListener('click', function () {
    // نوصل لاسم الفيلم من العنصر الأب
    let parent = this.closest('.item');
    let videoName = parent.querySelector('p') ? parent.querySelector('p').textContent : "فيديو بدون عنوان";
    let videoImg = this.querySelector('img') ? this.querySelector('img').src : "";
    let videoPage = this.href;

    let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];

    let isExist = watchedMovies.some(m => m.page === videoPage);
    if (!isExist) {
      watchedMovies.unshift({
        name: videoName,
        img: videoImg,
        page: videoPage
      });
    }

    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  });
});
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
