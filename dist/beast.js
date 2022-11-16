function toggleDetails() {
  document.getElementById("details").classList.toggle("hidden");
  document.querySelectorAll(".btn-default span").forEach((el) => {
    el.classList.toggle("display-none");
  });
  if (!document.getElementById("details").classList.contains("hidden")) {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }
}

function toggleMenuState() {
  document.querySelectorAll(".menu").forEach((el) => {
    el.classList.toggle("display-none");
  });
}

function showTabById(id) {
  toggleMenuState();
  document.getElementById(id).classList.toggle("display-none");
}
