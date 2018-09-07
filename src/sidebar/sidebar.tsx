import * as React from 'react';
import './sidebar.scss';
import { SidebarHeader } from './sidebar-header/sidebar-header';

export interface SidebarProps { }

export class Sidebar extends React.Component<SidebarProps, {}> {
    render() {
        return (
            <aside>
                <SidebarHeader />
            </aside>
        );
    }
}
