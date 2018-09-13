import * as React from 'react';
import './modify-line.scss';
import { LineMapItemWrapper } from '../line-map-item-wrapper/line-map-item-wrapper';
import { DispatchProps } from '../line-map';
import { State } from '../../../app.reducer';

type ModifyLineProps = DispatchProps & State & { selected: boolean };

export class ModifyLine extends React.Component<ModifyLineProps, {}> {
    render() {
        const { line: { name }, selected } = this.props;

        return (
            <LineMapItemWrapper
                selected={selected}
                onClick={() => this.props.setCurrentEditableItem({ type: 'line', id: 'line' })}
                type="edit-line"
                style="thick"
            >
                <div className="new-station-item">
                    <h4>{name || 'Untitled Line'}</h4>
                    <summary>Edit Line Details</summary>
                </div>
            </LineMapItemWrapper>
        );
    }
}
