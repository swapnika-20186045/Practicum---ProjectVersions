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
  userGenres = [];
  i : 0;
  genres = ['action', 'drama', 'romance', 'comedy', 'fantasy','horror','mystery','sci-fi','thriller','vampire','superheros','web-comics',
    'crime','mythology','paranormal','anime','werewolves','humor','poetry', 'short-stories'];
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

  selectGenre(genre) {
    console.log(genre);
    this.userGenres.push(genre);
  }

  submit(name, phnum, email, pwd) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
        console.log('INVALID!! :-)');
        return;
      }

      console.log(phnum);

      this.service.addUser(name, phnum, email, pwd,this.userGenres).subscribe((data) => {
        alert('SUCCESS!! :-)');
        // console.log(data);
        if (data) {
          // this.flashMessage.show('Email or phone already exists!', {cssClass : 'alert-danger', timeout: 5000});
          alert("Email or phone number already exits");
        } else {
          this.router.navigate(['/login']);
        }
      });
  }
}
