// 1. Listing all of a user's notes on a sidebar -->  For now, only create one user.  There will be no log in.
document.addEventListener("DOMContentLoaded", function(event){
getAllNotes()
const newNoteForm = document.getElementById("new-note-form")
const noteDetails = document.getElementById('note-details')
const noteList = document.getElementById("Note-List")
const editNoteForm = document.getElementById("tien")


noteList.addEventListener("click", getNoteDetails)
newNoteForm.addEventListener('submit', createNewNote)
editNoteForm.addEventListener('submit', editNote)
noteDetails.addEventListener('click', noteDetailsHandler)


  function getAllNotes(){
    fetch("http://localhost:3000/api/v1/notes/")
    .then(res => res.json())
    .then(showAllNotes)

  }

  function showAllNotes(notes){
    notes.forEach(function(note){
      singleNote(note)
    })
  }

  function singleNote(note){
    noteList.innerHTML += `<li class="single-note" data-id="${note.id}">${note.title}</li>


`
  }

  function getNoteDetails(e){
debugger
    let noteId = e.target.dataset.id
    fetch(`http://localhost:3000/api/v1/notes/${noteId}`)
    .then(res=>res.json())
    .then(showNoteDetails)
  }


  function showNoteDetails(note){
    noteDetails.innerHTML = `<p>${note.title}</p>
    <p>${note.body}</p>
    <button data-id=${note.id} type="button" class="edit-button">EDIT</button>
    <button type="button" data-id=${note.id} class="delete-button">DELETE</button>
    `
  }

  function createNewNote(e){
    e.preventDefault()

    let newTitle = e.target.children[0].value
    let newContent = e.target.children[2].value
    fetch(`http://localhost:3000/api/v1/notes`, {
      method: "POST",
      headers: {
            'Content-Type': 'application/json'
          },
      body: JSON.stringify({
        "title": newTitle,
        "body": newContent
      })
    })

    .then(res =>res.json())
    .then(singleNote)
    }

function editNote(e){
  e.preventDefault()
  // debugger
  let editTitle = e.target.children[0].value
  let editContent = e.target.children[2].value
  let noteId = e.target.parentElement.parentElement.children[3].children[2].dataset.id
  fetch(`http://localhost:3000/api/v1/notes/${noteId}`, {
    method: "PATCH",
    headers: {
          'Content-Type': 'application/json'
        },
    body: JSON.stringify({
      "title": editTitle,
      "body": editContent
    })
  })
  .then(res =>res.json())
  .then(getAllNotes)

}

function updateScreen(){
noteList.innerHTML = ""
getAllNotes()

}
function populateEditContent(e){
  let editTitle = e.target.parentElement.children[0].innerText
  let editBody = e.target.parentElement.children[1].innerText
  let editTitleInput = document.getElementById("edit-title")
  let editBodyInput = document.getElementById("edit-body")

  editTitleInput.value = editTitle
  editBodyInput.value = editBody



}

function noteDetailsHandler(e){
  if(e.target.className === "edit-button"){
    populateEditContent(e)
  }

}

})
