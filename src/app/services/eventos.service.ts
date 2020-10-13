import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { serialize } from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  url = "https://proyectotapatio.com/PT-API-P/eventos/";
  // url = "http://localhost:8080/PT-API/eventos/";

  constructor(private http:HttpClient) { }

  getEventos( tipo:number=-1 ){
    return this.http.get(`${this.url}getEventos.php?tipo=${tipo}`).pipe(retry(3))
  }
}
