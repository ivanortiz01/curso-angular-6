import { forwardRef, Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppConfig, AppState, APP_CONFIG } from '../app.module';
import { DestinoViaje } from './destino-viajes.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.model';
import { HttpRequest, HttpHeaders, HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';

@Injectable()
export class DestinoApiClient {

  destinos: DestinoViaje[] = [];

  constructor(
    private store: Store<AppState>,
    @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
    private http: HttpClient
  ) {
    this.store
      .select(state => state.destinos)
      .subscribe((data) => {
        console.log('destinos sub store');
        console.log(data);
        this.destinos = data.items;
      });
    this.store
      .subscribe((data) => {
        console.log('all store');
        console.log(data);
      });
  }

  getById(id: String): DestinoViaje {
    return this.destinos.filter((d) => { return d.id.toString() == id; })[0]
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }

  add(d: DestinoViaje) {
    const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
    const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d.nombre }, { headers: headers });
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if (data.status === 200) {
        this.store.dispatch(new NuevoDestinoAction(d));
      }
    });
  }

  elegir(d: DestinoViaje) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }
}
