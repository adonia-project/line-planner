import * as React from 'react';
import './sidebar-header.scss';
import { Logo } from '../../shared/logo/logo';

export interface SidebarHeaderProps { }

export class SidebarHeader extends React.Component<SidebarHeaderProps, {}> {
    render() {
        return (
            <header>
                <Logo showText />
                <a href="http://adoniaproject.com" target="_blank" rel="noopener noreferrer" className="traditional">Adonia Project</a>
            </header>
        );
    }
}
