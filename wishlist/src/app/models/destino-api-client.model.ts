import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { DestinoViaje } from './destino-viajes.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.model';

@Injectable()
export class DestinoApiClient {

  constructor(private store: Store<AppState>) {
    
  }

  add(d: DestinoViaje) {
    this.store.dispatch(new NuevoDestinoAction(d));
  }

  elegir(d: DestinoViaje) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }
}
