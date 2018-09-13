import * as React from 'react';
import './edit-station.scss';
import { LineExports, Station } from '../../app.classes';
import { Input } from '../../shared/input/input';
import { EditorHeader } from '../editor-header/editor-header';
import { EditorWrapper } from '../editor-wrapper/editor-wrapper';
import { validateAndReturnNumber } from '../../app.helpers';
import { debounce } from 'throttle-debounce';

const initalState = {
    stationName: '',
    distanceFromStart: 0,
    dwellTime: 0,
};

type State = Readonly<typeof initalState>;
type EditStaionProps = {
    station: Station;
    save: Function;
    index: number;
};

export class EditStation extends React.Component<EditStaionProps, {}> {
    state: State;
    hotSave = debounce(300, () => {
        this.save();
    });

    constructor(props: EditStaionProps) {
        super(props);

        this.state = {
            ...initalState,
            stationName: props.station.name || '',
            distanceFromStart: props.station.distanceFromStart,
            dwellTime: props.station.dwellTime,
        };
    }

    componentDidUpdate(prevProps: EditStaionProps) {
        if (prevProps.station.id !== this.props.station.id) {
            this.setState({
                stationName: this.props.station.name || '',
                distanceFromStart: this.props.station.distanceFromStart,
                dwellTime: this.props.station.dwellTime,
            });
        }
    }


    updateDistanceFromStart = ({ target: { value: distanceFromStart } }: React.ChangeEvent<HTMLInputElement>): void => {
        this.hotSave();
        this.setState({ distanceFromStart });
    };

    updateDwellTime = ({ target: { value: unformattedDwellTime } }: React.ChangeEvent<HTMLInputElement>): void => {
        const dwellTime = validateAndReturnNumber(unformattedDwellTime);
        this.hotSave();
        this.setState({ dwellTime });
    };

    updateLineName = ({ target: { value: stationName } }: React.ChangeEvent<HTMLInputElement>): void => {
        this.hotSave();
        this.setState({ stationName });
    };

    save = () => {
        const {
            stationName,
            distanceFromStart,
            dwellTime,
        } = this.state;

        const toSave = {
            stationId: this.props.station.id,
            name: stationName,
            distanceFromStart: validateAndReturnNumber(distanceFromStart) || this.props.station.distanceFromStart,
            dwellTime,
        };

        this.props.save(toSave);
    };

    render() {
        const { index } = this.props;
        const { stationName, distanceFromStart, dwellTime } = this.state;

        return (
            <EditorWrapper>
                <EditorHeader type="line"/>
                <article>
                    <Input
                        label="Station Name"
                        value={stationName}
                        placeholder="Untitled Station"
                        onChange={this.updateLineName}
                    />
                    { index > 0 && (
                        <Input
                            label="Distance from Starting Station"
                            value={distanceFromStart}
                            onChange={this.updateDistanceFromStart}
                            style="small"
                            unit="km"
                        />
                    )}
                    <Input
                        label="Default Dwell Time"
                        value={dwellTime}
                        onChange={this.updateDwellTime}
                        style="small"
                        unit="minutes"
                    />
                </article>
            </EditorWrapper>
        );
    }
}
