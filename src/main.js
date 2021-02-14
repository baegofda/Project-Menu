// data.json의 데이터들을 json타입으로 로드
function loadData() {
  return fetch("data/data.json")
    .then((res) => res.json())
    .then((json) => json.foods)
    .catch((err) => console.log(err));
}

const menuList = document.querySelector(".select__menu-list");

// json데이터 string 형식의 데이터로 변환하기위함
function displayItems(items) {
  menuList.innerHTML = items
    .map((item) => {
      return `<li class="select__menu">${item.name}</li>`;
    })
    .join("");
}

// 카테고리 설정 변수
const dropdown = document.querySelector(".dropdown");
const categoryContainer = document.querySelector(".select__categories");
const submitBtn = document.querySelector(".select__order-btn");
const toggleBtn = document.querySelector(".select__dropdown");

dropdown.addEventListener("mousedown", (e) => {
  const target = e.target;
  // 드롭다운 토글버튼 클릭시
  if (target.classList.contains("select__dropdown")) {
    categoryHandler();
    // 카테고리 버튼 클릭시
  } else if (target.className === "select__btn") {
    categoryHandler();
    selectCategory(target);
    submitBtn.setAttribute("disabled", "disabled");
  }
  return;
});

// 목록 보일때 블러이벤트
toggleBtn.addEventListener("blur", () => {
  categoryContainer.classList.remove("show");
});

// 카테고리 목록 보이기
function categoryHandler() {
  categoryContainer.classList.toggle("show");
}

// 카테고리 설정
function selectCategory(category) {
  const toggleBtn = document.querySelector(".select__dropdown");
  toggleBtn.innerText = category.innerText;
  toggleBtn.classList.add("selected");
}

//클릭시의 리스트 이벤트
function setEventListeners(items) {
  const title = document.querySelector(".main-container__title");
  title.addEventListener("click", () => displayItems(items));
  categoryContainer.addEventListener("click", (e) => onFilter(e, items));
}

//필터링
function onFilter(e, items) {
  const target = e.target;
  const key = target.dataset.key;
  const value = target.dataset.value;
  displayItems(items.filter((item) => item[key] === value));
}

//메뉴 선택시 주문버튼 활성화
menuList.addEventListener("click", (e) => {
  const target = e.target;
  target.classList.toggle("selected");
  submitBtn.removeAttribute("disabled");
});

//함수실행
loadData()
  .then((items) => {
    //받은 json타입의 데이터를 리스트를 뿌리기 위함
    displayItems(items);
    setEventListeners(items);
  })
  .catch((err) => console.log(err));
