(function () {
  function createLightbox() {
    var lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image preview");

    lightbox.innerHTML =
      '<button class="image-lightbox-close" type="button" aria-label="Close image preview">&times;</button><img alt="" />';

    document.body.appendChild(lightbox);
    return lightbox;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var triggers = document.querySelectorAll("[data-lightbox] img");

    if (!triggers.length) {
      return;
    }

    var lightbox = createLightbox();
    var lightboxImage = lightbox.querySelector("img");
    var closeButton = lightbox.querySelector(".image-lightbox-close");

    function openLightbox(image) {
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || "";
      lightbox.classList.add("is-open");
      document.body.classList.add("lightbox-open");
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.classList.remove("lightbox-open");
      lightboxImage.removeAttribute("src");
    }

    triggers.forEach(function (image) {
      image.addEventListener("click", function () {
        openLightbox(image);
      });
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  });
})();
