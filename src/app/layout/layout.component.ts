import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepartidoresService } from '../services/repartidor.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  id:string = null;
  repartidor:any = {};

  constructor(private repartidorService:RepartidoresService,
              private router:Router) { }

  ngOnInit() {
    this.id = localStorage.getItem("id_usuario")
    if(this.id == null || this.repartidor == {}){
      this.cerrarSesion();
    }
    this.getRepartidor();
  }

  getRepartidor(){
    this.repartidorService.getRepartidor(Number(this.id)).subscribe( resultado => {
        this.repartidor = resultado[0];
    })
  }

  cerrarSesion(){
    localStorage.removeItem("id_usuario");
    this.router.navigate(['login'])
  }

}
