import { Component, OnInit } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  text :any;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.service.temp().subscribe((data) => {
      console.log(data);
      this.text = data;
    })
  }
}
