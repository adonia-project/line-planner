import * as React from 'react';
import './line-map-item.scss';
import { PlaceTypes } from '../../../app.classes';
import { LineMapItemWrapper } from '../line-map-item-wrapper/line-map-item-wrapper';

interface LineMapItemProps {
    place: PlaceTypes;
    selected: boolean;
    setCurrentEditableItem: Function;
    stats: {
        distanceFromLastStation?: number;
        timeFromLastStation?: string;
    };
};

export class LineMapItem extends React.Component<LineMapItemProps> {
    render() {
        const { place: { type, id, ...place }, selected } = this.props;

        if (type === 'station') {
            const { name, distanceFromStart } = place;
            const { distanceFromLastStation, timeFromLastStation } = this.props.stats;

            return (
                <LineMapItemWrapper
                    selected={selected}
                    type={type}
                    style="thick"
                    onClick={() => this.props.setCurrentEditableItem({ type, id })}
                >
                    <div className="station line-map-item">
                        <div className="station-item-content">
                            <h4>{name || 'Untitled Station'}</h4>
                            <div>
                                <summary>{distanceFromLastStation} km from last stop</summary>
                                <summary>{timeFromLastStation} from last stop</summary>
                            </div>
                        </div>
                        <div className="line-map-item-distance-marker">{distanceFromStart} km</div>
                    </div>

                </LineMapItemWrapper>
            );
        }

        return null;
    }
}
