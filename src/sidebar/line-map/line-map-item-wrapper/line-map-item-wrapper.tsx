import * as React from 'react';
import './line-map-item-wrapper.scss';
import { RouteMapDecoration } from '../../../shared/route-map-decoration/route-map-decoration';
import { MouseEventHandler, Ref } from 'react';

export interface LineMapItemWrapperProps {
    onClick?: MouseEventHandler<any>;
    type: string;
    ref?: Ref<HTMLButtonElement>;
    style: 'thick' | 'thin';
    selected?: boolean;
    id?: string;
};

export class LineMapItemWrapper extends React.Component<LineMapItemWrapperProps, {}> {
    render() {
        const { children, style, selected, type, onClick, id } = this.props;

        return (
            <button id={id} onClick={onClick} className={`${style} ${selected ? 'selected' : ''} line-map-item-wrapper`}>
                <RouteMapDecoration type={type} />
                <div className="line-map-item-wrapper-content">
                    {children}
                </div>
            </button>
        );
    }
}
