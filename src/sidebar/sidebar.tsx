import * as React from 'react';
import './sidebar.scss';
import { SidebarHeader } from './sidebar-header/sidebar-header';
import { LineMap } from './line-map/line-map';

export const Sidebar = () => (
    <aside>
        <SidebarHeader />
        <div className="sidebar-content">
            <LineMap />
        </div>
    </aside>
);
