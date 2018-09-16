import { Place } from './place';


export class Station extends Place {
    constructor(id: string, name: string) {
        super('station', id, name);
    }

    setDistanceFromStart(distance: number) {
        this.distanceFromStart = distance;
    }

    setName(name: string) {
        this.name = name;
    }
}

