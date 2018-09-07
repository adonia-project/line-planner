import * as React from 'react';
import './logo.scss';

export interface LogoProps { showText?: boolean; }

export class Logo extends React.Component<LogoProps, {}> {
    render() {
        const { showText = false } = this.props;

        return (
            <div className="logo">
                <svg
                    width="16px"
                    height="21px"
                    viewBox="0 0 16 21"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="Group">
                        <rect id="Rectangle-2" fill="#2AC674" x="0" y="0" width="6" height="21" rx="2"></rect>
                        <rect id="Rectangle-2" fill="#2A73C6" x="10" y="0" width="6" height="21" rx="2"></rect>
                    </g>
                </svg>
                { showText && (
                    <div className="text">Line Planner</div>
                )}
            </div>
        );
    }
}
