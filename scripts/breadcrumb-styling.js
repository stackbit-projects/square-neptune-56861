// a thing to help the breadcrumb look nice if it's on top of a secondary hero

if (process.browser) {
  var breadcrumb = document.querySelector(".c-breadCrumb");
  var hero = document.querySelector(".c-breadCrumb + .c-hero");
  // ^ only if it's in this specific location
  // gets visually moved up by the styles in component-hero

  if (breadcrumb && hero) {
    breadcrumb.classList.add("on-hero");
    if (hero.classList.contains("c-hero--primary")) {
      breadcrumb.classList.add("primary");
    }
    if (hero.classList.contains("c-hero--secondary")) {
      breadcrumb.classList.add("secondary");
    }
  }
}
