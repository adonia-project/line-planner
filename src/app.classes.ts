import * as cuid from 'cuid';
import { immutableSplice } from './app.helpers';

type ValidTypes = 'station' | 'speedup' | 'speeddown';
type Places = Record<string, PlaceTypes>;
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

export interface TimetableCellUpdater {
    col: number;
    row: number;
    value: number;
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

export type TimetableObject = {
    hoursFromStart: number;
    isValid: boolean;
    userModified: boolean;
};

export class Timetable {
    public table: Array<Array<TimetableObject>>;
    public stationNames: Array<string>;
    public width: number;

    constructor(line: Line, width: number = 1, table?: Array<Array<TimetableObject>>) {
        let currentLineOperatingSpeed = line.attributes.standardLineOperatingSpeed;
        let lastStationIndex = -1;

        this.stationNames = [];
        this.width = width;
        this.table = Array(width)
            .fill(0)
            .map((width, colCount) => {
                const startingTime = (table
                    && table[colCount]
                    && table[colCount][0]) ? table[colCount][0].hoursFromStart : colCount;

                return line
                    .getSortedList()
                    .reduce((timetable, place, rowCount, placeList) => {
                        if (place.type === 'station') {
                            const lastStation: Place = placeList[lastStationIndex] || <Place>{
                                dwellTime: 0,
                                distanceFromStart: 0,
                            };
                            const lastStationTimetable: TimetableObject = timetable[rowCount - 1] || <TimetableObject>{
                                hoursFromStart: 0,
                            };

                            let timetableObject = <TimetableObject>{
                                isValid: true,
                            };

                            const distanceFromLastStation = place.distanceFromStart - lastStation.distanceFromStart;
                            const timeBetweenStations = (distanceFromLastStation/currentLineOperatingSpeed)
                                + (lastStation.dwellTime/60);

                            if (table
                                && table[colCount]
                                && table[colCount][rowCount]
                                && table[colCount][rowCount].userModified
                                && table[colCount][rowCount].hoursFromStart
                            ) {
                                const { hoursFromStart, isValid } = table[colCount][rowCount];
                                timetableObject.hoursFromStart = hoursFromStart;
                                timetableObject.isValid = isValid;
                                timetableObject.userModified = true;
                            } else {
                                timetableObject.hoursFromStart = timeBetweenStations + lastStationTimetable.hoursFromStart;
                            }

                            // check if timestamp is valid
                            if (rowCount >= 1) {
                                if (timetableObject.hoursFromStart <= (timeBetweenStations + lastStationTimetable.hoursFromStart - (1/60))) {
                                    timetableObject.isValid = false;
                                }
                            }

                            this.stationNames[rowCount] = place.name;
                            timetable.push(timetableObject);

                            lastStationIndex = rowCount;
                        }

                        return timetable;
                    }, []);
            });
    }

    addNewRow() {

    }

}

export type PlaceTypes = Station;
