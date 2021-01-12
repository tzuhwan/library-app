/**
 * Classes:
 * Library 
 * 
 * book
 * 
 * 
 * 
 */

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


class Library {
  constructor() {
    this.booksArray = []
  }

  generateUniqueID() {
    var num = 0
    for (var i = 0; i < this.booksArray.length; i++) {
      if (this.booksArray[i].id > num) num = this.booksArray[i].id
    }
    return num + 1
  }

  get booksArray() {
    return this._booksArray
  }

  set booksArray(value) {
    this._booksArray = value
  }

  addRemoveBtn() {
    const removeBtn = document.createElement('btn')
    removeBtn.className = "remove-btn"
    removeBtn.textContent = "Remove"

    removeBtn.addEventListener('click', (evt) => {
      let bookRow = evt.target.parentElement;
      bookRow.remove();
      const index = this.booksArray.findIndex(x => x.id == bookRow.dataset.index)
      this.booksArray.splice(index, 1)
      console.log(this.removeBookFromDatabase(bookRow.dataset.index))
    })

    return removeBtn
  }

  displayBook(book) {
    const table = document.querySelector("#table")
    const row = document.createElement('tr')
    row.setAttribute("data-index", book.id)
    const infos = book.displayInfo()
    for (var i = 0; i < infos.length; i++) {
      const text = document.createElement('td');
      text.textContent = infos[i];
      row.appendChild(text);
    }
    row.append(this.addRemoveBtn())
    table.appendChild(row)
  }

  getBooksFromDatabase() {
    var database = firebase.database()
    var databaseBooks = []

    database.ref('/library/').once('value').then((snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val()
        item.key = childSnapshot.key

        const book = new Book(childSnapshot.val().title,
          childSnapshot.val().author,
          parseInt(childSnapshot.val().pages),
          childSnapshot.val().hasRead)

        book.id = parseInt(childSnapshot.key)
        databaseBooks.push(book)
      })
      this.booksArray = databaseBooks
      this.booksArray.forEach(book => this.displayBook(book))
    })
  }

  addBookToDatabase(book) {
    var database = firebase.database()
    database.ref("/library/" + book.id).set({
      title: book.title,
      author: book.author,
      pages: book.pages,
      hasRead: book.hasRead
    })
  }

  removeBookFromDatabase(bookId) {
    var database = firebase.database()
    return database.ref("/library/" + bookId).remove()
  }

  addBooktoLibrary(book) {
    book.id = this.generateUniqueID()
    this.booksArray.push(book)
    this.addBookToDatabase(book)
    this.displayBook(book)
  }
}

class Book {
  constructor(title, author, pages, hasRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasRead = hasRead
  }

  get id() {
    return this._id
  }

  set id(value) {
    this._id = value
  }

  get title() {
    return this._title
  }

  set title(value) {
    this._title = value
  }

  get author() {
    return this._author
  }

  set author(value) {
    this._author = value
  }

  get pages() {
    return this._pages
  }

  set pages(value) {
    this._pages = value
  }

  get hasRead() {
    return this._hasRead
  }

  set hasRead(value) {
    this._hasRead = value
  }

  displayInfo() {
    return [this.title, this.author, this.pages, this.hasRead]
  }

}

class Interface {
  _library = null

  constructor(library) {
    this._library = library
    this.addBookBtn()

  }

  addBookBtn() {
    const addBookBtn = document.querySelector('#add-book-btn');
    addBookBtn.addEventListener('click', () => {
      let title = prompt("Please enter the book title.")

      if (title !== null) {
        let author = prompt("Please enter the author of the book.")
        let pages = prompt("Please enter the number of pages.")
        let read = prompt("Please indicate whether you have read the book.")
        this._library.addBooktoLibrary(new Book(title, author, pages, read))
      }
    })
  }
}

const library = new Library()
library.getBooksFromDatabase()
const interface = new Interface(library)
