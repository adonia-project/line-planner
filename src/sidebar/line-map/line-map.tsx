import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './line-map.scss';

import * as actions from '../../app.actions';
import { Line, PlaceTypes } from '../../app.classes';
import { LineMapItem } from './line-map-item/line-map-item';
import { EditorTypes, State } from '../../app.reducer';
import { AddStation } from './add-station/add-station';
import { ModifyLine } from './modify-line/modify-line';
import { convertDurationNumeralToHMSObj } from '../../app.helpers';
import { type } from 'os';

export interface DispatchProps { addNewStation: any, setCurrentEditableItem: any };
export type LineMapProps = DispatchProps & State & { id: string };

const initialState = { lineDecorationHeight: 92 };
type LineMapState = Readonly<typeof initialState>;

class LineMapComponent extends React.Component<LineMapProps> {
    state: LineMapState;

    constructor(props: LineMapProps) {
        super(props);

        this.state = {
            lineDecorationHeight: 92
        };
    }

    componentDidUpdate(lastProps: LineMapProps) {
        this.updateLineDecorationHeight(lastProps);
    }

    updateLineDecorationHeight(lastProps: LineMapProps) {
        if (lastProps.line.length === this.props.line.length) {
            return;
        }

        const el = document.getElementById('add-station').getElementsByClassName('route-ball-decoration')[0];
        this.setState({ lineDecorationHeight: el.getBoundingClientRect().top - 200 });

        return;
    }

    generateLineDecoration() {
        const { line } = this.props;

        if (line.length < 1) {
            return;
        }

        return <div className="line-decoration" style={{ height: this.state.lineDecorationHeight }} />
    }

    render() {
        const { line, currentEditableId } = this.props;
        const { standardLineOperatingSpeed } = line.attributes;
        let lastStationIndex = 0;

        return (
            <article>
                <ModifyLine selected={currentEditableId === 'line'} {...this.props} />
                {this.generateLineDecoration()}
                {line
                    .getSortedList()
                    .map((place: PlaceTypes, index, places) => {
                        let stats = {
                            distanceFromLastStation: 0,
                            timeFromLastStation: '0 minutes',
                        };


                        if (place.type === 'station' && index > 0) {
                            const lastStation = places[lastStationIndex];
                            const thisStation = place;

                            const distanceFromLastStation = thisStation.distanceFromStart
                                - lastStation.distanceFromStart;

                            const { hours, minutes } =
                                convertDurationNumeralToHMSObj(
                                    (distanceFromLastStation/standardLineOperatingSpeed)
                                    + (lastStation.dwellTime/60));

                            stats = {
                                distanceFromLastStation,
                                timeFromLastStation: `${hours > 1 ? `${hours} hours and ` : ''}${minutes} minutes`,
                            };

                            lastStationIndex = index;
                        }

                        return (
                            <LineMapItem
                                selected={place.id === currentEditableId}
                                key={place.id}
                                place={place}
                                setCurrentEditableItem={this.props.setCurrentEditableItem}
                                stats={stats}
                            />
                        );
                    })
                }
                <AddStation id="add-station" {...this.props} />
            </article>
        );
    }
}

const mapStateToProps = ({ line, currentEditableId }: State) => ({ currentEditableId, line });

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    addNewStation: (line: Line) => dispatch(actions.AddNewStationAction()),
    setCurrentEditableItem: (options: { id: string; type: EditorTypes }) => dispatch(actions.SetCurrentEditableItemAction(options)),
});

export const LineMap = connect<{}, {}, LineMapProps>(mapStateToProps, mapDispatchToProps)(LineMapComponent) as React.ComponentClass<{}>;
