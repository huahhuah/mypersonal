(function () {
  function createLightbox() {
    var lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image preview");
    lightbox.setAttribute("aria-hidden", "true");

    lightbox.innerHTML =
      '<button class="image-lightbox-close" type="button" aria-label="Close image preview">&times;</button><figure class="image-lightbox-figure"><img alt="" /><figcaption class="image-lightbox-title"></figcaption></figure>';

    document.body.appendChild(lightbox);
    return lightbox;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var triggers = document.querySelectorAll("[data-lightbox]");

    if (!triggers.length) {
      return;
    }

    var lightbox = createLightbox();
    var lightboxImage = lightbox.querySelector("img");
    var lightboxTitle = lightbox.querySelector(".image-lightbox-title");
    var closeButton = lightbox.querySelector(".image-lightbox-close");

    function getTriggerImage(trigger) {
      if (trigger.tagName && trigger.tagName.toLowerCase() === "img") {
        return trigger;
      }

      return trigger.querySelector("img");
    }

    function getTriggerTitle(trigger, image) {
      return (
        trigger.getAttribute("data-lightbox-title") ||
        image.getAttribute("data-lightbox-title") ||
        image.alt ||
        ""
      );
    }

    function openLightbox(trigger) {
      var image = getTriggerImage(trigger);

      if (!image) {
        return;
      }

      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || "";
      lightboxTitle.textContent = getTriggerTitle(trigger, image);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      closeButton.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      lightboxImage.removeAttribute("src");
      lightboxTitle.textContent = "";
    }

    triggers.forEach(function (trigger) {
      var isInteractive = trigger.matches("button, a");

      if (!isInteractive) {
        trigger.setAttribute("role", "button");
        trigger.setAttribute("tabindex", "0");
      }

      trigger.addEventListener("click", function () {
        openLightbox(trigger);
      });

      if (!isInteractive) {
        trigger.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            event.preventDefault();
            openLightbox(trigger);
          }
        });
      }
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
