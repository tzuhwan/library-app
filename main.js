let myLibrary = [];

const bookKey = {
  a: "title",
  b: "author",
  c: "pages",
  d: "hasRead"
}



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBsfgv0KJknNGntYvnlfAFwTa3hp9ctQCI",
  authDomain: "library-app-8b97a.firebaseapp.com",
  databaseURL: "https://library-app-8b97a-default-rtdb.firebaseio.com",
  projectId: "library-app-8b97a",
  storageBucket: "library-app-8b97a.appspot.com",
  messagingSenderId: "784346750020",
  appId: "1:784346750020:web:5efdc8c68cad93acab3011",
  measurementId: "G-VBD9MW1R41"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function Book(title, author, pages, hasRead) {
  this.a = title
  this.b = author
  this.c = pages
  this.d = hasRead
}

const database = firebase.database();

function addBookToDatabase(book, library) {
  database.ref("/library/" + myLibrary.indexOf(book)).set({
    a: book.a,
    b: book.b,
    c: book.c,
    d: book.d
  })
}


function addBookToLibrary(book, library) {
  // do stuff here

  library.push(book);
  addBookToDatabase(book, library);

}

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

const americanah = new Book("Americanah", "Adichie", 300, true);

const animalFarm = new Book("Animal Farm", "George Orwell", 190, false);

addBookToLibrary(hobbit, myLibrary);
addBookToLibrary(americanah, myLibrary);
addBookToLibrary(animalFarm, myLibrary); dsgosidjgodjgsggjsojgosdjgosdjijoifjaojgfsodjgsdjgosdfjgojdfsogjsdf; ojfsdj; sdfojv; dsojvsdfjvncnovndsonvsdvdsvdsfnvodsnbdsbvdfsv; osdfvn; lsdfnbo; dfsnbf; ondeviceorientationabsolute; dsojvsdfjvncnovndsonvsdvdsvdsfnvodsnbdsbvdfsv



function removeBook(evt, library) {
  let book = evt.parentElement.parentElement;
  console.log(book);
  console.log(book.dataset.index);
  library.splice(book.dataset.index, 1);
  book.remove();
  console.log(library);
}


function addRemoveBtn(row) {
  const btnCell = document.createElement('td')
  const removeBtn = document.createElement('btn');
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener('click', function (event) { removeBook(event.target, myLibrary) });
  btnCell.appendChild(removeBtn);
  row.appendChild(btnCell);
}


function snapshotToArray(snapshot) {
  var returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};


function displayBooks(library) {
  const table = document.querySelector("#table");

  firebase.database().ref('/library').once('value', function (snapshot) {
    library = snapshotToArray(snapshot);
    console.log(library)
    for (book of library) {
      var row = document.createElement('tr');
      row.setAttribute("data-index", library.indexOf(book))
      for (prop in book) {
        if (prop !== "key") {
          const propInfo = document.createElement('td');
          propInfo.textContent = book[prop];
          row.appendChild(propInfo);
        }
      }
      addRemoveBtn(row);
      table.appendChild(row);
    }
  });
}


function addNewBook() {
  let title = prompt("Please enter the book title.");

  if (title !== null) {
    let author = prompt("Please enter the author of the book.");
    let pages = prompt("Please enter the number of pages.");
    let read = prompt("Please indicate whether you have read the book.")

    let book = new Book(title, author, pages, read);

    myLibrary.push(book);
    console.log(myLibrary);
    addBookToDatabase(book, myLibrary);


    const table = document.querySelector("#table");
    var row = document.createElement('tr');
    row.setAttribute("data-index", myLibrary.indexOf(book));
    for (prop in book) {
      if (prop != "key") {
        const propInfo = document.createElement('td');
        propInfo.textContent = book[prop];
        row.appendChild(propInfo);
      }
    }
    addRemoveBtn(row);
    table.appendChild(row);
  }
}



displayBooks(myLibrary);
const addBookBtn = document.querySelector('#add-book-btn');
addBookBtn.addEventListener('click', addNewBook);

const removeBtns = document.querySelectorAll(".remove-btn");
removeBtns.forEach(function (removeBtn) {
  removeBtn.addEventListener('click', function (event) { removeBook(event.target, myLibrary) });
})



