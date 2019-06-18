import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user : any;
  userId : any;
  constructor(private service: ServiceService, private router:Router, private route: ActivatedRoute) { 
    this.getUserOrNot();
  }

  ngOnInit() {
    this.getUserOrNot();
  }

  getUserOrNot() {
    this.service.getUser().subscribe((data) => {
      this.userId = data;
      if (data == "guest") {
        this.user = false;
      } else {
        this.user = true;
      }
    })
  }

  logout() {
    this.service.logout().subscribe((data)=> {
      if(data) {
        window.location.href = '/';
      }
    })
  }
}
