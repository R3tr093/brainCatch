import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class UsersServicesService {

  userData : any;
  usedName : any;
  isRegistered : boolean = false;
  isLogged : boolean = false;



  constructor(private http: HttpClient) { }

  
  getUsers(){
    return this.http.get('https://braincatch.herokuapp.com/api/users/').subscribe(
        value => {
          this.usedName = value;

        },
        error => {
          console.log(error)
        },
        () => {
        }
      );
  }
  

  // Take as param  the user name.

  getUser(param){
    return this.http.get('https://braincatch.herokuapp.com/api/users/' + param).subscribe(
        value => {
          console.log(value)
          this.userData = value;

        },
        error => {
          console.log(error)
        },
        () => {
        }
      );
  }

  // isRegistered is used to display the successfull request to user.

  postUser(name){
    return this.http.post('https://braincatch.herokuapp.com/api/users', name, httpOptions).subscribe(
        value => {
          this.isRegistered = true;
          this.userData = value;
          this.getUsers();
        },
        error => {
          console.log(error)
          this.isRegistered = false;
        },
        () => {
        }
      );
  }


  logInUser(data){

    this.isLogged = false;

    return this.http.post('https://braincatch.herokuapp.com/api/users/logIn', data, httpOptions).subscribe(
        value => {
          console.log(value)
          this.userData = value;
          this.isLogged = true;
        },
        error => {
          console.log(error)
        },
        () => {
        }
      );
  }
}

