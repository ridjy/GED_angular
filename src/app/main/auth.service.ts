import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {
    constructor() {}


    saveToken(ticket) {
        sessionStorage.setItem('token', ticket);
    }

    getToken() {
        return sessionStorage.getItem('token');
    }
}