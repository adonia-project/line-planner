import * as React from 'react';
import './sidebar.scss';
import { SidebarHeader } from './sidebar-header/sidebar-header';
import { LineMap } from './line-map/line-map';

export interface SidebarProps { }

export class Sidebar extends React.Component<SidebarProps, {}> {
    render() {
        return (
            <aside>
                <SidebarHeader />
                <div className="sidebar-content">
                    <LineMap />
                </div>
            </aside>
        );
    }
}
