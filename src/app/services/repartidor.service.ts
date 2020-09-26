import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { serialize } from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})
export class RepartidoresService {

  // url = "https://proyectotapatio.com/PT-API-P/repartidores/";
  url = "http://localhost:8080/PT-API/repartidores/";

  constructor(private http:HttpClient) { }

  getRepartidor(id:number){
    return this.http.get(`${this.url}getRepartidor.php?id=${id}`).pipe(retry(3))
  }

  getHistorial( id:number ){
    return this.http.get(`${this.url}getHistorial.php?id_rep=${id}`).pipe(retry(3))
  }

  getBoletos( id:number ){
    return this.http.get(`${this.url}getBoletos.php?id_rep=${id}`).pipe(retry(3))
  }

  login( credenciales:any ){
    const CRED = serialize(credenciales);
    // return this.http.post(`https://proyectotapatio.com/PT-API-P/login.php`, CRED).pipe(retry(3))
    return this.http.post(`http://localhost:8080/PT-API/login/login.php`, CRED).pipe(retry(3))
  }
}
