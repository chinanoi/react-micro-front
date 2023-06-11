import React, {ReactElement, InputHTMLAttributes, ChangeEvent, forwardRef} from 'react';
import './Input.scss';
import classNames from 'classnames';

type InputSize = 'lg' | 'sm' | 'default';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    size?: InputSize,
    disabled?: boolean;
    icon?: any;
    prepend?: string | ReactElement;
    apend?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    style?: React.CSSProperties;
}


const Input = forwardRef<HTMLInputElement, InputProps>((props,ref) => {
    
    const {
        size = 'default',
        disabled,
        icon,
        prepend,
        apend,
        style,
        ...restProps
    } = props;

    const prefixCls = 'baiyi-input-wrapper';

    const inputCls = classNames(prefixCls, {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || apend,
        'input-group-apend': !!apend,
        'input-group-preapend': !!prepend,
    });
    const fixControlledValue = (value: any) => {
        if (value === undefined || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }

    return (
        <div className={inputCls} style={style}>
            {prepend && <div className="input-group-preapend">{prepend}</div>}
            {icon && <div className="icon-wrapper">icon</div>}
            <input
                ref={ref}
                className="baiyi-input-inner"
                disabled={disabled}
                {...restProps}
            />
            {apend && <div className="input-group-apend">{apend}</div>}
        </div>
    );
})

export default Input;