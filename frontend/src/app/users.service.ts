import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import { RequestOptions } from '@angular/http/';
import { Headers } from '@angular/http/';
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";

import { IUsers } from './users-interface';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class UsersService {
  private proxy = 'http://localhost:9000';
  private login = { // Data for accessing secured api path with DELETE
    "username": "mikel",
    "password": "123"
  };
  private errorMessage: string;
  errorMessageChange: Subject<string> = new Subject<string>();

  constructor(private http: Http) {
    this.errorMessage = "";
  }

  getUsers(): Observable<IUsers[]> {
    return this.http
      .get(this.proxy + '/http://localhost:8080/api/users/')
      .map((response: Response) => {
        return <IUsers[]>response.json();
      });
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  getColumns() {
    return ["Name", ""];
  }

  deleteUser(id: number) {
    let headers = new Headers ({
      'Authorization': 'Basic ' + btoa(this.login.username + ":" + this.login.password)
    });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .delete(this.proxy + '/http://localhost:8080/secured/deleteUser/' + id, options)
      .map((response: Response) => {
        return response;
      });
  }

  addUser(newUserName: string): Observable<IUsers> {
    return this.http
      .post(this.proxy + '/http://localhost:8080/api/users/', {name: newUserName})
      .map((response: Response) => {
        return <IUsers>response.json();
      });
  }

  updateUser(user: IUsers) {
    return this.http
      .put(this.proxy + '/http://localhost:8080/api/users/' + user.id, user)
      .map((response: Response) => {
        return response;
      });
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
    this.errorMessageChange.next(this.errorMessage);
    console.log(this.errorMessage);
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}

