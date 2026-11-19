let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

let shapes = null; // looked up on first use, after the page has loaded
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
let shapeFrame = false;

function moveBackground(event) {
  // Touch screens fire fake mouse events on tap, so skip them entirely
  if (!canHover.matches || shapeFrame) return;
  shapeFrame = true;
  if (!shapes) shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  requestAnimationFrame(() => {
    for (let i = 0; i < shapes.length; ++i) {
      const isOdd = i % 2 !== 0;
      const boolInt = isOdd ? -1 : 1;
      // Added rotate after tutorial
      shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`;
    }
    shapeFrame = false;
  });
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme"
  }
  else {
    document.body.classList.remove("dark-theme")
  }
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_80ih0if",
      "template_d9refyl",
      event.target,
      "XHsqapqDAXvEoe07s"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly on chanjuliana228@gmail.com"
      );
    });
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && isModalOpen) {
    toggleModal();
  }
});
