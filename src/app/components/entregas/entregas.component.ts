import { Component, OnInit } from '@angular/core';
import { BoletosService } from '../../services/boletos.service';
import { EventosService } from '../../services/eventos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html'
})
export class EntregasComponent implements OnInit {

  entregas:any = null;
  eventos:any = null;
  boletos:any = null;
  id_evento:number = null;

  formVentaExt:FormGroup;

  constructor(private boletosService:BoletosService,
              private eventosService:EventosService,
              private fb:FormBuilder) { }

  ngOnInit() {
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

  getEventos(){
    this.eventosService.getEventos(2).subscribe( resultado => {
      this.eventos = resultado
      console.log(this.eventos );
    });
  }

  guardarVentaExt(){
    console.log(this.formVentaExt.value);
  }

}
