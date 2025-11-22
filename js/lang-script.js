let Langs = `{
    "EnLang":{
        "Lang":"En",
        "ToDoList":"TODO LIST",
        "Filter":{
            "All":"All",
            "Complete":"Complete",
            "Incomplete":"Incomplete"
        },
        "PlaceHolderSearch":"Search note...",
        "NewNote":"NEW NOTE",
        "PlaceHolderNote":"Input your note...",
        "Cansel":"CANSEL",
        "Apply":"APPLY",
        "Empty":"Empty",
        "Undo":"UNDO"
    },
    "RuLang":{
        "Lang":"Ru",
        "ToDoList":"ЗАМЕТКИ",
        "Filter":{
            "All":"Все",
            "Complete":"Сделано",
            "Incomplete":"Не сделано"
        },
        "PlaceHolderSearch":"Найти...",
        "NewNote":"НОВАЯ ЗАМЕТКА",
        "PlaceHolderNote":"Назовите...",
        "Cansel":"ОТМЕНА",
        "Apply":"ПРИНЯТЬ",
        "Empty":"Пусто",
        "Undo":"Отмена"
    }
}`;



let lang_btn = document.getElementById("lang-btn");
let isRus = false;


lang_btn.addEventListener("click",()=>{
    isRus = !isRus;
    let parsedLang = JSON.parse(Langs);
    parsedLang = isRus? parsedLang.RuLang : parsedLang.EnLang;

    lang_btn.innerText = parsedLang.Lang

    let TodoList = document.getElementById("headTitle").children[0];
    let Filter = document.getElementById("vipad");
    let SearchNote = document.getElementById("searchNote");
    let InputNote = document.getElementById("inputNote");
    let NewNote = document.getElementById("NewNote");
    let Cansel = document.getElementById("cansel");
    let Apply = document.getElementById("apply");

    let Detective = document.getElementById("emptyList");
    
    TodoList.innerText = parsedLang.ToDoList;
    Filter.children[0].innerText = parsedLang.Filter.All;
    Filter.children[1].innerText = parsedLang.Filter.Complete;
    Filter.children[2].innerText = parsedLang.Filter.Incomplete;
    SearchNote.setAttribute("placeholder",parsedLang.PlaceHolderSearch);
    InputNote.setAttribute("placeholder",parsedLang.PlaceHolderNote);
    NewNote.children[0].innerText = parsedLang.NewNote;
    Cansel.children[0].innerText = parsedLang.Cansel;
    Apply.children[0].innerText = parsedLang.Apply;

    if(Detective){
        Detective.children[1].innerText = parsedLang.Empty;
    }
})