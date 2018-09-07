import * as React from 'react';
import './app.scss';
import { Sidebar } from './sidebar/sidebar';
import { Editor } from './editor/editor';

export interface AppProps { compiler: string; framework: string; }

export class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <main>
                <Sidebar />
                <Editor/>
            </main>
        );
    }
}
