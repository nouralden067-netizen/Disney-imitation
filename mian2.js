let menu_toggle = document.getElementById('menu-toggle')
let btu = document.getElementById('btu')
let navbar = document.getElementById('navbar')

function getmanu_toggle(){
    navbar.style.display = 'block'
}

function getbtu(){
    navbar.style.display = 'none'
}

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

// main2.js

const container = document.createElement('div');
container.className = 'movies-container';
document.body.appendChild(container);

// زرار حذف الكل
const clearBtn = document.createElement('button');
clearBtn.textContent = "🗑️ حذف كل آخر المشاهدات";
clearBtn.style = "margin:20px; padding:10px 15px; background:red; color:white; border:none; border-radius:10px; cursor:pointer;";
document.body.insertBefore(clearBtn, container);

let watched = JSON.parse(localStorage.getItem("watchedMovies")) || [];

function renderMovies() {
  if (watched.length === 0) {
    container.innerHTML = "<p>لا يوجد أفلام تمت مشاهدتها بعد.</p>";
  } else {
    container.innerHTML = watched.map((m, index) => `
      <div class="movie-item" style="display:inline-block; margin:10px; text-align:center;">
        <a href="${m.page}">
          <img src="${m.img}" width="200px" style="border-radius:10px;">
        </a>
        <p>${m.name}</p>
        <button onclick="deleteMovie(${index})" style="background:#555;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">🗑️ حذف</button>
      </div>
    `).join('');
  }
}

renderMovies();

// حذف فيلم معين
window.deleteMovie = function(index) {
  watched.splice(index, 1);
  localStorage.setItem("watchedMovies", JSON.stringify(watched));
  renderMovies();
};

// حذف الكل
clearBtn.addEventListener('click', () => {
  if (confirm("هل أنت متأكد من حذف كل المشاهدات؟")) {
    localStorage.removeItem("watchedMovies");
    watched = [];
    renderMovies();
  }
});
