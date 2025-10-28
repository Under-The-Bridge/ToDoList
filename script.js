let allElems = document.querySelectorAll(".checkbox");
let addListBtn = document.querySelector("#addListButton");
let panelBG = document.querySelector("#panelAddList");
let wholeAddPanel = document.querySelector("#addListPanel");
let canselBtn = document.querySelector("#second>#cansel");
let emptyListImg = document.querySelector("#emptyList");





addListBtn.addEventListener("click", ()=>{
    panelBG.style.opacity = "1";
    panelBG.style.zIndex = "1";
    wholeAddPanel.style.zIndex = "1";
})
canselBtn.addEventListener("click", ()=>{
    panelBG.style.opacity = "0";
    panelBG.style.zIndex = "-1";
    wholeAddPanel.style.zIndex = "-1";
})

//dark theme
let lightThemeElements = document.querySelectorAll(".light-theme");
let switchTheme = document.querySelector("#theme");

switchTheme.addEventListener("click", ()=>{
    lightThemeElements.forEach(elem =>{
        if(elem.className == "light-theme"){
            elem.className = "dark-theme";
        }else{
            elem.className = "light-theme";
        }
    });
});

//adding Notes
let inputNote = document.querySelector("#inputNote");
let applyBtn = document.querySelector("#apply");
let mainElem = document.querySelector("#main");
let arrayLists = [];
let countLists = 0;

applyBtn.addEventListener("click",()=>{
    countLists++;
    addEmptyImg();
    let list = document.createElement("div");
    list.innerHTML = '<input type="checkbox" class="checkbox"><div class="listName"></div><div class="listBtns"><div class="pen"></div><div class="trashCan"></div></div>'
    list.className = "list";
    list.id = `note${countLists}`;
    if(inputNote.value == ""){
        list.querySelector(".listName").innerText = `NOTE #${countLists}`;
    }else{
        list.querySelector(".listName").innerText = inputNote.value;
    }
    main.appendChild(list);
    arrayLists.push(list);
})

function addEmptyImg(){
    if(countLists == 0){
        let elemEmpty = document.createElement("div");
        elemEmpty.id = "emptyList";
        elemEmpty.innerHTML = '<div id="detective"></div><div>Empty</div>'
        mainElem.appendChild(elemEmpty);
    }else if(document.querySelector("#emptyList")){
        document.querySelector("#emptyList").remove();
    }
}

//not work. why????
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



addEmptyImg();

//search 

let searchInput = document.querySelector("#searchNote");
searchInput.addEventListener('input',()=>{
    globalFilter()
    EmptyImgForSearch();
})


let selectionOptions = document.querySelector("#vipad")

selectionOptions.addEventListener("input", ()=>{
    globalFilter()
    EmptyImgForSearch();
})

function EmptyImgForSearch(){
    let lists = document.querySelectorAll(".list");
    let canAdd = true;
    lists.forEach(element =>{
        if(element.style.display != "none") canAdd = false;
    })
    if(document.querySelector("#emptyList") && !canAdd){
        document.querySelector("#emptyList").remove();
    }
    if(canAdd && !document.querySelector("#emptyList")){
        let elemEmpty = document.createElement("div");
        elemEmpty.id = "emptyList";
        elemEmpty.innerHTML = '<div id="detective"></div><div>Not found</div>'
        mainElem.appendChild(elemEmpty);
    }
}

//YA MOJET TYPOI NO ON KAKIMTO CHUDOM ZARABOTAL ETOT FILTER            F@CK
function globalFilter(){
    let lists = document.querySelectorAll(".list");
    lists.forEach(element =>{
        element.style.display = "flex";
        if(!element.querySelector(".listName").innerText.includes(searchInput.value.toUpperCase())){
            element.style.display = "none";
        }
        if(selectionOptions.value == "complete" && !element.querySelector(".checkbox").checked){
            element.style.display = "none";
        }
        if(selectionOptions.value == "incomplete" && element.querySelector(".checkbox").checked){
            element.style.display = "none";
        }
    })
}

// debug zone

addEventListener('keypress',(i)=>{
    if(i.key == "i"){
        // console.log(arrayLists);
        // alert(document.querySelector(".checkbox").checked)
        alert(selectionOptions.value);
    }
})