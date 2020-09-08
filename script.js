document.addEventListener('DOMContentLoaded', function(){
  const sections = document.querySelectorAll(".resume-section");
  const menu_links = document.querySelectorAll(".nav-link");

  const makeActive = (link) => menu_links[link].classList.add("active-link");
  const removeActive = (link) => menu_links[link].classList.remove("active-link");
  const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));
  
  const sectionMargin = 200;
 
  let currentActive = 0;
  let current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin ) - 1
  makeActive(current);

  window.addEventListener("scroll", () => {
    current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin ) - 1

    if (current !== currentActive) {
      removeAllActive();
      currentActive = current;
      makeActive(current);
    }
  });
  
  

  for (const link of menu_links) {
    link.addEventListener("click", clickHandler);
  }

  document.querySelectorAll(".navbar-brand")[0].addEventListener("click", clickHandler);

  function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
      top: offsetTop,
      behavior: "smooth"
    });
  }
}, false);

function showNavbar() {
  const showClass = "show-navbar"
  const navbar = document.getElementById("navbarSupportedContent")

  if (navbar.classList.contains(showClass)) {
    navbar.classList.remove(showClass)
  } else {
    navbar.classList.add(showClass);
  }
}