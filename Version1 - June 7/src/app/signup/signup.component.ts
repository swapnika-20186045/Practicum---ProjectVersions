import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './cnfrmpwd';
import {ServiceService} from '../service.service';
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private service: ServiceService, private flashMessage: FlashMessagesService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phnum: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  submit(name, phnum, email, pwd) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
        console.log('INVALID!! :-)');
        return;
      }

      alert('SUCCESS!! :-)');

      console.log(phnum);

      this.service.addUser(name, phnum, email, pwd).subscribe((data) => {
        console.log(data);
        if (data) {
          this.flashMessage.show('Email or phone already exists!', {cssClass : 'alert-danger', timeout: 5000});
        } else {
          this.router.navigate(['/login']);
        }
      });
  }

}
