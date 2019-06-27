import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  uri = 'http://localhost:4000';
  user: any;
  gen: any;
  loginuser: any;
  params:any;
  username: any;
  book: any;
  incnum: any;
  decnum: any;
  name: any;
  email: any;
  phone: any;
  geners: any;

  constructor(private http: HttpClient) { }

  addUser(Name, phnum, Email, pwd,genre) {
    console.log(phnum);
    this.user = {
      name: Name,
      phone: phnum,
      email: Email,
      password: pwd
    };

    this.gen = {
      phonenum: phnum,
      G1: genre[0],
      G2: genre[1],
      G3: genre[2],
      G4: genre[3],
      G5: genre[4],	
    };

    this.params = {
      person:this.user,
      type: this.gen
    }
    return this.http.post(`${this.uri}/user/add`, this.params);
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
    console.log("I am here");
    return this.http.get(`${this.uri}/genre`);
  }

  decrement(value, cnt) {
    this.decnum = {
      val : value,
      count : cnt
    };
    console.log(this.decnum);
    return this.http.post(`${this.uri}/decrement`, this.decnum);
  }

  increment(value, cnt) {
    this.incnum = {
      val : value,
      count : cnt
    };
    console.log(this.incnum);
    return this.http.post(`${this.uri}/increment`, this.incnum);
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

  reset(email, password) {
    console.log(password);
    this.username = {
      uname : email,
      pwd: password
    };
    return this.http.post(`${this.uri}/user/reset`, this.username);
  }

  addBook(bookTitle) {
    console.log(bookTitle);
    this.book = {
      name : bookTitle
    };
    return this.http.post(`${this.uri}/user/addBook`, this.book);
  }

  listView() {
    return this.http.get(`${this.uri}/list`);
  }

  updateName(peru) {
    console.log(peru);
    this.name = {
      personName : peru
    };
    return this.http.post(`${this.uri}/updateName`, this.name);
  }

  updateEmail(eMail) {
    console.log(eMail);
    this.email = {
      personEmail : eMail
    };
    return this.http.post(`${this.uri}/updateEmail`, this.email);
  }

  updatePhone(pnum) {
    console.log(pnum);
    this.phone = {
      personPhone : pnum
    };
    return this.http.post(`${this.uri}/updatePhone`, this.phone);
  }

  updateGeners(gen) {
    console.log(gen);
    this.geners = {
      g1: gen[0],
      g2: gen[1],
      g3: gen[2],
      g4: gen[3],
      g5: gen[4]
    };
    console.log(this.geners);
    return this.http.post(`${this.uri}/updateGen`, this.geners);
  }
}
