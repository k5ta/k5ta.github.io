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


// LANGS
const RU_LANG = 'ru'
const EN_LANG = 'en'

let currentLang = RU_LANG
let dictionaryRu = null
let dictionaryEn = null

function changeLang(withTimeout = true) {
  document.body.classList.add("lang-change")

  setTimeout(() => { document.body.classList.remove("lang-change") }, withTimeout ? 1000 : 0)
  setTimeout(() => {
    currentLang = currentLang == RU_LANG ? EN_LANG : RU_LANG
    changeLangFields(currentLang)
  }, withTimeout ? 750 : 0)
}

function changeLangFields(lang) {
  const properlyDict = lang == RU_LANG ? dictionaryRu : dictionaryEn
  const keys = Object.keys(properlyDict)

  // texts
  keys.forEach(key => {
    document.getElementsByName(key).forEach(elem => elem.innerHTML = properlyDict[key])
  })

  // resume link
  document.getElementsByName("resume-download").forEach(elem => elem.setAttribute("href", `pdf/tarasov_${lang}.pdf`))
}

window.onload = () => {
  fetch("./texts/ru.json").then(resp => resp.json()).then(data => dictionaryRu = data)
  fetch("./texts/en.json").then(resp => resp.json()).then(data => dictionaryEn = data)

  if (navigator.language.substring(0, 2).toLowerCase() != RU_LANG) {
    changeLang(false)
  }
}
