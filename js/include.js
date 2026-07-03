(function () {
  function loadPartial(targetId, partialPath) {
    var target = document.getElementById(targetId);

    if (!target) {
      return Promise.resolve();
    }

    return fetch(partialPath)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Unable to load " + partialPath);
        }

        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;

        if (targetId === "site-footer" && !isHomePage()) {
          var quote = target.querySelector(".footer-quote");

          if (quote) {
            quote.remove();
          }
        }
      });
  }

  function isHomePage() {
    var path = window.location.pathname;

    return path === "/" || path.endsWith("/index.html");
  }

  function initNavbarCollapse() {
    var navbarCollapse = document.querySelector("#navbarNav");
    var navLinks = document.querySelectorAll("#navbarNav .nav-link");

    if (!navbarCollapse || !navLinks.length || !window.bootstrap) {
      return;
    }

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (!navbarCollapse.classList.contains("show")) {
          return;
        }

        window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
      loadPartial("site-nav", "/partials/nav.html"),
      loadPartial("site-footer", "/partials/footer.html"),
    ]).then(initNavbarCollapse);
  });
})();
