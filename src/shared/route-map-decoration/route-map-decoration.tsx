import * as React from 'react';
import './route-map-decoration.scss';

interface RouteMapDecorationProps { type: string };

export class RouteMapDecoration extends React.Component<RouteMapDecorationProps> {
    generateBallDecoration(type: string) {
        switch (type){
            case 'add-station': {
                return (
                    <div className="route-ball-decoration plus">
                        +
                    </div>
                )
            }

            case 'station': {
                return (
                    <div className="route-ball-decoration normal" />
                )
            }

            case 'edit-line': {
                return (
                    <div className="route-ball-decoration grey" />
                )
            }

            default:
                return (<div />);
        }
    }

    render() {
        const { type } = this.props;

        return (
            <div className="route-ball-container">
                {this.generateBallDecoration(type)}
            </div>
        )
    }
}
