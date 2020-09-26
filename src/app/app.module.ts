import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatosComponent } from './components/datos/datos.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { EntregasComponent } from './components/entregas/entregas.component';
import { HistorialComponent } from './components/historial/historial.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { InicioComponent } from './components/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { RepartidoresService } from './services/repartidor.service';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    DatosComponent,
    InventarioComponent,
    EntregasComponent,
    HistorialComponent,
    InicioComponent,
    LoginComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    RepartidoresService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
