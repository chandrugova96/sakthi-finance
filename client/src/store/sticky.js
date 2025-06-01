export const stickyNavbar = () => {
  let number =
    window.pageXOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  const navbar = document.getElementById("stickyNavbar");
  if (navbar !== null) {
    if (number >= 50) {
      navbar.classList.add("navbar--sticky");
    } else {
      navbar.classList.remove("navbar--sticky");
    }
  }
};
