class Book {
    
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        
        this.id = crypto.randomUUID(); 
    }
    // this.info = function() {
    //     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    // }


    toggleRead(){
        this.read = this.read === "Read" ? "Not Read" : "Read";
    }
}


const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);

}

function displayBooks(arr){
    
    const container = document.getElementById("library");
    container.innerHTML = ""; // clear previous render
    
    for (let book of arr) {
        const card = document.createElement("div");
        card.setAttribute('data-id', book.id);
        card.classList.add("book-card");

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read}</p>
        `;
        
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            const card = removeBtn.closest('.book-card');
            const bookId = card.dataset.id;
            

            const index = myLibrary.findIndex(book => book.id === bookId);
            if (index !== -1){
                myLibrary.splice(index, 1); 
            }
            displayBooks(myLibrary);
        });
        
        const toggleReadBtn = document.createElement("button");
        toggleReadBtn.textContent = "Toggle";
        toggleReadBtn.addEventListener("click", () => {
            const card = toggleReadBtn.closest('.book-card');
            const bookId = card.dataset.id;

            const index = myLibrary.findIndex(book => book.id === bookId);
            if(index !== -1){
                myLibrary[index].toggleRead();
            }
            displayBooks(myLibrary);

        })
        
        card.appendChild(removeBtn);
        card.appendChild(toggleReadBtn);
        container.appendChild(card);

    }
}

const addBook = document.getElementById("newBookBtn");
const dialog = document.getElementById("bookDialog");
const closeBtn = document.getElementById("closeDialog");

addBook.addEventListener("click", () => {
    dialog.showModal();
});

closeBtn.addEventListener("click", () => {
    dialog.close();
});

const form = document.getElementById("bookForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked ? "Read" : "Not read";
    

    addBookToLibrary(title, author, pages, read);

    displayBooks(myLibrary);

    form.reset();
    dialog.close();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Not Read");
addBookToLibrary("1984", "George Orwell", 328, "Read");

displayBooks(myLibrary);