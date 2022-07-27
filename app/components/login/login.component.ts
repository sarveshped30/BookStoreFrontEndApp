import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bookStoreService } from 'src/app/services/bookStore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private services : bookStoreService,
    private route : Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName : ['',Validators.required],
      password : ['',Validators.required],
    });
  }

  onLogin() {
    console.log(this.loginForm.value);
    this.services.login(this.loginForm.value).subscribe(response => {
      // console.log(response);
      // console.log(response.data);
      
    })
    this.getUserId();
    this.route.navigate(['home']);
  }

  getUserId() {
    this.services.getUserId(this.loginForm.value.userName).subscribe(response => {
      // console.log("userId is " + response);
    })
  }
}
