import * as React from 'react';
import './line-map-item.scss';

export interface LineMapItemProps { compiler: string; framework: string; }

export class LineMapItem extends React.Component<LineMapItemProps, {}> {
    render() {
        return (
            <aside>

            </aside>
        );
    }
}
