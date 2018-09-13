import * as React from 'react';
import './add-station.scss';
import { LineMapItemWrapper } from '../line-map-item-wrapper/line-map-item-wrapper';
import { LineMapProps } from '../line-map';

export class AddStation extends React.Component<LineMapProps, {}> {
    render() {
        const { id } = this.props;

        return (
            <LineMapItemWrapper id={id} onClick={this.props.addNewStation} type="add-station" style="thick">
                <div className="new-station-item">
                    <h4>New Station</h4>
                    <summary>Add a new station to this line</summary>
                </div>
            </LineMapItemWrapper>
        );
    }
}
