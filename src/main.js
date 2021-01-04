const dropdownToggle = document.querySelector(".select__dropdown");
const categories = document.querySelector(".select__categories");

dropdownToggle.addEventListener("click", () => {
  if (categories.classList.contains("show")) {
    categories.classList.remove("show");
  } else {
    categories.classList.add("show");
  }
});

dropdownToggle.addEventListener("blur", () => {
  categories.classList.remove("show");
});
