import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoletosService {

  // url = "https://proyectotapatio.com/PT-API-P/boletos/";
  url = "http://localhost:8080/PT-API/boletos/";

  constructor(private http:HttpClient) { }

  getBoletos( id_evento:number ){
    return this.http.get(`${this.url}getBoletos.php?id_evento=${id_evento}`).pipe(retry(3))
  }
}
