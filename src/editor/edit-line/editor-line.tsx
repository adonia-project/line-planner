import * as React from 'react';
import './editor-line.scss';
import { debounce } from 'throttle-debounce';
import { lineAttributeData, LineAttributes, LineExports } from '../../app.classes';
import { Input } from '../../shared/input/input';
import { EditorHeader } from '../editor-header/editor-header';
import { EditorWrapper } from '../editor-wrapper/editor-wrapper';
import { validateAndReturnNumber } from '../../app.helpers';

const initalState: { lineName: string; attributes: LineAttributes; } = {
    lineName: '',
    attributes: null,
};

type State = Readonly<typeof initalState>;
type EditLineProps = LineExports & {
    save: Function,
};

export class EditLine extends React.Component<EditLineProps, {}> {
    state: State;
    hotSave = debounce(300, () => {
        this.save();
    });

    constructor(props: EditLineProps) {
        super(props);

        this.state = {
            ...initalState,
            lineName: props.name,
            attributes: props.attributes,
        };
    }

    updateAttribute = (type: string, { target: { value: uncheckedValue } }: React.ChangeEvent<HTMLInputElement>): void => {
        const value = validateAndReturnNumber(uncheckedValue);

        this.hotSave();
        this.setState({ attributes: {
            ...this.state.attributes,
            [type]: value,
        }});
    };

    updateLineName = ({ target: { value: lineName } }: React.ChangeEvent<HTMLInputElement>): void => {
        this.hotSave();
        this.setState({ lineName });
    };

    save = () => {
        const {
            lineName,
            attributes,
        } = this.state;

        const toSave = {
            name: lineName,
            attributes,
        };

        this.props.save(toSave);
    };

    render() {
        const { lineName, attributes } = this.state;

        return (
            <EditorWrapper>
                <EditorHeader type="line"/>
                <article>
                    <Input
                        label="Line Name"
                        value={lineName}
                        placeholder="Untitled Line"
                        onChange={this.updateLineName}
                    />
                    { Object.entries(attributes)
                        .map(([attributeName, attributeVal]) => (
                            <Input
                                key={attributeName}
                                label={lineAttributeData[attributeName].name}
                                value={attributeVal}
                                onChange={this.updateAttribute.bind(this, attributeName)}
                                style="small"
                                unit={lineAttributeData[attributeName].unit}
                            />
                        ))}
                </article>
            </EditorWrapper>
        );
    }
}
