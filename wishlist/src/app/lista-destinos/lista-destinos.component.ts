import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viajes.model';
import { DestinoApiClient } from '../models/destino-api-client.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViaje>;

  destinos: DestinoViaje[];

  constructor(public destinoApiClient: DestinoApiClient) {
    this.destinos = [];
    this.onItemAdded = new EventEmitter();
  }

  ngOnInit(): void {
  }

  // agregado(d: DestinoViaje): boolean {
  //   this.destinos.push(d);
  //   console.log(this.destinos);
  //   return false;
  // }

  agregado(d: DestinoViaje) : boolean {
    this.destinoApiClient.add(d);
    console.log("a");
    this.onItemAdded.emit(d);
    return false;
  }

  elegido(d: DestinoViaje) {
    this.destinos.forEach(function(x) {
      x.setSelected(false);
    });
    d.setSelected(true);  
  }

}
