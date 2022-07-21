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
    });
  }

  addToCart(bookId : any) {
    this.service.addToCart(bookId).subscribe(response => {
      console.log(bookId);
      console.log(response);
      alert("Added to cart!!")
    });
  }

}
