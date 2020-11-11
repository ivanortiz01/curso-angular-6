import { v4 as uuid } from 'uuid';

export class DestinoViaje {
    private selected: boolean;
    public servicios: string[];
    id = uuid();
    //public votes = 0;
    constructor(public nombre: string, public imagenUrl: string, public votes: number = 0) {
        this.servicios = ['pileta', 'desayuno'];
    }
    isSelected(): boolean {
        //console.log(this.selected);
        return this.selected;
    }

    setSelected(s: boolean) {
        this.selected = s;
    }

    voteUp(): any {
        this.votes++;
    }
    voteDown(): any {
        this.votes--;
    }
}
