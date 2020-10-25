import { Component, OnInit } from '@angular/core';
import { BoletosService } from '../../services/boletos.service';
import { EventosService } from '../../services/eventos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RepartidoresService } from '../../services/repartidor.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html'
})
export class EntregasComponent implements OnInit {

  entregas:any = null;
  eventos:any = null;
  boletos:any = null;

  id_entrega:number = null;
  id_evento:number = null;
  id_boleto:number = null;
  precio:number = null;

  mensaje:string = null;

  busqueda:any = null;

  encontrado:boolean = null;
  tomado:boolean = false;

  pendientes:boolean = false;

  formVentaExt:FormGroup;

  errorElementos:boolean = false;
  elementosEntrega:any = null;;

  constructor(private boletosService:BoletosService,
              private eventosService:EventosService,
              private repartidoresService:RepartidoresService,
              private fb:FormBuilder) { }

  ngOnInit() {
    this.getEntregas();
    this.formVentaExtInit();
    this.getEventos();
  }

  formVentaExtInit(){
    this.formVentaExt = this.fb.group({
      boleto:[null, Validators.required],
      cantidad:[null, Validators.required],
      precio:[null, Validators.required]
    });
  }

  get validacionBoleto(){
    return this.formVentaExt.get('boleto').invalid && this.formVentaExt.get('boleto').dirty
  }

  get validacionCantidad(){
    return this.formVentaExt.get('cantidad').value == 0 && this.formVentaExt.get('cantidad').touched
  }

  get validacionPrecio(){
    return this.formVentaExt.get('precio').value == 0 && this.formVentaExt.get('precio').touched
  }

  getBoletos( event:any ){
    this.id_evento = event.target.value
    if(this.id_evento != null){
      this.boletosService.getBoletos(this.id_evento).subscribe( resultado => this.boletos = resultado)
    }
    else{
      return
    }
  }

  getBoleto( event:any ){
    this.id_boleto = event.target.value;
    if(this.id_boleto != null){
      this.boletosService.getBoleto(this.id_boleto).subscribe( resultado => {
        this.precio = resultado[0]['precio_actual_boleto'];
      })
    }
  }

  getEventos(){
    this.eventosService.getEventos(2).subscribe( resultado => {
      this.eventos = resultado
    });
  }

  getEntregas(){
    let id_usuario = Number(JSON.parse(localStorage.getItem("id_usuario")));
    this.repartidoresService.getEntregas(id_usuario).subscribe( resultado => {
      this.entregas = resultado;
      if(this.entregas == null){
        this.pendientes = false;
        return
      }
      else{
        this.pendientes = true;
      }
    });
  }

  cancelarEntrega( id_venta:number ){
    let id_usuario = Number(JSON.parse(localStorage.getItem("id_usuario")));
    this.repartidoresService.cancelarEntrega(id_venta, id_usuario).subscribe( datos => {
      if(datos["resultado"] == "ERROR"){
        window.confirm("Ha ocurrido un error. Favor de intentarlo más tarde.")
        return
      }
      else{
        this.getEntregas();
      }
    })
  }

  terminarEntrega( id_venta:number ){
    let id_usuario = Number(JSON.parse(localStorage.getItem("id_usuario")));
    this.repartidoresService.terminarEntrega(id_venta, id_usuario).subscribe( datos => {
      if(datos["resultado"] == "ERROR"){
        window.confirm("Ha ocurrido un error. Favor de intentarlo más tarde.")
        return
      }
      else{
        this.getEntregas();
      }
    })
  }

  guardarVentaExt(){
    let id_usuario = Number(JSON.parse(localStorage.getItem("id_usuario")));

    this.repartidoresService.registrarVentaExterna(id_usuario, this.formVentaExt.value).subscribe( datos => {

      if(datos["estado"] == 0){
        for(let x = 0; 0 < datos["mensajes"].length; x++){
          window.confirm(datos["mensajes"][x]);
          return
        }
      }
      else{
        console.log(datos);
        window.confirm("Venta externa registrada con éxito");
      }

    })
  }

  buscarEntrega( id_venta:number ){

    this.id_entrega = id_venta;

    this.repartidoresService.buscarEntrega(this.id_entrega).subscribe( datos => {
      if(datos['resultado'] == "ERROR"){
        window.confirm("Ha ocurrido un problema inesperado. Inténtelo más tarde.");
        return
      }
      else{
        if(datos['estado'] == 0){
          this.encontrado = false;
          this.mensaje = datos['mensaje'];
          return
        }
        else if(datos['estado'] == -1){
          this.encontrado = false;
          this.mensaje = datos['mensaje'];
          return
        }
        else{
          this.encontrado = true;
          this.busqueda = datos['entrega'];
          console.log(this.busqueda);
        }
      }
    })
  }

  tomarEntrega(){
    let id_usuario = Number(JSON.parse(localStorage.getItem("id_usuario")));
    this.repartidoresService.tomerEntrega( this.id_entrega, id_usuario ).subscribe( datos => {

      if(datos['estado'] == 0){
        this.tomado = false;
        for(let i = 0; i<datos['mensajes'].length; i++){
          window.confirm(datos['mensajes'][i]);
        }
        return
      }
      else{
        this.tomado = true;
        this.getEntregas();
      }
    })
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
