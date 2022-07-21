import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/model/book';
import { bookStoreService } from 'src/app/services/bookStore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm !: FormGroup;
  buyerForm !: FormGroup;
  sellerForm !: FormGroup;
  buyer : boolean = true;
  seller : boolean = false;
  selectedFile !: any;
  book !: Book;
  
  constructor(
    private formBuilder: FormBuilder,
    private service : bookStoreService,
  ) { }

  ngOnInit(): void {
   this.registerForm = this.formBuilder.group({
    register : ['',Validators.required],
   });

   this.buyerForm = this.formBuilder.group({
    name : ['',Validators.required],
    mobileNo : ['',Validators.required],
    emailId : ['', Validators.required],
    password : ['',Validators.required],
    city : ['',Validators.required],
    state : ['',Validators.required],
    zipCode : ['',Validators.required],
    address : ['', Validators.required],
   });

   this.sellerForm = this.formBuilder.group({
    bookName : ['',Validators.required],
    author : ['',Validators.required],
    bookPrize : ['',Validators.required],
    quantity : ['',Validators.required],
   });
  }

  insert() {
    console.log(this.registerForm.value);
    console.log(this.registerForm.value.register);
    if(this.registerForm.value.register == 1) {
      this.buyer = true;
      this.seller = false;
     } else {
      this.buyer = false;
      this.seller = true;
     }
  }

  onFileSelected(event : any) {
    // console.log(event.target.files[0]);
    // this.selectedFile = <File>event.target.files[0];
    // console.log(this.selectedFile);
    // console.log(this.selectedFile.data);
    if(event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=> {
        console.log(event.target.result);
        this.selectedFile = event.target.result;
      }
    }
  }

  onSubmitBuyer() {
    console.log(this.buyerForm.value);
    this.service.registerCustomer(this.buyerForm.value).subscribe(response => {
      console.log(response);
      
    });
    alert(this.buyerForm.value.name + " registered successfully");
  }

  onSubmitSeller() {
    console.log(this.sellerForm.value);
    this.book = this.sellerForm.value;
    this.book.bookImage = this.selectedFile;
    console.log(this.book);
    this.service.registerSeller(this.book).subscribe(response => {
      console.log(response);
    });
    alert(this.sellerForm.value.bookName + " added successfully");
  }

  getBooks() {
    this.service.viewBooks().subscribe(response => {
      console.log(response.data);
    })
  }

  getUsers() {
    this.service.viewUsers().subscribe(response => {
      console.log(response.data);
    })
  }
}

