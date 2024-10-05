const btnEl = document.getElementById("btn");
const appEl = document.getElementById("App");
// added theme toggling functionality using addEventListener
const themeBtn = document.querySelector(".theme");
if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark");
}
if (localStorage.getItem("theme") === "dark") {
  console.log(localStorage.getItem("theme"));
    setIcon("dark");
           document.body.style.backgroundColor = "black";
           document.body.style.filter = "invert(0)";
} else {
    setIcon("light");
    document.body.style.backgroundColor = "white";
    document.body.style.filter = "invert(1)";
}
themeBtn.addEventListener("click", (e) =>{
    if (localStorage.getItem("theme") === "light") {
        setIcon("dark");
        localStorage.setItem("theme", "dark");
        document.body.style.backgroundColor = "black";
        document.body.style.filter = "invert(0)";
    } else if (localStorage.getItem("theme") === "dark") {
        setIcon("light");
        localStorage.setItem("theme", "light");
        document.body.style.backgroundColor = "white";
        document.body.style.filter = "invert(1)";
    }
})
function setIcon(theme) {
    themeBtn.src = `icons/${theme}.svg`;
}
// contribution ended
getNotes().forEach((note)=>{
    const noteEl = createNoteEl(note.id,note.content);
    appEl.insertBefore(noteEl,btnEl);
});
function createNoteEl(id,content){

    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty Note";
    element.value = content;

    element.addEventListener("dblclick",()=>{
            const warning = confirm("Do you want to delete this note?");
            if(warning){
                deleteNote(id,element)
            }
    });

    element.addEventListener("input",()=>{
        updateNote(id,element.value);
    });


    return element;

}

function deleteNote(id,element){

    notes = getNotes().filter((note)=> note.id!=id);
    saveNote(notes);
    appEl.removeChild(element);

}

function updateNote(id,content){
   const notes = getNotes();
   const target = notes.filter((note)=> note.id==id)[0]; 
   target.content = content; 
   saveNote(notes);
}



function addNote(){
    // id , content

    const notes = getNotes();

    const noteObj = {
            id: Math.floor(Math.random() * 10000),
            content: ""           
    };

    const noteEl = createNoteEl(noteObj.id,noteObj.content);
    appEl.insertBefore(noteEl,btnEl);

    notes.push(noteObj);

    saveNote(notes)
}

function saveNote(notes){
    localStorage.setItem("note-app",JSON.stringify(notes));
}

function getNotes(){
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}

btnEl.addEventListener("click", addNote);