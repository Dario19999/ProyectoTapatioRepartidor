import { Component, OnInit } from '@angular/core';
import { RepartidoresService } from '../../services/repartidor.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html'
})
export class HistorialComponent implements OnInit {

  historial:any = null;
  terminadas:boolean = false;

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

}
