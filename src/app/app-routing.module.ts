import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosComponent } from './components/datos/datos.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { EntregasComponent } from './components/entregas/entregas.component';
import { HistorialComponent } from './components/historial/historial.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children:[
    { path: 'inicio', component: InicioComponent },
    { path: 'datos', component: DatosComponent },
    { path: 'inventario', component: InventarioComponent },
    { path: 'entregas', component: EntregasComponent },
    { path: 'historial', component: HistorialComponent },
  ]},
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
