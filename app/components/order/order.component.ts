import { Component, OnInit } from '@angular/core';
import { bookStoreService } from 'src/app/services/bookStore.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  orderId !: any;

  constructor(private service : bookStoreService) { }

  ngOnInit(): void {
   this.service.orderId.subscribe(resp => {
    this.orderId = resp;
   })
  }

}
