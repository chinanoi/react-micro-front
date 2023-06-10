import React, {
    ReactElement,
    useRef,
    useEffect,
    useState,
    KeyboardEvent,
    ChangeEvent
} from 'react';
import './AutoComplate.scss';
import classNames from 'classnames';
import Input, {InputProps} from '../Input/Input';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import CSSMotion from 'rc-motion';

interface DataSource {
    value: string;
}


export type DataSourceType<T = {}> = T & DataSource;

export interface AutoComplateProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
    /**
    * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
    * type DataSourceType<T = {}> = T & DataSource
    */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    // 点击选中建议项时触发的回调
    onSelect?: (item: DataSourceType) => void;
    // 输入框改变时触发事件
    onChange?: (value: string) => void;
    // 支持自定义渲染下拉项，返回 ReactElement
    renderOption?: (item: DataSourceType) => ReactElement;
}


const AutoComplate = (props: AutoComplateProps) => {

    const {
        fetchSuggestions,
        onSelect,
        onChange,
        renderOption,
        value,
        style,
        ...restProps
    } = props;

    const [inputValue, setInputValue] = useState(value as string);
    const [suggestions, setSugestions] = useState<DataSourceType[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeIndex, setActivetIndex] = useState(-1);
    const triggerSearch = useRef(false);
    const componentRef = useRef<HTMLDivElement>(null);
    const debouncedValue = useDebounce(inputValue, 300);
    useClickOutside(componentRef, () => {
        setShowDropdown(false)
        setSugestions([]);
    });

    const prefixCls = 'baiyi-auto-complete';

    const active = (index: number) => {
        if (index < 0) index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setActivetIndex(index);
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        console.log('triggered the value', value);
        setInputValue(value);
        if (onChange) {
            onChange(value);
        }
        triggerSearch.current = true;
    };
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                if (suggestions[activeIndex]) {
                    handleSelect(suggestions[activeIndex]);
                }
                break;
            case 38:
                active(activeIndex - 1);
                break;
            case 40:
                active(activeIndex + 1);
                break;
            case 27:
                setShowDropdown(false);
                break;
            default:
                break;
        }
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    }

    const generateDropdown = () => {
        return (
            // <Transition
            //     in={showDropdown || loading}
            //     animation="zoom-in-top"
            //     timeout={300}
            //     onExited={() => {setSugestions([]);}}
            // >
            //     <ul className="viking-suggestion-list">
            //         {loading &&
            //             <div className="suggstions-loading-icon">
            //                 <Icon icon="spinner" spin />
            //             </div>
            //         }
            //         {suggestions.map((item, index) => {
            //             const cnames = classNames('suggestion-item', {
            //                 'is-active': index === highlightIndex
            //             });
            //             return (
            //                 <li key={index} className={cnames} onClick={() => handleSelect(item)}>
            //                     {renderTemplate(item)}
            //                 </li>
            //             );
            //         })}
            //     </ul>
            // </Transition>
            <CSSMotion
                visible={(showDropdown || loading)}
                motionName="suggestion-list-motion"
                onLeaveStart={(node) => ({
                    maxHeight: node.offsetHeight,
                })}
            >
                {({className: motionClassName, style: motionStyle}) => (
                    <ul className={classNames('baiyi-suggestion-list', motionClassName)}
                        style={{...style, ...motionStyle}}>
                     {loading &&
                         <div className="suggstions-loading-icon">
                            {/* <Icon icon="spinner" spin /> */}
                            loading
                         </div>
                     }
                     {suggestions.map((item, index) => {
                         const cnames = classNames('suggestion-item', {
                             'is-active': index === activeIndex
                         });
                         return (
                             <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                                 {renderTemplate(item)}
                             </li>
                         );
                     })}
                 </ul>
                )}
            </CSSMotion>
        );
    }

    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            setSugestions([]);
            const results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(data => {
                    setLoading(false);
                    setSugestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            } else {
                setSugestions(results);
                setShowDropdown(true);
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        } else {
            setShowDropdown(false);
        }
        setActivetIndex(-1);
    }, [debouncedValue, fetchSuggestions]);

    return (
        <div className={prefixCls} style={style} ref={componentRef}>
            <Input
                {...restProps}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            {generateDropdown()}
        </div>
    );
};

export default AutoComplate;