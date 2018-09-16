import * as methods from './app.methods';
import { LineUpdateableTypes, UpdateStationType, TimetableCellUpdater } from './app.classes';
import { EditorTypes } from './app.reducer';

export const AddNewStationAction = () => ({ type: methods.ADD_NEW_STATION });

export const UpdateStationAction = (newState: UpdateStationType) => ({ type: methods.UPDATE_STATION, newState });

export const SetCurrentEditableItemAction = (newState: { id: string; type: EditorTypes; }) => ({ type: methods.SET_CURRENT_EDITABLE_ITEM, newState });

export const UpdateLineAction = (newState: LineUpdateableTypes) => ({ type: methods.UPDATE_LINE, newState });

export const UpdateTimetableCellAction = (newState: TimetableCellUpdater) => ({ type: methods.UPDATE_TIMETABLE_CELL, newState });
