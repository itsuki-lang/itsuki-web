(function () {
  var menuBtn = document.getElementById("menuBtn");
  var topNav = document.getElementById("topNav");
  var navWrap = document.querySelector(".nav-wrap");

  // Theme toggle with persistence
  if (navWrap) {
    var savedTheme = localStorage.getItem("itsuki-theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    }

    var themeBtn = document.createElement("button");
    themeBtn.type = "button";
    themeBtn.className = "theme-btn";
    themeBtn.id = "themeBtn";
    themeBtn.textContent = document.body.classList.contains("dark-theme")
      ? "Claro"
      : "Oscuro";
    themeBtn.setAttribute("aria-label", "Cambiar tema");
    navWrap.appendChild(themeBtn);

    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-theme");
      var isDark = document.body.classList.contains("dark-theme");
      localStorage.setItem("itsuki-theme", isDark ? "dark" : "light");
      themeBtn.textContent = isDark ? "Claro" : "Oscuro";
    });
  }

  if (menuBtn && topNav) {
    menuBtn.addEventListener("click", function () {
      topNav.classList.toggle("open");
    });
  }

  var current = location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll(".top-nav a");
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute("href");
    if (href === current) {
      links[i].classList.add("active");
    }
  }

  var copyButtons = document.querySelectorAll(".copy-btn");
  for (var j = 0; j < copyButtons.length; j++) {
    copyButtons[j].addEventListener("click", function (ev) {
      var btn = ev.currentTarget;
      var pre = btn.parentElement.querySelector("pre");
      if (!pre) return;
      var text = pre.innerText;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = "Copiado";
        setTimeout(function () {
          btn.textContent = "Copiar";
        }, 1100);
      });
    });
  }

  var search = document.getElementById("builtinSearch");
  var table = document.getElementById("builtinsTable");
  if (search && table) {
    var rows = table.querySelectorAll("tbody tr");
    search.addEventListener("input", function () {
      var q = search.value.toLowerCase().trim();
      for (var k = 0; k < rows.length; k++) {
        var rowText = rows[k].innerText.toLowerCase();
        rows[k].style.display = rowText.indexOf(q) >= 0 ? "" : "none";
      }
    });
  }

  var librarySearch = document.getElementById("librarySearch");
  var libraryList = document.getElementById("libraryList");
  if (librarySearch && libraryList) {
    var libraryItems = libraryList.querySelectorAll(".library-item");
    librarySearch.addEventListener("input", function () {
      var q = librarySearch.value.toLowerCase().trim();
      for (var n = 0; n < libraryItems.length; n++) {
        var item = libraryItems[n];
        var name = (item.getAttribute("data-library-name") || "").toLowerCase();
        var text = item.innerText.toLowerCase();
        item.style.display =
          name.indexOf(q) >= 0 || text.indexOf(q) >= 0 ? "" : "none";
      }
    });
  }
})();
