import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { bookStoreService } from 'src/app/services/bookStore.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartBooks !: Book[];
  incDecValue : number = 1;

  constructor(private service : bookStoreService,private router : Router) { }

  ngOnInit(): void {
    this.service.getUserById().subscribe(response => {
      console.log(response.data);
      this.cartBooks = response.data.books
    });
  }

  placeOrder(bookId : any) {
    this.service.placeOrder(bookId).subscribe(response => {
      console.log(response);
    });
    this.router.navigate(['order']);
  }

  removeFromCart(bookId : any) {
    this.service.removeFromCart(bookId).subscribe(resp => {
      console.log(resp);
      this.service.getBookCount();
      this.ngOnInit();
    })
  }

  increment() {
    this.incDecValue = this.incDecValue + 1;
  }

  decrement() {
    this.incDecValue = this.incDecValue - 1;
    if(this.incDecValue == 0) {
      this.incDecValue = 1;
    }
  }
}
