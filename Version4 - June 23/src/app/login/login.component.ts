import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Location} from '@angular/common';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  submitted = false;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private flashMessage: FlashMessagesService, private service: ServiceService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.login.controls; }

  check(username, password) {
    this.submitted = true;

    if (this.login.invalid) {
      return;
    }
    // console.log(username);

    this.service.login(username, password).subscribe(data => {
      alert(data);
      if (data) {
        this.router.navigate(['/home']);
        // this._location.back();
      } else {
        console.log('Not a user');
        // this.flashMessage.show('Email/phone or password is incorrect! Try again!', {cssClass : 'alert-danger', timeout: 5000});

      }
    });
  }

}
