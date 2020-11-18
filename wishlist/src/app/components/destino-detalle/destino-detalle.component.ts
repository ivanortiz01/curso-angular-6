import { Component, OnInit, InjectionToken, Inject, Injectable } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viajes.model';
import { ActivatedRoute } from '@angular/router';
import { DestinoApiClient } from '../../models/destino-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';

class DestinosApiClientViejo{
  getById(id: String): DestinoViaje {
    console.log('llamado clase vieja');
    return null;
  }
}

interface AppConfig {
  apiEndPoint: String;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndPoint: 'mi_api.com'
};

const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// @Injectable()
// class DestinosApiClientDecorated extends DestinoApiClient {
//   constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>) {
//    super(store); 
//   }
//   getById(id: String): DestinoViaje {
//     console.log('llamando por la clase decorada');
//     console.log('config: '+ this.config.apiEndPoint);
//     return super.getById(id);
//   }
// }

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
    {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    // {provide: DestinoApiClient, useClass: DestinosApiClientDecorated},
    {provide: DestinosApiClientViejo, useExisting: DestinoApiClient}],
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClientViejo) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id);
  }

}
