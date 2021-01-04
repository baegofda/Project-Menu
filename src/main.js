// json data load
function loadFood() {
  return fetch("data/data.json")
    .then((res) => res.json())
    .then((json) => json.foods);
}

// json 데이터 변환 및 생성
function displayFoods(foods) {
  const menuList = document.querySelector(".select__menu-list");
  // 배열형식의 json데이터를 map을 이용하여 오브젝트로 변환
  // createHTMLString 를 이용하여 html 요소형식의 스트링으로 변환
  menuList.innerHTML = foods.map((food) => createHTMLStirng(food)).join("");
}

// 받아온 json 데이터인 food를 html 요소로 작성
function createHTMLStirng(food) {
  return `<li class="select__menu">${food.name}</li>`;
}

// 함수실행
loadFood()
  .then((foods) => {
    // 데이터를 리스트로 뿌리기위한 함수실행
    displayFoods(foods);
  })
  .catch((err) => console.log(err));

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
