import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  text1 :any;
  text2 :any;
  text3 :any;
  text4 :any;
  text5 :any;
  text0 :any;
  byGenre =false;
  // userId:any;
  // g1Index:any;
  // g1Url:any;
  constructor(private service: ServiceService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.temp().subscribe((data) => {
      console.log(data);
      this.text1 = data[0];
      this.text2 = data[1];
      this.text3 = data[2];
      this.text4 = data[3];
      this.text5 = data[4];
    })
  }
  // g1Move(x) {
  //   this.g1Index += x;
  //   this.service.g1Move(this.g1Index)
  //   this.g1Url = 'http://vakacharlaswapnika.pythonanywhere.com/getBooksByGenre/' + data.G1 + '/start/0/end/5';
  // }

  leftDec() {
    this.service.decrement().subscribe((data) => {
      console.log(data);
      this.text1 = data[0];
      this.text2 = data[1];
      this.text3 = data[2];
      this.text4 = data[3];
      this.text5 = data[4];
    })
  }
  rightInc() {
    
  }
  image(i) {
    console.log(i.title);
    this.service.addBook(i.title).subscribe((data) => {
      if (data) {
        console.log(data);
        this.byGenre = true;
        this.text0 = data;
        // console.log(data[0]);
        console.log("Book added successfully");
      }
      else {
        console.log("Book is not added");
      }
    })
  }
}
