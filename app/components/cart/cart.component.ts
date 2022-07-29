import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { bookStoreService } from 'src/app/services/bookStore.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  customerForm !: FormGroup; 
  cartBooks !: Book[];
  user !: any;
  incDecValue : number = 1;
  customerDetails : boolean = false;
  orderSummary : boolean = false;
  totalPrize : number = 0; 

  constructor(private service : bookStoreService,
    private router : Router,
    private formBuilder: FormBuilder,
    private snackBar : MatSnackBar,) { }

  ngOnInit(): void {
    this.service.getUserById().subscribe(response => {
      this.user = response.data;
      console.log(this.user);
      this.cartBooks = response.data.books;

      this.customerForm = this.formBuilder.group({
        name : ['',Validators.required],
        mobileNo : ['',Validators.required],
        emailId : ['', Validators.required],
        city : ['',Validators.required],
        state : ['',Validators.required],
        zipCode : ['',Validators.required],
        address : ['', Validators.required],
       });

       this.customerForm.controls['name'].setValue(this.user.name);
       this.customerForm.controls['mobileNo'].setValue(this.user.mobileNo);
       this.customerForm.controls['emailId'].setValue(this.user.emailId);
       this.customerForm.controls['city'].setValue(this.user.city);
       this.customerForm.controls['state'].setValue(this.user.state);
       this.customerForm.controls['zipCode'].setValue(this.user.zipCode);
       this.customerForm.controls['address'].setValue(this.user.address);

       this.service.getTotalPrize().subscribe(response => {
        this.totalPrize = response;
        console.log(this.totalPrize);
        
       })
    })
  }

  placeOrder() {
    this.service.placeOrder(this.totalPrize, this.customerForm.value).subscribe(response => {
      this.service.orderId.next(response.data.orderId);
      console.log(response);
      this.service.initiateAllBooksQuantity().subscribe(response => {
        console.log(response);
        this.service.emptyCart().subscribe(response => {
          console.log(response);
          this.service.getBookCount();
          this.ngOnInit();
          this.router.navigate(['order']);
        })
      })
    })
  }

  removeFromCart(bookId : any) {
    this.service.removeFromCart(bookId).subscribe(resp => {
      console.log(resp);
      this.service.getBookCount();
      this.ngOnInit();
      this.service.initiateBookQuantity(bookId).subscribe(resp => {
        console.log(resp);
      })
    })
  }

  increment(bookId : any) {
    this.service.incrementBook(bookId).subscribe(resp => {
      console.log(resp);
      this.ngOnInit();
    });
  }

  decrement(bookId : any) {
   this.service.decrementBook(bookId).subscribe(resp => {
    console.log(resp);
    if(resp == 0) {
      this.service.removeFromCart(bookId).subscribe(resp => {
        console.log(resp);
        this.service.getBookCount();
        this.ngOnInit();
        this.service.initiateBookQuantity(bookId).subscribe(resp => {
          console.log(resp);
        })
      })
    }
    this.ngOnInit();
   });
  }

  onOrderButton() {
    this.customerDetails = true;
  }

  onUpKey() {
    this.customerDetails = false;
  }

  onContinue() {
    console.log(this.customerForm.value);
    this.orderSummary = true;
  }

  onSummaryUpKey() {
    this.orderSummary = false
  }
}
