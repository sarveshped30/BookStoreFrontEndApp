import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book';
import { bookStoreService } from 'src/app/services/bookStore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books !: Book[];
  searchKey : string = "";
  bookLength !: number;
  sort !: string;

  constructor(
    private service : bookStoreService,
  ) { }

  ngOnInit(): void {
    this.service.viewBooks().subscribe(response => {
      // this.books = response.data;
      // console.log(this.books);
      let allBooks:Book[] = response.data;
      console.log(allBooks);
       allBooks.forEach(book => {
        this.service.getBookQuantity(book.bookName).subscribe(bookQuantity => {
          console.log(bookQuantity);
          book.quantity = bookQuantity;
          console.log(book);
        });
       });
       this.books = allBooks;
       this.bookLength = this.books.length;
    });

    this.service.search.subscribe(value => {
      this.searchKey = value;
    })
  }

  addToCart(bookId : any) {
    this.service.addToCart(bookId).subscribe(resp => {
      console.log(resp);
      this.service.getBookCount();
    })
  }

  sortBy() {
    if (this.sort == "Increasing") {
      this.service.sortBookAscending().subscribe(response => {
        let allBooks:Book[] = response.data;
        allBooks.forEach(book => {
          this.service.getBookQuantity(book.bookName).subscribe(bookQuantity => {
            console.log(bookQuantity);
            book.quantity = bookQuantity;
            console.log(book);
          });
         });
         this.books = allBooks;
      })
    } if (this.sort == "Decreasing") {
      this.service.sortBookDescending().subscribe(response => {
        let allBooks:Book[] = response.data;
        allBooks.forEach(book => {
          this.service.getBookQuantity(book.bookName).subscribe(bookQuantity => {
            console.log(bookQuantity);
            book.quantity = bookQuantity;
            console.log(book);
          });
         });
         this.books = allBooks;
      })
      
    } if (this.sort == "Relevance") {
      this.service.viewBooks().subscribe(response => {
        // this.books = response.data;
        // console.log(this.books);
        let allBooks:Book[] = response.data;
        console.log(allBooks);
         allBooks.forEach(book => {
          this.service.getBookQuantity(book.bookName).subscribe(bookQuantity => {
            console.log(bookQuantity);
            book.quantity = bookQuantity;
            console.log(book);
          });
         });
         this.books = allBooks;
      });
  
    }
  }
}
