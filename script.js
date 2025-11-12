let allElems = document.querySelectorAll(".checkbox");
let addListBtn = document.querySelector("#addListButton");
let panelBG = document.querySelector("#panelAddList");
let wholeAddPanel = document.querySelector("#addListPanel");
let canselBtn = document.querySelector("#second>#cansel");
let emptyListImg = document.querySelector("#emptyList");
let inputNote = document.querySelector("#inputNote");
let applyBtn = document.querySelector("#apply");
let mainElem = document.querySelector("#main");
let isLightTheme = true;
let addingPanelOpened = false;
let countLists = 0;



addListBtn.addEventListener("click", ()=>{
    OpenAddPanel();
    inputNote.focus();
    addEventListener("keyup",(esc)=>{
        if(esc.key == "Escape" && addingPanelOpened){
            CloseAddPanel();
        }
        // Тут баг так что не раскоменчивать пока не придумаешь как его исправить
        if(esc.key == "Enter" && addingPanelOpened){
            addNote();
        }
    });
})


canselBtn.addEventListener("click", CloseAddPanel);
// panelBG.addEventListener("click", CloseAddPanel);
addEventListener("keydown", (s)=>{
    if(s.key == "Shift" && !addingPanelOpened){
        OpenAddPanel();
    }else if(s.key == "Shift" && addingPanelOpened){
        CloseAddPanel();
    }
})

let temp = document.querySelector("#panelAddList");

function OpenAddPanel(){
    wholeAddPanel.style.zIndex = "1";
    panelBG.style.display = "flex";
    setTimeout(()=>{
        panelBG.style.opacity = "1";
    }, 250)
    addingPanelOpened = true;
}
function CloseAddPanel(){
    wholeAddPanel.style.zIndex = "-1";
    panelBG.style.opacity = "0";
    setTimeout(()=>{
        temp.style.display = "none";
    }, 250)
    addingPanelOpened = false;
}

//dark theme
let lightThemeElements = document.querySelectorAll(".light-theme");
let switchTheme = document.querySelector("#theme");
switchTheme.addEventListener("click", ()=>{
    lightThemeElements.forEach(elem =>{
        if(elem.className == "light-theme"){
            isLightTheme = false;
            elem.className = "dark-theme";
            switchTheme.querySelector("div").style.backgroundImage = "url(img/sun.svg)"
            document.querySelector("#input>button>div").style.backgroundImage = "url(img/dark-lupa.svg)"
            if(document.querySelector("#detective") != null) document.querySelector("#detective").style.backgroundImage = "url(img/detectiveDarkTheme.svg)"
        }else{
            isLightTheme = true;
            elem.className = "light-theme";
            switchTheme.querySelector("div").style.backgroundImage = "url(img/moon.svg)"
            document.querySelector("#input>button>div").style.backgroundImage = "url(img/lupa.svg)"
            if(document.querySelector("#detective") != null) document.querySelector("#detective").style.backgroundImage = "url(img/detective.svg)"
        }
    });

    //ААААААААААААААААААА КОСТЫЛЬ КАКОЙ ЖЕ ОН ТУПОЙ. ДА????? ТАК ВЕДЬ?????????
    document.querySelectorAll(".list").forEach(element =>{
        checkNote(element);
    })
});

//adding Notes
let listParts = `
    <div class="checkAndNote">
        <input type="checkbox" class="checkbox">
        <div class="listName">NOTE #1</div>
    </div>
    <div class="changeInputText">
        <input type="text" class="textInput">
    </div>
    <div class="listBtns">
        <div class="pen"></div>
        <div class="trashCan"></div>
    </div>
    <div class="undoPanel">
        <div class="counter"><div>3</div></div>
        <div class="undoText">
            <div>UNDO</div>
            <div class="undoImg"></div>
        </div>
    </div>
`;

applyBtn.addEventListener("click",addNote);

function addNote(){
    if(inputNote.value.length >= 30){
        alert("Слишком длинное имя");
        return 0;
    } 
    countLists++;
    addEmptyImg();
    let list = document.createElement("div");
    list.innerHTML = listParts;
    list.className = "list";
    list.id = `note${countLists}`;
    if(inputNote.value == ""){
        list.querySelector(".listName").innerText = `NOTE #${countLists}`;
    }else{
        list.querySelector(".listName").innerText = inputNote.value;
    }
    inputNote.value = "";
    main.appendChild(list);
    addEventListenerNote(list);
    globalFilter();
    CloseAddPanel();
}

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
//peredelal snizu
//not work. why????
// arrayLists.forEach(Elem => {
//     Elem.addEventListener('click', () => {
//         let listNameStyle = Elem.parentElement.querySelector(".listName").style;
//         if (listNameStyle.textDecoration == "line-through") {
//             listNameStyle.textDecoration = "none";
//             listNameStyle.color = "black";
//         }else{
//             listNameStyle.textDecoration = "line-through";
//             listNameStyle.color = "#25252580";
//         }
//     });
// });

function addEventListenerNote(note){
    note.querySelector(".checkbox").addEventListener("input",()=>{
        checkNote(note);
    })
    note.querySelector(".trashCan").addEventListener("click",()=>{
        trachNote(note)
        EmptyImgForSearch();
    });
    note.querySelector(".pen").addEventListener("click",()=>{
        penNote(note);
    });
}

function checkNote(note){
    let listNameStyle = note.querySelector(".listName").style;
    if (!note.querySelector(".checkbox").checked) {
        listNameStyle.textDecoration = "none";
        listNameStyle.color = "";
    }else{
        listNameStyle.textDecoration = "line-through";
        if(isLightTheme){
            listNameStyle.color = "#25252580";
        }else{
            listNameStyle.color = "#FFFFFF80";
        }
    }
}

function trachNote(note){
    let counter = note.querySelector(".counter");
    let undo = note.querySelector(".undoPanel");
    note.querySelector(".undoPanel").style.display = "flex";
    note.querySelector(".listBtns").style.display = "none";
    setTimeout(()=>{
        note.querySelector(".undoPanel").style.transform = "scaleX(1)";
    },10)
    let chanceToUndo = setInterval(()=>{
        counter.innerText--;
        if(counter.innerText <= 0){
            note.remove();
            clearInterval(chanceToUndo);
            EmptyImgForSearch();
        } 
    },1000);
    undo.addEventListener("click",()=>{
        note.querySelector(".undoPanel").style.transform = "scaleX(0)";
        setTimeout(()=>{
            note.querySelector(".undoPanel").style.display = "none";
            note.querySelector(".listBtns").style.display = "flex";
        },250)
        clearInterval(chanceToUndo);
        counter.innerText = "3";
    })
}


function penNote(note){
    let focused = false;
    let changeInputText = note.querySelector(".changeInputText");
    let listName = note.querySelector(".listName");
    let isEntered = false;
    changeInputText.children[0].value = listName.innerText;
    if(listName.style.display == "flex" || listName.style.display == ""){
        listName.style.display = "none";
        changeInputText.style.display = "flex";
        
        changeInputText.children[0].focus();
        if(changeInputText.children[0] == document.activeElement){
            focused = true
        }
        changeInputText.children[0].addEventListener("keyup", (enter)=>{
            if(enter.key == "Enter" && !isEntered){
                if(changeInputText.children[0].value.length >= 30){
                    alert("Слишком длинное имя");
                }else{
                    isEntered = true;
                    listName.style.display = "flex";
                    listName.innerText = (changeInputText.children[0].value == "")? "NOTE":changeInputText.children[0].value;
                    changeInputText.style.display = "none";
                }
            }
            if(enter.key == "Escape" || !focused){
                listName.style.display = "flex";
                changeInputText.style.display = "none";
            }
        });
    }else{
        listName.style.display = "flex";
        changeInputText.style.display = "none";
    }
    addEventListener("click",()=>{
        if(changeInputText.children[0] != document.activeElement){
            listName.style.display = "flex";
            changeInputText.style.display = "none";
            listName.innerText = (changeInputText.children[0].value == "")? "NOTE":changeInputText.children[0].value;
        }
    })
    EmptyImgForSearch();
}

addEmptyImg();

//search 

let searchInput = document.querySelector("#searchNote");
searchInput.addEventListener('input',()=>{
    globalFilter()
    EmptyImgForSearch();
})


let selectionOptions = document.querySelector("#vipad")

selectionOptions.addEventListener("input", ()=>{
    if(selectionOptions.value == "all") selectionOptions.style.width = "85px";
    if(selectionOptions.value == "complete") selectionOptions.style.width = "110px";
    if(selectionOptions.value == "incomplete") selectionOptions.style.width = "120px";
    globalFilter()
    EmptyImgForSearch();
})

function EmptyImgForSearch(){
    let lists = document.querySelectorAll(".list");
    let canAdd = true;
    let isEmpty = true;
    lists.forEach(element =>{
        if(element.style.display != "none"){
            canAdd = false;
        } 
        if(lists.length != 0){
            isEmpty = false
        }
    })
    if(document.querySelector("#emptyList") && !canAdd){
        document.querySelector("#emptyList").remove();
    }
    if(canAdd && !document.querySelector("#emptyList")){
        let elemEmpty = document.createElement("div");
        elemEmpty.id = "emptyList";
        elemEmpty.innerHTML = `
            <div id="detective"></div>
            <div>${(isEmpty)?"Empty":"Not found"}</div>
        `;
        mainElem.appendChild(elemEmpty);
    }
}

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





//langs

const lang_btn = document.querySelector("#lang-btn");

// let tem = JSON.parse(json_langs);

// alert(tem.temp)


// debug zone

// addEventListener('keyup',(i)=>{
//     if(i.key == "i"){
//         // console.log(arrayLists);
//         alert(document.querySelector(".checkbox").checked)
//         // alert(selectionOptions.value);
//         // searchInput.focus();
//     }
// })