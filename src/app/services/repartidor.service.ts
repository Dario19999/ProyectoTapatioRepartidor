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
    // return this.http.post(`https://proyectotapatio.com/PT-API-P/login/login.php`, CRED).pipe(retry(3))
    return this.http.post(`http://localhost:8080/PT-API/login/login.php`, CRED).pipe(retry(3))
  }

  registrarVentaExterna( id_rep:number, venta:any){
    const VENTA = serialize(venta);
    return this.http.post(`${this.url}VentaExterna.php?id_usuario=${id_rep}`, VENTA).pipe(retry(3))
  }

  buscarEntrega( id_venta:number ){
    return this.http.get(`${this.url}BuscarEntrega.php?id_venta=${id_venta}`).pipe(retry(3));
  }

  tomerEntrega( id_venta:number, id_repartidor:number ){
    return this.http.get(`${this.url}TomarEntrega.php?id_venta=${id_venta}&id_repartidor=${id_repartidor}`).pipe(retry(3))
  }

  getEntregas( id_repartidor:number ){
    return this.http.get(`${this.url}EntregasProceso.php?id_repartidor=${id_repartidor}`).pipe(retry(3))
  }

  getHistorialEntregas( id_repartidor:number ){
    return this.http.get(`${this.url}EntregasTerminadas.php?id_repartidor=${id_repartidor}`).pipe(retry(3))
  }

  cancelarEntrega( id_venta:number, id_repartidor:number ){
    return this.http.get(`${this.url}CancelarEntrega.php?id_venta=${id_venta}&id_repartidor=${id_repartidor}`).pipe(retry(3))
  }

  terminarEntrega( id_venta:number, id_repartidor:number ){
    return this.http.get(`${this.url}TerminarEntrega.php?id_venta=${id_venta}&id_repartidor=${id_repartidor}`).pipe(retry(3))
  }

  verElementosEntrega( id_venta:number ){
    return this.http.get(`${this.url}VerElementosEntregas.php?id_venta=${id_venta}`).pipe(retry(3))
  }
}
