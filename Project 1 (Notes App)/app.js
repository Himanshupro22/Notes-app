console.log("Notes App");

// If  user adds a note, add it to the localstorage
showNotes();

var addTxt = document.getElementById("addTxt");
addTxt.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addBtn").click();
  }
 
});

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

  //  Grab textarea and send(save) data to the localstorage
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  notesobj.push(addTxt.value);

  //  Convert Array into String
  localStorage.setItem("notes", JSON.stringify(notesobj));
  addTxt.value = "";
//   console.log(notesobj);
  showNotes();
});

// Save the output of textarea into localstorage and show in Your Note
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } 
  else {
    notesobj = JSON.parse(notes);
  }
  let html = "";
  notesobj.forEach(function (element, index) {
    html += `
        <div class="notesCard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text"> ${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>
    `;
  });

  let noteElm = document.getElementById("notes");
  if (notesobj.length != 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = `Nothing to show! Use "Add a Note" section to add notes.`;
  }
}

// Funtion to Delete Note

function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  }
   else {
    notesobj = JSON.parse(notes);
  }
  notesobj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  showNotes();

}

// Search or filter your notes by this function
let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){

    let inputVal = search.value;
    console.log("input event fire");
    let notesCards = document.getElementsByClassName('notesCard');
    Array.from(notesCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block"
        }
        else{
            element.style.display = "none"
        }
    })
})
