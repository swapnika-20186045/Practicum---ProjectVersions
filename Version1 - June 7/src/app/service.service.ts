import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  uri = 'http://localhost:4000';
  user: any;
  loginuser: any;

  constructor(private http: HttpClient) { }

  addUser(Name, phnum, Email, pwd) {
    console.log(phnum);
    this.user = {
      name: Name,
      phone: phnum,
      email: Email,
      password: pwd
    };
    return this.http.post(`${this.uri}/user/add`, this.user);
  }

// SignIn user
  login(username, password) {
    console.log(password);
    this.loginuser = {
        uname : username,
        pwd : password
      };
    return this.http.post(`${this.uri}/user/login`, this.loginuser);
  }

  temp() {
    return this.http.get(`${this.uri}/recommend`);
  }

  getUser() {
    return this.http.get(`${this.uri}/user`);
  }

  logout() {
    return this.http.get(`${this.uri}/logout`);
  }

  getProfile(userId) {
    return this.http.get(`${this.uri}/profile/${userId}`);
  }
}
