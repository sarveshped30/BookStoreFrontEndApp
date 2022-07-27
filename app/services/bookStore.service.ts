import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class bookStoreService {

  token !: any;
  userId !: any;
  public bookList = new BehaviorSubject<any>(0);
  public search = new BehaviorSubject<string>("");

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

  getUser() {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    var user = this.http.get(this.buyerURL + "/view/" + this.userId, {headers : header});
    console.log(user);
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
    return this.http.get(this.sellerURL + "/view");
  }

  getBookCount(){
    var bookCount =  this.http.get(this.buyerURL + "/BookCount/" + this.userId);
    bookCount.subscribe(resp => {
      console.log("Book count is " + resp);
      this.bookList.next(resp);
    })
  }

  getBookQuantity(bookName : string) : Observable<any> {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.sellerURL + "/getQuantity/" + bookName);
  }

  login(details : any){
    let response = this.http.post(this.loginURL + "/authenticate", details,{responseType: 'text' as 'json'});
    response.subscribe(resp => {
      // console.log(resp);
      this.token = resp;
      console.log(this.token);
    });
    return response;
  }

  getUserId(username : string) : Observable<any> {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    let response =  this.http.get(this.loginURL + "/get/" + username);
    response.subscribe(resp => {
      this.userId = resp;
      console.log("userId is " + this.userId);
      this.getBookCount();
    })
    return response;
  }

  addToCart(bookId : number) : Observable<any>{
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.cartURL + "/add/" + bookId + "/" + this.userId,  {headers : header});
  } 

  removeFromCart(bookId : number) : Observable<any>{
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.cartURL + "/remove/" + bookId + "/" + this.userId, {headers : header});
  }

  placeOrder(bookId:number) : Observable<any> {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.orderURL + "/" + bookId + "/" + this.userId, {headers : header});
  }

  sortBookAscending() : Observable<any> {
    return this.http.get(this.sellerURL + "/sort/asc");
  }

  sortBookDescending() : Observable<any> {
    return this.http.get(this.sellerURL + "/sort/desc");
  }

  incrementBook(bookId : any) : Observable<any> {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.cartURL + "/addQuantity/" + bookId + "/" + this.userId, {headers : header});
  }

  decrementBook(bookId : any) : Observable<any> {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.cartURL + "/removeQuantity/" + bookId + "/" + this.userId, {headers : header});
  }

  initiateBookQuantity(bookId : any) : Observable<any> {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.sellerURL + "/initiate/" + bookId, {headers : header});
  }

  initiateAllBooksQuantity() : Observable<any> {
    let tokenStr = 'Bearer ' + this.token;
    const header = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(this.sellerURL + "/initiateAll", {headers : header});
  }
}
