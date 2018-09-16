import { Station } from './station';

export type ValidTypes = 'station' | 'speedup' | 'speeddown';

export type PlaceTypes = Station;

export type Places = Record<string, PlaceTypes>;

export class Place {
    public readonly type: ValidTypes;
    public readonly id: string;
    public name: string;
    public distanceFromStart: number = 0;
    public minutesFromStart: number = 0;
    public dwellTime: number = 5;

    protected constructor(type: ValidTypes, id: string, name: string) {
        this.type = type;
        this.id = id;
        this.name = name;
    }
}

