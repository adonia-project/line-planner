import * as React from 'react';
import './timetable.scss';
import { connect } from 'react-redux';
import * as Reducer from '../app.reducer';
import * as actions from '../app.actions';
import { Dispatch } from 'redux';
import { convertDurationNumeralToHMSObj } from '../app.helpers';
import { TimetableCellUpdater } from '../app.classes';

export interface TimetableProps {
    updateTimetableCell: Function;
};


type State = {
    timetableUpdater: { value: string; row: number; col: number };
};

export class TimetableComponent extends React.Component<TimetableProps & Reducer.State, {}> {
    state: State;

    constructor(props: TimetableProps & Reducer.State) {
        super(props);

        this.state = {
            timetableUpdater: null,
        };
    }

    updateTime = (col: number, row: number, { target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        this.state.timetableUpdater = { value, row, col };

        this.setState({
            timeTableUpdater: this.state.timetableUpdater,
        });
    };

    updateTimeTable = () => {
        if (!this.state.timetableUpdater) {
            return;
        }

        const { row, col, value } = this.state.timetableUpdater;

        if (!value) {
            this.props.updateTimetableCell({
                row,
                col,
                value: null,
            });
        }

        const parseStringToHourValue = (strUnparsed: string) => {
            let time = 0;
            const str = strUnparsed.toUpperCase();

            if (str.includes('PM')) {
                time += 12;
            }

            if (str.includes(':')) {
                time += parseFloat(str.split(':')[1])/60;
            }

            if (!(str.includes('AM') && parseFloat(str) === 12)) {
                time += parseFloat(str);
            }

            return time;
        };

        const parsedValue = parseStringToHourValue(this.state.timetableUpdater.value);

        if (parsedValue) {
            const cellUpdater: TimetableCellUpdater = {
                row,
                col,
                value: parsedValue,
            };

            this.props.updateTimetableCell(cellUpdater);
        }

        this.setState({ timetableUpdater: null });
    };

    updateTimetableOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode == 13) {
            this.updateTimeTable();
        }
    };

    render() {
        const { timetable } = this.props;
        const { timetableUpdater } = this.state;
        return (
            <section className="timetable-container">
                <header>Timetable</header>
                <article className="timetable">
                    <div className="col head">
                        {timetable
                            .stationNames
                            .map((name = '', index) => (<div className="cell" key={index.toString()}>{name || 'Untitled Station'}</div>))}
                    </div>
                    {timetable
                        .table
                        .map((colVal, col) => {
                            return (
                                <div key={col.toString()} className="col">
                                    {colVal
                                        .map(({ hoursFromStart, isValid }, row) => {
                                            const { hours, minutes, d } = convertDurationNumeralToHMSObj(hoursFromStart);

                                            const parsedHMD = `${hours || 12}:${minutes.toString().padStart(2, '0')} ${d}`;
                                            const value = (timetableUpdater &&
                                                timetableUpdater.row === row &&
                                                timetableUpdater.col === col) ?
                                                    timetableUpdater.value : parsedHMD;

                                            return (
                                                <div
                                                    key={hoursFromStart}
                                                    className={`cell ${isValid ? 'valid' : 'invalid'}`}
                                                >
                                                    <input value={value} onBlur={this.updateTimeTable} onKeyDown={this.updateTimetableOnEnter} onChange={this.updateTime.bind(this, col, row)} />
                                                </div>
                                            );
                                        })}
                                </div>
                            )
                        })}
                </article>
            </section>
        );
    }
}

const mapStateToProps = ({ line, timetable }: Reducer.State) => ({ timetable, line });

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    updateTimetableCell: (value: TimetableCellUpdater) => dispatch(actions.UpdateTimetableCellAction(value)),
});

export const Timetable = connect<{}, {}, TimetableProps>(mapStateToProps, mapDispatchToProps)(TimetableComponent) as React.ComponentClass<{}>;
