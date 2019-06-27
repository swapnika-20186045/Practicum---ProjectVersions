import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  details:any;
  userId:any;
  userDetails: any;
  genreDetails: any;
  displayDetails = true;
  displayform = false;
  name: any;
  email: any;
  phone: any;
  genres = ['action', 'drama', 'romance', 'comedy', 'fantasy','horror','mystery','sci-fi','thriller','vampire','superheros','web-comics',
    'crime','mythology','paranormal','anime','werewolves','humor','poetry', 'short-stories'];

  options = ['action', 'drama', 'romance', 'comedy', 'fantasy','horror','mystery','sci-fi','thriller','vampire','superheros','web-comics',
  'crime','mythology','paranormal','anime','werewolves','humor','poetry', 'short-stories'];
  optionsMap = {};
  optionsChecked = [];
  gen = [];
  values = [];

  // edit:any;
  constructor(private service: ServiceService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.getProfile();
    this.initOptionsMap();
  }
  getProfile() {
    this.service.getProfile(this.userId).subscribe((data) => {
      this.details = data;
      console.log(data);
      this.userDetails = this.details.user;
      this.genreDetails = this.details.genre;
      this.gen.push(this.genreDetails.G1);
      this.gen.push(this.genreDetails.G2);
      this.gen.push(this.genreDetails.G3);
      this.gen.push(this.genreDetails.G4);
      this.gen.push(this.genreDetails.G5);
      console.log(this.genreDetails);
    })
  }

  editProfile(){
    this.displayDetails = false;
    this.displayform = true;
  }

  getName(peru) {
    this.name = peru;
    console.log(this.name);
    this.service.updateName(peru).subscribe((data) => {
      if(data) {
        alert("name updated successfully");
        this.router.navigate(['/home']);
      } else {
        alert("There was a mistake and cant update the name");
      }
    })
  }

  getEmail(eMail) {
    this.email = eMail;
    console.log(this.email);
    this.service.updateEmail(eMail).subscribe((data) => {
      if(data) {
        this.router.navigate(['/home']);
        alert("Email updated successfully");
      } else {
        alert("There was a mistake and cant update the email");
      }
    })
  }

  getPhone(phonenum) {
    this.phone = phonenum;
    console.log(this.phone);
    this.service.updatePhone(phonenum).subscribe((data) => {
      if(data) {
        this.router.navigate(['/home']);
        alert("Phone number updated successfully");
      } else {
        alert("There was a mistake and cant update the phone number");
      }
    })
  }

  getGeners() {
    for(var x in this.optionsMap) {
      if(this.optionsMap[x]) {
          this.optionsChecked.push(x);
      }
    }
    // this.options = this.optionsChecked;
    
    // console.log(this.options);
    if(this.optionsChecked.length < 5) {
      

      console.log("Before" + this.gen);
      var valuesfinished = [];
      for(var k=0; k<this.optionsChecked.length; k++) {
        this.values[k] = "*";
      }
      for(var i = 0; i < this.optionsChecked.length; i++) {
        for(var j=0; j < this.gen.length; j++) {
          if(this.optionsChecked[i] === this.gen[j]) {
            this.values[i] = j;
            valuesfinished.push(j);
          }
        }
      }
      console.log("Values finished  " + valuesfinished);
      for(var l = 0; l < this.values.length; l++) {
        if(this.values[l] === "*") {
          var tobe = 0;
          for(var m = 0; m < valuesfinished.length; m++) {
            if(l != valuesfinished[m]) {
              tobe = m + 1;
            }
          }
          this.gen[tobe] = this.optionsChecked[l];
        }
      }
      console.log("Values" + this.values);
    }

    console.log(this.gen);
    this.service.updateGeners(this.gen).subscribe((data) => {
      if(data) {
        this.optionsChecked = [];
        alert("Geners updated successfully");
        this.router.navigate(['/home']);
      } else {
        alert("There was a mistake and cant update geners");
      }
    })
  }

  initOptionsMap() {
      for (var x = 0; x < this.options.length; x++) {
          this.optionsMap[this.options[x]] = false;
      }
  }

  updateGeners(option, event) {
    // console.log(event);
    this.optionsMap[option] = event.target.checked;
  }

}
