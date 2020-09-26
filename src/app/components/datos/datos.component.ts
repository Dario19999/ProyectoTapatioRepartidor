import { Component, OnInit } from '@angular/core';
import { RepartidoresService } from '../../services/repartidor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html'
})
export class DatosComponent implements OnInit {

  id:string = null;
  repartidor:any = {};

  constructor(private repartidoresService:RepartidoresService,
              private router:Router) { }

  ngOnInit() {
    this.id = localStorage.getItem("id_usuario")
    this.getRepartidor();
  }

  getRepartidor(){
    this.repartidoresService.getRepartidor(Number(this.id)).subscribe( resultado => {
        this.repartidor = resultado[0];
    })
  }

  cerrarSesion(){
    localStorage.removeItem("id_usuario");
    this.router.navigate(['login'])
  }
}
