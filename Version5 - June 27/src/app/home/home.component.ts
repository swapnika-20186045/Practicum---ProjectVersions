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
  clickedBook :any;
  byGenre =false;
  inccount = 10;
  deccount = 0;
  val: any;
  details: any;
  genre1: any;
  genre2: any;
  genre3: any;
  genre4: any;
  genre5: any;
  // userId:any;
  // g1Index:any;
  // g1Url:any;
  constructor(private service: ServiceService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.temp().subscribe((data) => {
      console.log(data);
      this.details = data;
      console.log(this.details);
      this.genre1 = this.details.genres.G1;
      console.log(this.genre1);
      this.genre2 = this.details.genres.G2;
      this.genre3 = this.details.genres.G3;
      this.genre4 = this.details.genres.G4;
      this.genre5 = this.details.genres.G5;
      this.text1 = this.details.recommendation[0];
      this.text2 = this.details.recommendation[1];
      this.text3 = this.details.recommendation[2];
      this.text4 = this.details.recommendation[3];
      this.text5 = this.details.recommendation[4];
    })
  }
  leftDec(value) {
    console.log(value);
    this.deccount = this.deccount - 9;
    this.inccount = this.deccount;
    if (value === 1) {
      this.service.decrement(value, this.deccount).subscribe((data) => {
        console.log(data);
        this.text1 = data;
      });
    }
    if (value === 2) {
      this.service.decrement(value, this.deccount).subscribe((data) => {
        console.log(data);
        this.text2 = data;
      });
    }
    if (value === 3) {
      this.service.decrement(value, this.deccount).subscribe((data) => {
        console.log(data);
        this.text3 = data;
      });
    }
    if (value === 4) {
      this.service.decrement(value, this.deccount).subscribe((data) => {
        console.log(data);
        this.text4 = data;
      });
    }
    if (value === 5) {
      this.service.decrement(value, this.deccount).subscribe((data) => {
        console.log(data);
        this.text5 = data;
      });
    }
  }
  rightInc(value) {
    console.log(value);
    this.inccount = this.inccount + 9;
    this.deccount = this.inccount;
    if (value === 1) {
      this.service.increment(value, this.inccount).subscribe((data) => {
        console.log(data);
        this.text1 = data;
      });
    }
    if (value === 2) {
      this.service.increment(value, this.inccount).subscribe((data) => {
        this.text2 = data;
      });
    }
    if (value === 3) {
      this.service.increment(value, this.inccount).subscribe((data) => {
        this.text3 = data;
      });
    }
    if (value === 4) {
      this.service.increment(value, this.inccount).subscribe((data) => {
        this.text4 = data;
      });
    }
    if (value === 5) {
      this.service.increment(value, this.inccount).subscribe((data) => {
        this.text5 = data;
      });
    }
  }

  image(i) {
    console.log(i.title);
    this.service.addBook(i.title).subscribe((data) => {
      this.clickedBook = i.title;
      if (data === "book already exists in your list") {
        alert(data);
      } else {
        if(data) {
          console.log(data);
          this.byGenre = true;
          this.text0 = data;
          console.log("Book added successfully");
        }
        else {
          console.log("Book is not added");
        }
      }
    })
  }
}
