/**
 * Does the .splice() action immutably
 * @param {Array<any>} arr
 * @param {number} start
 * @param {number} deleteCount
 * @param items
 * @returns {any[]}
 */
import { Line } from './app.classes';

export const immutableSplice = (arr: Array<any>, start: number, deleteCount: number, ...items: Array<any>) => {
    return [ ...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount) ]
};

/**
 * Deletes an array immutably
 * @param {Array<any>} arr
 * @param {number} index
 * @returns {any[]}
 */
export const immutableDelete = (arr: Array<any>, index: number) => {
    return arr
        .slice(0, index)
        .concat(arr.slice(index + 1));
};

/**
 * Updates a line immutably
 * @param {Line} line
 * @param {string} method
 */
export const updateLineImmutablyBy = (line: Line, method: string, ...params: Array<any>) => {
    const { name, ...rest } = line.exports;
    const nextLine = new Line(name, ...Object.values(rest));

    nextLine[method](...params);

    return nextLine;
};

/**
 * Converts a duration in hours into a more parsable hours, minutes and AM/PM
 * @param {number} duration
 * @returns {{hours: number; minutes: number; d: string}}
 */
export const convertDurationNumeralToHMSObj = (duration: number) => {
    let hours = Math.floor(duration);
    const minutes = (Math.round((duration - hours)*60)*100)/100;
    const d = Math.floor(hours/12) % 2 === 0 ? 'AM' : 'PM';

    if (hours > 12) {
        hours = hours - (Math.floor(hours/12)*12);
    }

    return { hours, minutes, d };
};

/**
 * checks if inputted value is a number, else return another valid value, or 0
 * @param value
 * @param {number} oldValue
 */
export const validateAndReturnNumber = (value: any, oldValue?: number) => {
    const nextValue = parseFloat(value);

    if (!Number.isNaN(nextValue)) {
        return nextValue;
    }

    if (oldValue) {
        return oldValue;
    }

    return '';
};
