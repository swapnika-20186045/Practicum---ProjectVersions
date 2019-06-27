import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ServiceService} from '../service.service';
import { MustMatch } from './cnfrmpwd';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  reset: FormGroup;
  pwd: FormGroup;
  submited = false;
  constructor(private formBuilder: FormBuilder,  private service: ServiceService, private router: Router) {}

  ngOnInit() {
    this.reset = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.reset.controls; }

  check(email, pwd) {
    this.submited = true;
    console.log('hello');
    this.service.reset(email, pwd).subscribe((data) => {
      if (data) {
        this.router.navigate(['/login']);
        // this.location.back();
      } else {
        console.log('Not a user');
        alert('Not a user');
      }
    });
  }
}
