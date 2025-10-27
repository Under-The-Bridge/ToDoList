let allElems = document.querySelectorAll("input");
let addListBtn = document.querySelector("#addListButton");
let panelBG = document.querySelector("#panelAddList");
let wholeAddPanel = document.querySelector("#addListPanel");
let canselBtn = document.querySelector("#second>#cansel");
let emptyListImg = document.querySelector("#emptyList");
let arrayLists = [];

allElems.forEach(Elem => {
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


addListBtn.addEventListener("click", ()=>{
    panelBG.style.display = "flex";
    panelBG.style.zIndex = "1";
    wholeAddPanel.style.zIndex = "1";
})
canselBtn.addEventListener("click", ()=>{
    panelBG.style.display = "none";
    panelBG.style.zIndex = "-1";
    wholeAddPanel.style.zIndex = "1";
})