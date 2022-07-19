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
}
