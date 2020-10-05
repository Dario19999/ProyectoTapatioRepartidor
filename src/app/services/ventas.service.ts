import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { serialize } from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  url = "https://proyectotapatio.com/PT-API-P/ventas/";
  // url = "http://localhost:8080/PT-API/ventas/";

  constructor(private http:HttpClient) { }


}
