import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        console.log("Testing the log")
        return this.http.post<any>('http://localhost:8082/api/login', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }


    isLoggedIn() {
        if (localStorage.getItem('currentUser')!=null) {
            // console.log('current user',localStorage.getItem('currentUser'))
            return true;
        } else {
            // console.log('current user1',localStorage.getItem('currentUser'))
            return false;
        }
    }
}
