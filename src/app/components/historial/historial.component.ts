import { Component, OnInit } from '@angular/core';
import { RepartidoresService } from '../../services/repartidor.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html'
})
export class HistorialComponent implements OnInit {

  historial:any = null;
  terminadas:boolean = false;
  errorElementos:boolean = false;
  elementosEntrega:any = null;;

  constructor(private repartidoresService:RepartidoresService) { }

  ngOnInit() {
    this.getHistorial();
  }

  getHistorial(){
    let id_usuario = Number(JSON.parse(localStorage.getItem("id_usuario")));
    this.repartidoresService.getHistorialEntregas(id_usuario).subscribe( resultado => {
      this.historial = resultado;
      console.log(this.historial);
      if(this.historial == null){
        this.terminadas = false;
        return
      }
      else{
        this.terminadas = true;
      }
    });
  }

  verMas( id_venta:number ) {
    this.elementosEntrega = null;
    this.repartidoresService.verElementosEntrega(id_venta).subscribe(resultado => {
      if(resultado == null){
        this.errorElementos = true;
        return
      }
      else{
        this.elementosEntrega = resultado;
        console.log(this.elementosEntrega);
      }
    })
  }
}
