import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import logger from 'redux-logger'

import './app.scss';
import reducer from './app.reducer';
import { Sidebar } from './sidebar/sidebar';
import { Editor } from './editor/editor';
import { Timetable } from './timetable/timetable';

const store = createStore(
    reducer,
    applyMiddleware(logger, thunkMiddleware),
);


export interface AppProps { compiler: string; framework: string; }

export class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <Provider store={store}>
                <main>
                    <Sidebar />
                    <Editor/>
                    <Timetable/>
                </main>
            </Provider>
        );
    }
}
