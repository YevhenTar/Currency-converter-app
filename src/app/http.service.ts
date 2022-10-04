import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  getData(){
    return forkJoin([
    this.http.get('https://free.currconv.com/api/v7/convert?q=UAH_USD,UAH_EUR&compact=ultra&apiKey=6b3ea2c0ca5183b4fd02'),
    this.http.get('https://free.currconv.com/api/v7/convert?q=USD_EUR,USD_UAH&compact=ultra&apiKey=6b3ea2c0ca5183b4fd02'),
    this.http.get('https://free.currconv.com/api/v7/convert?q=EUR_UAH,EUR_USD&compact=ultra&apiKey=6b3ea2c0ca5183b4fd02')
    ]);
}
}