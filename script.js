/* =========================================
   RICO — POND EXPERIENCE
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const enterBtn = document.getElementById("enterBtn");
  const backBtn = document.getElementById("backBtn");
  const pondScreen = document.getElementById("pondScreen");
  const hero = document.querySelector(".hero");
  const rico = document.querySelector(".rico-character");
  /* =========================================
     LOADER
  ========================================= */
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 1900);
  });
  /* =========================================
     ENTER THE POND
  ========================================= */
  enterBtn.addEventListener("click", () => {
    // Button feedback
    enterBtn.classList.add("clicked");
    // Little screen shake
    document.body.classList.add("screen-shake");
    setTimeout(() => {
      document.body.classList.remove("screen-shake");
    }, 450);
    // Scroll to the pond
    setTimeout(() => {
      pondScreen.scrollIntoView({
        behavior: "smooth"
      });
    }, 250);
  });
  /* =========================================
     BACK TO RICO
  ========================================= */
  backBtn.addEventListener("click", () => {
    hero.scrollIntoView({
      behavior: "smooth"
    });
  });
  /* =========================================
     RICO MOUSE MOVEMENT
  ========================================= */
  if (window.matchMedia("(pointer:fine)").matches) {
    document.addEventListener("mousemove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5);
      const y = (event.clientY / window.innerHeight - 0.5);
      if (rico) {
        rico.style.transform = `
          translate(${x * 18}px, ${y * 18}px)
          rotate(${x * 3}deg)
        `;
      }
    });
  }
  /* =========================================
     RICO TAP EFFECT
  ========================================= */
  if (rico) {
    rico.addEventListener("click", () => {
      rico.classList.remove("rico-hit");
      // Force animation restart
      void rico.offsetWidth;
      rico.classList.add("rico-hit");
      createPopText();
    });
  }
  /* =========================================
     RANDOM MEME POP TEXT
  ========================================= */
  const memeWords = [
    "UP",
    "RICO",
    "W",
    "SEND IT",
    "NO BRAKES",
    "MOON",
    "COOKED",
    "BULLISH",
    "LOL",
    "WAGMI"
  ];
  function createPopText() {
    const text = document.createElement("div");
    text.className = "pop-text";
    text.textContent =
      memeWords[Math.floor(Math.random() * memeWords.length)];
    text.style.left =
      `${35 + Math.random() * 30}%`;
    text.style.top =
      `${35 + Math.random() * 25}%`;
    document.body.appendChild(text);
    setTimeout(() => {
      text.remove();
    }, 900);
  }
  /* =========================================
     RANDOM FLOATING ARROWS
  ========================================= */
  function createArrow() {
    const arrow = document.createElement("div");
    arrow.className = "random-arrow";
    arrow.textContent =
      Math.random() > 0.5 ? "↗" : "↑";
    arrow.style.left =
      `${Math.random() * 100}%`;
    arrow.style.bottom = "-50px";
    arrow.style.animationDuration =
      `${2.5 + Math.random() * 2}s`;
    document.body.appendChild(arrow);
    setTimeout(() => {
      arrow.remove();
    }, 5000);
  }
  /* =========================================
     RANDOM ARROW LOOP
  ========================================= */
  setInterval(() => {
    if (document.visibilityState === "visible") {
      createArrow();
    }
  }, 1300);
  /* =========================================
     CARD TILT
  ========================================= */
  const cards = document.querySelectorAll(".pond-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (event) => {
      if (!window.matchMedia("(pointer:fine)").matches) {
        return;
      }
      const rect = card.getBoundingClientRect();
      const x =
        event.clientX - rect.left;
      const y =
        event.clientY - rect.top;
      const rotateX =
        ((y / rect.height) - 0.5) * -8;
      const rotateY =
        ((x / rect.width) - 0.5) * 8;
      card.style.transform = `
        perspective(600px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
      `;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
  /* =========================================
     SCROLL REVEAL
  ========================================= */
  const revealElements = [
    ...document.querySelectorAll(".pond-card"),
    document.querySelector(".pond-screen h2"),
    document.querySelector(".pond-screen > .pond-inner > p")
  ];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );
  revealElements.forEach(element => {
    if (element) {
      element.classList.add("reveal");
      observer.observe(element);
    }
  });
  /* =========================================
     CONSOLE EASTER EGG
  ========================================= */
  console.log(
    "%c RICO IS WATCHING. ",
    "background:#baff00;color:#050505;font-size:18px;font-weight:bold;padding:10px;"
  );
  console.log(
    "%c THE POND IS OPEN. ",
    "background:#ff7417;color:#000;font-size:14px;font-weight:bold;padding:8px;"
  );
});
/* =========================================
   GLOBAL CLICK CHAOS
========================================= */
document.addEventListener("click", (event) => {
  const target = event.target;
  if (
    target.tagName === "BUTTON" ||
    target.closest("button") ||
    target.closest(".rico-character")
  ) {
    return;
  }
  const dot = document.createElement("span");
  dot.className = "click-dot";
  dot.style.left = `${event.clientX}px`;
  dot.style.top = `${event.clientY}px`;
  document.body.appendChild(dot);
  setTimeout(() => {
    dot.remove();
  }, 500);
});
