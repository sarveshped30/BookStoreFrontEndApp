import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book';
import { bookStoreService } from 'src/app/services/bookStore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public searchTerm : string = "";
  public badgeCount !: any;


  constructor(private service : bookStoreService) { }

  ngOnInit(): void {
    this.service.bookList.subscribe(response => {
      this.badgeCount = response;
      console.log("header initiated....");
    })
  }

  search(event : any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
  }
}
