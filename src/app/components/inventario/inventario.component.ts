import { Component, OnInit } from '@angular/core';
import { RepartidoresService } from '../../services/repartidor.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html'
})
export class InventarioComponent implements OnInit {

  inventario:any = null;
  historial:any = null;
  boletosRep:any = null;

  id:string = null;
  constructor(private repartidoresService:RepartidoresService) { }

  ngOnInit() {

    this.id = localStorage.getItem("id_usuario")
    this.repartidoresService.getHistorial(Number(this.id)).subscribe( resultado => this.historial = resultado );
    this.repartidoresService.getBoletos(Number(this.id)).subscribe( resultado => this.boletosRep = resultado );

  }

}
