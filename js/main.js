document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = themeToggle?.querySelector("i");

  const updateThemeControl = (theme) => {
    document.documentElement.dataset.theme = theme;
    if (!themeToggle || !themeIcon) return;

    const lightMode = theme === "light";
    themeIcon.className = lightMode ? "ri-moon-line" : "ri-sun-line";
    themeToggle.setAttribute("aria-label", lightMode ? "Switch to dark mode" : "Switch to light mode");
    themeToggle.setAttribute("title", lightMode ? "Switch to dark mode" : "Switch to light mode");
    themeToggle.setAttribute("aria-pressed", String(lightMode));
  };

  updateThemeControl(document.documentElement.dataset.theme === "light" ? "light" : "dark");

  themeToggle?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    updateThemeControl(nextTheme);
    try {
      localStorage.setItem("la-code-theme", nextTheme);
    } catch {}
  });
  const carousel = document.querySelector(".home-3d-carousel");
  const carouselStage = carousel?.querySelector("[data-carousel-stage]");
  const carouselWindow = carousel?.querySelector("[data-carousel-window]");
  const carouselTrack = carousel?.querySelector("[data-carousel-track]");
  const carouselProgress = carousel?.querySelector("[data-carousel-progress]");
  const carouselCards = carouselTrack ? [...carouselTrack.querySelectorAll(".carousel-card")] : [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (carousel && carouselStage && carouselWindow && carouselTrack && carouselCards.length && !reduceMotion) {
    const stageOffset = carouselStage.getBoundingClientRect().top - carousel.getBoundingClientRect().top;
    let carouselFrame = 0;

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const renderCarousel = () => {
      carouselFrame = 0;
      const sectionTop = carousel.getBoundingClientRect().top + window.scrollY;
      const sectionBottom = sectionTop + carousel.offsetHeight;
      const stickyTop = parseFloat(window.getComputedStyle(carouselStage).top) || 0;
      const start = sectionTop + stageOffset - stickyTop;
      const end = sectionBottom - carouselStage.offsetHeight - stickyTop;
      const progress = clamp((window.scrollY - start) / Math.max(1, end - start), 0, 1);
      const maxTravel = Math.max(0, carouselTrack.scrollWidth - carouselWindow.clientWidth);
      const viewport = carouselWindow.getBoundingClientRect();
      const center = viewport.left + viewport.width / 2;

      carouselTrack.style.transform = `translate3d(${-maxTravel * progress}px, 0, 0)`;
      if (carouselProgress) carouselProgress.style.transform = `scaleX(${progress})`;

      carouselCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const distance = clamp((rect.left + rect.width / 2 - center) / Math.max(1, viewport.width / 2), -1.5, 1.5);
        const rotateY = clamp(-distance * 19, -29, 29);
        const depth = Math.max(0, 34 - Math.abs(distance) * 22);
        const scale = 1 - Math.min(0.07, Math.abs(distance) * 0.035);
        card.style.transform = `perspective(1400px) rotateY(${rotateY}deg) translateZ(${depth}px) scale(${scale})`;
      });
    };

    const queueCarouselRender = () => {
      if (!carouselFrame) carouselFrame = window.requestAnimationFrame(renderCarousel);
    };

    window.addEventListener("scroll", queueCarouselRender, { passive: true });
    window.addEventListener("resize", queueCarouselRender);
    queueCarouselRender();
  }
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

  const header = document.querySelector("header");

  if (header) {
    let lastScrollY = window.scrollY;
    let scrollTicking = false;
    const profilePanel = document.querySelector(".profile-panel");

    const updateHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        header.classList.remove("header-hidden");
        profilePanel?.classList.remove("is-header-hidden");
      } else if (currentScrollY > lastScrollY && currentScrollY > 90) {
        header.classList.add("header-hidden");
        profilePanel?.classList.add("is-header-hidden");
      } else if (currentScrollY < lastScrollY) {
        header.classList.remove("header-hidden");
        profilePanel?.classList.remove("is-header-hidden");
      }

      lastScrollY = currentScrollY;
      scrollTicking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTicking) {
          window.requestAnimationFrame(updateHeader);
          scrollTicking = true;
        }
      },
      { passive: true },
    );
  }

  const enquiryForm = document.querySelector("#enquiry-form");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.querySelector("#enquiry-name").value.trim();
      const email = document.querySelector("#enquiry-email").value.trim();
      const message = document.querySelector("#enquiry-message").value.trim();

      const subject = encodeURIComponent(`Website Enquiry from ${name}`);
      const body = encodeURIComponent(
        `Hello LA-Code,\n\nName: ${name}\nEmail: ${email}\n\nProject details:\n${message}\n\nSent from the La-Code portfolio.`,
      );

      window.location.href = `mailto:femilawal433@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
