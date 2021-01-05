// 1. json 데이터를 로드해온다.
// 2. json 데이터를 가공하여  html로 변환하여 메뉴 리스트를 생성한다.
// 3. 토글버튼을 클릭시 카테고리 리스트가 나오게한다. (show 클래스 생성)\
// (다시 토글버튼을 클릭하거나 다른곳을 클릭시에 사라지게해야한다.) (shwo 클래스 삭제)
// 4. 카테고리 리스트 클릭시 해당 카테고리에 맞는 메뉴가 나오게 한다.
//   (해당 카테고리 리스트 클릭시 토글 버튼의 텍스트가 해당 카테고리 리스트로 바뀌어야함)
// 5. 메뉴를 클릭시 서브밋 버튼이 able상태가 된다.
//   (메뉴 클릭시 해당 메뉴를 표시해줘야한다.)

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

//함수실행
loadData()
  .then((items) => {
    //받은 json타입의 데이터를 리스트를 뿌리기 위함
    displayItems(items);
    setEventListeners(items);
  })
  .catch((err) => console.log(err));

// 카테고리 설정 변수
const dropdown = document.querySelector(".dropdown");
const categoryContainer = document.querySelector(".select__categories");
const submitBtn = document.querySelector(".select__order-btn");

dropdown.addEventListener("click", (e) => {
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
  title.addEventListener("click", () => console.log("hi"));
  categoryContainer.addEventListener("click", (e) => onFilter(e, items));
}

//필터링
function onFilter(e, items) {
  const target = e.target;
  const key = target.dataset.key;
  const value = target.dataset.value;
  displayItems(items.filter((item) => item[key] === value));
}

//주문버튼 활성화
menuList.addEventListener("click", () => {
  submitBtn.removeAttribute("disabled");
});
