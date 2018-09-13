import * as methods from './app.methods';
import { Line, Timetable } from './app.classes';
import { updateLineImmutablyBy } from './app.helpers';

export type EditorTypes = 'station' | 'waypoint' | 'line';

export interface State {
    line: Line;
    timetable: Timetable,
    editorType: EditorTypes,
    currentEditableId: string,
};

const initialLine = new Line();

const initialState: State = {
    line: initialLine,
    timetable: new Timetable(initialLine, 1),
    currentEditableId: 'line',
    editorType: 'line',
};

export const app = (state = initialState, action: any) => {
    switch (action.type) {
        case methods.ADD_NEW_STATION:
            const nextLineA = updateLineImmutablyBy(state.line, 'insertStation');
            return {
                ...state,
                currentEditableId: Object.values(nextLineA.places)[0].id,
                editorType: 'station',
                line: nextLineA,
                timetable: new Timetable(nextLineA, state.timetable.width, state.timetable.table),
            };

        case methods.UPDATE_STATION:
            const nextLineB = updateLineImmutablyBy(state.line, 'updateStation', action.newState);
            return {
                ...state,
                line: nextLineB,
                timetable: new Timetable(nextLineB, state.timetable.width, state.timetable.table),
            };

        case methods.UPDATE_TIMETABLE_CELL:
            const { row, col, value } = action.newState;

            const table = state.timetable.table;
            table[col][row] = { isValid: true, hoursFromStart: value, userModified: true };

            return {
                ...state,
                timetable: new Timetable(state.line, state.timetable.width, table),
            };

        case methods.UPDATE_LINE:
            const nextLineC = updateLineImmutablyBy(state.line, 'updateDetails', action.newState);
            return {
                ...state,
                line: nextLineC,
                timetable: new Timetable(nextLineC, nextLineC.attributes.serviceCount, state.timetable.table),
            };

        case methods.SET_CURRENT_EDITABLE_ITEM:
            if (action.newState.id === state.currentEditableId) {
                return state;
            }

            return {
                ...state,
                editorType: action.newState.type,
                currentEditableId: action.newState.id,
            };

        default:
            return state;
    }
};

export default app;
