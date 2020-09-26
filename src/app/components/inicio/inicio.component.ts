import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  constructor(public activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
    })
  }

}
