import { Line } from './line';
import { Place } from './place';


export interface TimetableCellUpdater {
    col: number;
    row: number;
    value: number;
};

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
