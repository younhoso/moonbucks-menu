// Step2
// TODO localStorage Read & Write
// - [x] localStorage에 데이터를 저장한다.
//  - [x] 메뉴를 추가할 때
//  - [x] 메뉴를 수정할 때
//  - [x] 메뉴를 삭제할 때
// - [x] localStorage에 있는 데이터를 읽어온다.

// TODO 카테고리별 메뉴판 관리
// - [] 에스프레소 메뉴판 관리
// - [] 프라푸치노 메뉴판 관리
// - [] 블렌디드 메뉴판 관리
// - [] 티바나 메뉴판 관리
// - [] 디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// - [] 최초로 로딩될때 localStorage에 에스프레소 메뉴를 읽어온다.
// - [] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// - [] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - [] 품절 버튼을 추가한다.
// - [] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
// - [] 클릭이벤트에서 가장가까운 li태그에 class속성 값이 sold-out을 추가한다.

const $ = element => document.querySelector(element);

const store = {
    setLocalStorage(menu) {
        localStorage.setItem("menu", JSON.stringify(menu));
    },
    getLocalStorage() {
        return JSON.parse(localStorage.getItem("menu"));
    }
}

function App(){
    // 상태를 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
    this.menu = {
        espresso: new Array(),
        frappuccino: new Array(),
        blended: new Array(),
        teavana: new Array(),
        desert: new Array()
    };
    this.currentCategory = 'espresso';

    const render = () => {
        const template = this.menu[this.currentCategory].map((menuItem, idx) => {
            return `<li data-menu-id="${idx}" class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
                    수정
                </button>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
                    삭제
                </button>
            </li>`
        }).join(''); //배열객체에 있는 li항목 들을 하나로 합쳐주는 join역할

        $('#espresso-menu-list').innerHTML = template
        updateMenuCount();
    };

    const updateMenuCount = () => {
        const mentCount = $('#espresso-menu-list').querySelectorAll('li').length;
        $('.menu-count').innerText = `총 ${mentCount}개`;
    };

    const addMenuName = () => {
        if($('#espresso-menu-name').value === ''){
            alert('값을 입력해주세요.');
            return;
        }
        const espressoMenuName = $('#espresso-menu-name').value;
        this.menu[this.currentCategory].push({ name: espressoMenuName });
        store.setLocalStorage(this.menu); //상태가 변하는 시졈에 localStorage에 데이터를 저장한다.
        render();
        $('#espresso-menu-name').value = '';
    };

    const updateMenuName = (e) => {
        const menuId = e.target.closest('li').dataset.menuId;
        const $menuName = e.target.closest('li').querySelector('.menu-name');
        const updateedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
        this.menu[this.currentCategory][menuId].name = updateedMenuName; //기존에 있던 this.menu 배열에 수정하여 저장한다.
        store.setLocalStorage(this.menu); //그리고 다시 localStorage에 데어터를 저장한다.
        $menuName.innerText = updateedMenuName;
    };

    const removeMenuName = (e) => {
        if(confirm('정말 삭제하시겠습니까?')){
            const menuId = e.target.closest('li').dataset.menuId;
            this.menu[this.currentCategory].splice(menuId, 1);
            store.setLocalStorage(this.menu);
            e.target.closest('li').remove();
            updateMenuCount();
        }
    }

    $("#espresso-menu-list").addEventListener("click", (e) => {
        if(e.target.classList.contains('menu-edit-button')) {
            updateMenuName(e);
        }

        if(e.target.classList.contains('menu-remove-button')){
            removeMenuName(e);
        }
    });

    $('#espresso-menu-form').addEventListener('submit', (e) => {
        e.preventDefault();
    });

    $('#espresso-menu-name').addEventListener('keypress', (e) => {
        if(e.key !== 'Enter') return;
        addMenuName();
    });

    $('#espresso-menu-submit-button').addEventListener('click', addMenuName);

    $('nav').addEventListener('click', (e) => {
        const isCategoryButton = e.target.classList.contains('cafe-category-name');
        const categoryName = isCategoryButton && e.target.dataset.categoryName;
        console.log(categoryName)
    });

    this.init = () => {
        if(store.getLocalStorage()){
            this.menu = store.getLocalStorage()
            render();
        }
    };
}
const app = new App();
app.init();
