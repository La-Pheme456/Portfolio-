document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add("hidden");
      }

      document.body.classList.remove("loading");
    }, 900);
  });

  const ambient = document.querySelector(".ambient-light");

  if (ambient) {
    let lightX = window.innerWidth / 2;
    let lightY = window.innerHeight / 2;

    let targetX = lightX;
    let targetY = lightY;

    document.addEventListener("mousemove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    });

    function moveLight() {
      lightX += (targetX - lightX) * 0.08;
      lightY += (targetY - lightY) * 0.08;

      ambient.style.left = `${lightX}px`;
      ambient.style.top = `${lightY}px`;

      requestAnimationFrame(moveLight);
    }

    moveLight();
  }

  const menuButton = document.querySelector(".menu-button");

  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");

      const icon = menuButton.querySelector("i");

      if (mobileMenu.classList.contains("active")) {
        icon.className = "ri-close-line";
      } else {
        icon.className = "ri-menu-4-line";
      }
    });

    document.querySelectorAll(".mobile-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");

        document.body.classList.remove("menu-open");

        const icon = menuButton.querySelector("i");

        icon.className = "ri-menu-4-line";
      });
    });
  }

  const transition = document.querySelector(".page-transition");

  document.querySelectorAll("a[data-transition]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href.startsWith("#") || href.startsWith("mailto:")) {
        return;
      }

      event.preventDefault();

      if (transition) {
        transition.classList.remove("active");

        void transition.offsetWidth;

        transition.classList.add("active");
      }

      setTimeout(() => {
        window.location.href = href;
      }, 430);
    });
  });

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  const tiltElements = document.querySelectorAll("[data-tilt]");

  tiltElements.forEach((element) => {
    let rotateX = 0;
    let rotateY = 0;

    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      const percentX = x / rect.width - 0.5;

      const percentY = y / rect.height - 0.5;

      rotateY = percentX * 24;

      rotateX = percentY * -24;

      element.style.transform = `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.015,1.015,1.015)
                    `;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = `
                    perspective(1200px)
                    rotateX(0deg)
                    rotateY(0deg)
                    scale3d(1,1,1)
                    `;
    });
  });

  const currentPage = document.body.dataset.page;

  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll("[data-magnetic]").forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;

      const y = event.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(
                            ${x * 0.12}px,
                            ${y * 0.12}px
                        )`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });

  const object = document.querySelector(".object");

  if (object) {
    let autoRotation = 0;
    let hovering = false;

    object.addEventListener("mouseenter", () => {
      hovering = true;
    });

    object.addEventListener("mouseleave", () => {
      hovering = false;
    });

    function rotateObject() {
      if (!hovering) {
        autoRotation += 0.08;

        object.style.transform = `
                    perspective(1300px)
                    rotateY(${autoRotation}deg)
                    `;
      }

      requestAnimationFrame(rotateObject);
    }

    rotateObject();
  }

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      const rotateY = (x / rect.width - 0.5) * 5;

      const rotateX = (y / rect.height - 0.5) * -5;

      card.style.transform = `
                        perspective(1200px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-5px)
                        `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
});
