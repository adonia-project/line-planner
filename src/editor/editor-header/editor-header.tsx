import * as React from 'react';
import './editor-header.scss';

export interface EditHeaderProps { type: string }

export class EditorHeader extends React.Component<EditHeaderProps, {}> {
    setEditorTitle = (type: string) => {
        switch(type) {
            case 'station':
                return 'Editing Station';
            case 'line':
                return 'Editing Line';
            default:
                return 'Editor';
        }
    };

    render() {
        const { type } = this.props;

        return (
            <header>
                {this.setEditorTitle(type)}
            </header>
        );
    }
}
