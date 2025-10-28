let allElems = document.querySelectorAll(".checkbox");
let addListBtn = document.querySelector("#addListButton");
let panelBG = document.querySelector("#panelAddList");
let wholeAddPanel = document.querySelector("#addListPanel");
let canselBtn = document.querySelector("#second>#cansel");
let emptyListImg = document.querySelector("#emptyList");





addListBtn.addEventListener("click", ()=>{
    panelBG.style.display = "flex";
    panelBG.style.zIndex = "1";
    wholeAddPanel.style.zIndex = "1";
})
canselBtn.addEventListener("click", ()=>{
    panelBG.style.display = "none";
    panelBG.style.zIndex = "-1";
    wholeAddPanel.style.zIndex = "-1";
})

//dark theme
let lightThemeElements = document.querySelectorAll(".light-theme");

lightThemeElements.forEach(elem =>{
    elem.className = "dark-theme";
})

//adding Notes
let emptyImg = document.querySelector("#emptyList");
let inputNote = document.querySelector("#inputNote");
let applyBtn = document.querySelector("#apply");
let mainElem = document.querySelector("#main");
let arrayLists = [];
let countLists = 0;

applyBtn.addEventListener("click",()=>{
    countLists++;
    CheckLists();
    let list = document.createElement("div");
    list.innerHTML = '<input type="checkbox" class="checkbox"><div class="listName"></div><div class="listBtns"><div class="pen"></div><div class="trashCan"></div></div>'
    list.className = "list";
    list.id = `note${countLists}`;
    list.querySelector(".listName").innerText = `NOTE #${countLists}`;
    main.appendChild(list);
    arrayLists.push(list);
})

function CheckLists(){
    if(countLists == 0){
        emptyImg.style.display = "flex";
    }else{
        emptyImg.style.display = "none";
    }
}



arrayLists.forEach(Elem => {
    Elem.addEventListener('click', () => {
        let listNameStyle = Elem.parentElement.querySelector(".listName").style;
        if (listNameStyle.textDecoration == "line-through") {
            listNameStyle.textDecoration = "none";
            listNameStyle.color = "black";
        }else{
            listNameStyle.textDecoration = "line-through";
            listNameStyle.color = "#25252580";
        }
    });
});
