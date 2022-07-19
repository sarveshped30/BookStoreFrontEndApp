import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class bookStoreService {

  token !: any;
  userId !: any;

  private buyerURL:string = "http://localhost:8080/register";
  private sellerURL:string = "http://localhost:8080/seller";
  private loginURL:string = "http://localhost:8080/login";
  private cartURL:string = "http://localhost:8080/cart";
  private orderURL:string = "http://localhost:8080/order"

  constructor(private http : HttpClient) { }


  registerCustomer(customer : any) : Observable<any> {
    return this.http.post(this.buyerURL + "/add", customer);
  }

  viewUsers(): Observable<any> {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.buyerURL + "/view",  {headers : header});
  }

  getUserById(): Observable<any> {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.buyerURL + "/view/" + this.userId, {headers : header})
  }

  registerSeller(seller : any) : Observable<any> {
    return this.http.post(this.sellerURL + "/add", seller);
  }

  viewBooks() : Observable<any>{
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.sellerURL + "/view", {headers : header});
  }

  getBookQuantity(bookName : string) : Observable<any> {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.sellerURL + "/getQuantity/" + bookName, {headers : header});
  }

  login(details : any){
    let response = this.http.post(this.loginURL + "/authenticate", details,{responseType: 'text' as 'json'});
    response.subscribe(resp => {
      // console.log(resp);
      this.token = resp;
      console.log(this.token);
      
    });
    return this.http.post(this.loginURL + "/authenticate", details,{responseType: 'text' as 'json'});
  }

  getUserId(username : string) : Observable<any> {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    let response =  this.http.get(this.loginURL + "/get/" + username, {headers : header});
    response.subscribe(resp => {
      this.userId = resp;
      console.log("userId is " + this.userId);
      
    })
    return this.http.get(this.loginURL + "/get/" + username, {headers : header});
  }

  addToCart(bookId : number) : Observable<any> {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.cartURL + "/add/" + bookId + "/" + this.userId,  {headers : header});
  } 

  removeFromCart(bookId : number) : Observable<any>{
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.cartURL + "/add/" + bookId + "/" + this.userId, {headers : header});
  }

  placeOrder(bookId:number) : Observable<any> {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.orderURL + "/" + bookId + "/" + this.userId, {headers : header});
  }
}
