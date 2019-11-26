import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  readonly API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  signIn() {
    this.http.get(this.API_URL + '/token/sign')
        .subscribe(
          (res) => {
            console.log(res);
            if (res['token']) {
              localStorage.setItem('token', res['token']);
            }
          },
          (err) => {
            console.log(err);
          }
        );
  }

  getPath() {
    this.http.get(this.API_URL + '/path1')
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
  }

}
