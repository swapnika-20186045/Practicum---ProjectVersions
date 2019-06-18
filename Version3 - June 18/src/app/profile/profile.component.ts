import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails:any;
  userId:any;
  // edit:any;
  constructor(private service: ServiceService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.getProfile();
  }
  getProfile() {
    this.service.getProfile(this.userId).subscribe((data) => {
      this.userDetails = data;
    })
  }

  // editprofile(){
  //   this.service.addUser(editName, editPhone, editEmail).subscribe((data) => {
  //     alert('SUCCESS!! :-)');
  //     // console.log(data);
  //     if (data) {
  //       // this.flashMessage.show('Email or phone already exists!', {cssClass : 'alert-danger', timeout: 5000});
  //       alert("Email or phone number already exits");
  //     } else {
  //       this.router.navigate(['/login']);
  //     }
  //   });
  // }

}
