import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepartidoresService } from '../services/repartidor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loggedIn:boolean = false;
  formLogin:FormGroup;

  @ViewChild('modalLogin',{ static: false }) modalLogin;
  @ViewChild('modalError',{ static: false }) modalError;
  @ViewChild('cerrarModalError',{ static: false }) cerrarModalError;

  constructor(private fb:FormBuilder,
              private repartidoresService:RepartidoresService,
              private router:Router) { }

  ngOnInit() {
    this.formLoginInit();
  }

  formLoginInit(){
    this.formLogin = this.fb.group({
      correo:[null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      contra:[null, Validators.required]
    })
  }

  get validacionCorreoL(){
    return this.formLogin.get('correo').invalid && this.formLogin.get('correo').touched
  }

  login(){
    if(this.formLogin.invalid){
      Object.values(this.formLogin.controls).forEach( control =>{

        if(control instanceof FormGroup){
          Object.values(control.controls).forEach( control => control.markAllAsTouched())
        }
        else{
          control.markAllAsTouched();
        }
      });
      return;
    }
    else{
      this.formLogin.addControl("tipo", this.fb.control(null));
      this.formLogin.get("tipo").setValue(111);
      this.repartidoresService.login(this.formLogin.value).subscribe( datos => {
          if(datos['estado'] == 0 || datos['estado'] == -1){
            window.confirm(datos['mensaje']);
            return
          }
          else if(datos['estado'] == 1){
            if(datos['activo'] == 0){
              this.modalError.nativeElement.click();
              return
            }else{
              let id = datos['id_usuario'];

              localStorage.setItem("id_usuario", id);

              this.router.navigate(['/inicio']);
            }
          }
      })
    }
  }

}
