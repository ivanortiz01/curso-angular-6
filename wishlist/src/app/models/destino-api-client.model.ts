import { BehaviorSubject, Subject } from 'rxjs';
import { DestinoViaje } from './destino-viajes.model';

export class DestinoApiClient {
  destinos: DestinoViaje[];
  current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

  constructor() {
    this.destinos = [];
  }

  add(d: DestinoViaje) {
    this.destinos.push(d);
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }

  elegir(d: DestinoViaje) {
    this.destinos.forEach((x) => x.setSelected(false));
    d.setSelected(true);
    this.current.next(d);
  }

  subcribeOnChance(fn) {
    this.current.subscribe(fn);
  }
}
