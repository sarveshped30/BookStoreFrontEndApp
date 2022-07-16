import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm !: FormGroup;
  buyer : boolean = true;
  seller : boolean = false;
  selectedFile !: File;
  
  constructor(
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
   this.registerForm = this.formBuilder.group({
    register : ['',Validators.required],
   })
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
    console.log(event.target.files[0]);
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }
}

