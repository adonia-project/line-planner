import { State } from './app.reducer';
import * as actions from './app.actions';

const keyMap: any = {
    38: ({ getState, dispatch }: any) => {
        const { currentEditableId, line }: State = getState();

        if (!line.length) {
            return;
        }

        if (currentEditableId === 'line') {
            return dispatch(actions.SetCurrentEditableItemAction({ id: line.order[line.length - 1], type: 'station' }));
        }

        const prevIndex = line.order.findIndex((id) => id === currentEditableId) - 1;

        if (prevIndex === -1) {
            return dispatch(actions.SetCurrentEditableItemAction({ id: 'line', type: 'line' }));
        }

        return dispatch(actions.SetCurrentEditableItemAction({ id: line.order[prevIndex], type: 'station' }));
    },
    40: ({ getState, dispatch }: any) => {
        const { currentEditableId, line }: State = getState();

        if (!line.length) {
            return;
        }

        if (currentEditableId === 'line') {
            return dispatch(actions.SetCurrentEditableItemAction({ id: line.order[0], type: 'station' }));
        }

        const nextIndex = line.order.findIndex((id) => id === currentEditableId) + 1;

        if (nextIndex === line.length) {
            return dispatch(actions.SetCurrentEditableItemAction({ id: 'line', type: 'line' }));
        }

        return dispatch(actions.SetCurrentEditableItemAction({ id: line.order[nextIndex], type: 'station' }));
    },
};

export const processKeyboardInput = (keyCode: number, store: any) => {
    return keyMap[keyCode] && (keyMap[keyCode](store));
};
