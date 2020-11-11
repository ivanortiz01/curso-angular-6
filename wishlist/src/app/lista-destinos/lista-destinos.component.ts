import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viajes.model';
import { DestinoApiClient } from '../models/destino-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  destinos: DestinoViaje[];
  all;

  constructor(public destinoApiClient: DestinoApiClient, private store: Store<AppState>) {
    this.destinos = [];
    this.onItemAdded = new EventEmitter();
    this.updates = []
    this.store.select(state => state.destinos.favorito)
      .subscribe(d => {
        if (d != null) {
          this.updates.push("Se ha elegido a " + d.nombre);
        }
      });

    this.store.select(state => state.destinos.items).subscribe(items => this.all = items);
  }

  ngOnInit(): void {
  }

  // agregado(d: DestinoViaje): boolean {
  //   this.destinos.push(d);
  //   console.log(this.destinos);
  //   return false;
  // }

  agregado(d: DestinoViaje): boolean {
    this.destinoApiClient.add(d);
    console.log("a");
    this.onItemAdded.emit(d);
    //this.store.dispatch(new NuevoDestinoAction(d));
    return false;
  }

  elegido(d: DestinoViaje) {
    this.destinoApiClient.elegir(d);
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }

}
