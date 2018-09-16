import * as cuid from 'cuid';
import { immutableSplice } from '../app.helpers';
import { Place, Places } from './place';
import { Station } from './station';

export interface UpdateStationType { stationId: string; name?: string, distanceFromStart?: number };

const DefaultLineAttributes = {
    standardLineOperatingSpeed: 55,
    serviceCount: 1,
};

export const lineAttributeData: { [key: string]: { name: string, unit?: string }; } = {
    standardLineOperatingSpeed: { name: 'Standard Line Operating Speed', unit: 'km/h' },
    serviceCount: { name: 'Service Count' },
};

export type LineAttributes = typeof DefaultLineAttributes;
export interface LineExports {
    name: string;
    places: Places;
    order: Array<string>;
    attributes: LineAttributes;
};

export interface LineUpdateableTypes {
    name: string;
    attributes: LineAttributes;
};

export class Line {
    readonly initialized: boolean;
    name: string;
    places: Places;
    order: Array<string>;
    length: number;
    attributes: LineAttributes;
    [key: string]: any;

    constructor(name: string = '', places: Places = {}, order: Array<string> = [], attributes: LineAttributes = DefaultLineAttributes) {
        this.name = name;
        this.places = places;
        this.order = order;
        this.initialized = true;
        this.attributes = attributes;
        this.length = order.length;
    }

    updateStation({ stationId, name, distanceFromStart }: UpdateStationType) {
        if (name) {
            this.places[stationId].setName(name);
        }

        if (distanceFromStart) {
            this.places[stationId].setDistanceFromStart(distanceFromStart);
        }
    }

    insertStation(name: string = '', index: number = this.order.length) {
        const newStationId = cuid();
        const newStation = new Station(newStationId, name);
        const lastStationId = this.order[index - 1];

        if (lastStationId) {
            const lastStation = this.places[lastStationId];
            newStation.distanceFromStart = lastStation.distanceFromStart + 1;
        }

        this.places = {
            [newStationId]: newStation,
            ...this.places,
        };

        const insertAt = index > this.order.length ? this.order.length : index;
        this.order = immutableSplice(this.order, insertAt, 0, newStationId);
        this.length = this.length + 1;
    }

    removeStation(stationId: string) {
        const { [stationId]: oldStation, ...nextPlaces } = this.places;

        this.places = nextPlaces;
        this.order = this.order
            .filter(id => id === stationId);
        this.length = this.length - 1;
    }

    getSortedList(): Array<Place> {
        return this.order.map(id => this.places[id]);
    }

    updateDetails = ({ name, attributes }: LineUpdateableTypes) => {
        this.name = name;
        this.attributes = attributes;
    };

    get exports(): LineExports {
        return {
            name: this.name,
            places: this.places,
            order: this.order,
            attributes: this.attributes,
        };
    }
}
