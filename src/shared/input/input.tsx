import * as React from 'react';
import './input.scss';

interface InputProps {
    className?: string;
    label?: string;
    placeholder?: string;
    value: string | number;
    onChange: any,
    type?: string;
    unit?: string;
    disabled?: boolean;
    style?: 'small' | 'default';
};

export class Input extends React.Component<InputProps> {
    render() {
        const {
            className = '',
            label,
            placeholder,
            onChange,
            type = 'text',
            style = 'default',
            disabled = false,
            unit,
            value,
        } = this.props;

        return (
            <div className={`input-container ${className} ${style}`}>
                { label && <label>{label}</label> }
                <div className="input">
                    <input placeholder={placeholder} value={value} disabled={disabled} type={type} onChange={onChange} />
                    { unit && <div className="unit">{unit}</div>}
                </div>
            </div>
        )
    }
}
