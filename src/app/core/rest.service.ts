import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class RestService {
    constructor(private http: HttpClient) {}

    private baseUrl: string = "http://localhost:80";
    
    getToken(): Observable<string> {
        const endpoint = environment.LOGIN;
        const url = `${this.baseUrl}${endpoint}`;

        return this.http.get<string>(url);
    }

    info(address: string): Observable<any> {
        const endpoint = environment.STAKE_INFO;
        const url = `${this.baseUrl}${endpoint}/${address}`;

        return this.http.get(url);
    }

    addresses(): Observable<any> {
        const endpoint = environment.ADDRESSES;
        const url = `${this.baseUrl}${endpoint}`;

        return this.http.get(url, {responseType: 'json'});
    }
}