import * as React from 'react';
import './editor.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LineUpdateableTypes, UpdateStationType } from '../app.classes';
import * as Reducer  from '../app.reducer';
import * as actions from '../app.actions';
import { EditLine } from './edit-line/editor-line';
import { EditStation } from './edit-station/edit-station';

export type EditorProps = Reducer.State & {
    saveLine: Function,
    saveStation: Function,
};

export class EditorComponent extends React.Component<EditorProps, {}> {
    render() {
        const { editorType, currentEditableId } = this.props;

        switch (editorType) {
            case 'line':
                return (
                    <EditLine
                        save={this.props.saveLine}
                        {...this.props.line.exports}
                    />
                );
            case 'station':
                return (
                    <EditStation
                        save={this.props.saveStation}
                        index={this.props.line.order.findIndex(id => id === currentEditableId)}
                        station={this.props.line.places[currentEditableId]}
                    />
                );
            default:
                return null;
        }
    }
}

const mapStateToProps = (app: Reducer.State) => (app);

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    saveStation: (options: UpdateStationType) => dispatch(actions.UpdateStationAction(options)),
    saveLine: (options: LineUpdateableTypes) => dispatch(actions.UpdateLineAction(options)),
});

export const Editor = connect<{}, {}, EditorProps>(mapStateToProps, mapDispatchToProps)(EditorComponent) as React.ComponentClass<{}>;
