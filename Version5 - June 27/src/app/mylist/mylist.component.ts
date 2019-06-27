import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {
  list :any;
  constructor(private service: ServiceService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.listView().subscribe((data) => {
      this.list = data;
    })

  }
}
