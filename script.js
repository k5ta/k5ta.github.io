document.addEventListener('DOMContentLoaded', function(){
  const menu_links = document.querySelectorAll(".nav-link");  

  // active links
  connectActiveSectionsWithLinks(menu_links)

  // smooth
  addSmoothScrolling(menu_links)
}, false);


function connectActiveSectionsWithLinks(menu_links) {
  const sections = document.querySelectorAll(".resume-section");

  const makeActive = (link) => menu_links[link].classList.add("active-link");
  const removeActive = (link) => menu_links[link].classList.remove("active-link");
  const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));
   
  let current = getCurrentSectionIndex(sections);
  let currentActive = current;
  makeActive(current);

  window.addEventListener("scroll", () => {
    current = getCurrentSectionIndex(sections);

    if (current !== currentActive) {
      removeAllActive();
      currentActive = current;
      makeActive(current);
    }
  });
}

function getCurrentSectionIndex(sections) {
  const sectionMargin = window.innerHeight / 4;

  let findedIndex = 0;
  if (document.body.offsetHeight - window.scrollY - window.innerHeight > sectionMargin) {
     findedIndex = [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin);
  }
  
  return sections.length - findedIndex - 1
}


function addSmoothScrolling(menu_links) {
  for (const link of menu_links) {
    link.addEventListener("click", clickHandler);
  }
  
  document.querySelectorAll(".navbar-brand")[0].addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth"
  });
}


function showNavbar() {
  const showClass = "show-navbar"
  const navbar = document.getElementById("navbarSupportedContent")

  if (navbar.classList.contains(showClass)) {
    navbar.classList.remove(showClass)
  } else {
    navbar.classList.add(showClass);
  }
}