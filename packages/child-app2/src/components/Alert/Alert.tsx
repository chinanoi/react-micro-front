import React from 'react';
import './Alert.scss';
import classNames from 'classnames'
import CSSMotion from 'rc-motion';
import CloseOutlined from '@ant-design/icons/CloseOutlined';


type AlertType = 'success' | 'info' | 'warning' | 'error'

interface IAlertProps {
    type?: AlertType,
    message?: string;
    style?: React.CSSProperties;
    className?: string;
    closable?: boolean;
    afterClose?: () => void;
    closeIcon?: React.ReactNode;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

interface CloseIconProps {
    isClosable: boolean;
    closeIcon: IAlertProps['closeIcon'];
    handleClose: IAlertProps['onClose'];
}


const CloseIcon: React.FC<CloseIconProps> = (props) => {
    const {isClosable, closeIcon, handleClose} = props;
    return isClosable ? (
        <button type="button" onClick={handleClose} className={'lion-alert-close-icon'} tabIndex={0}>
            {closeIcon}
        </button>
    ) : null;
};


const Alert = (props: IAlertProps) => {

    const [closed, setClosed] = React.useState(false);
    const ref = React.useRef<HTMLElement>();

    const {
        type = 'info',
        message,
        afterClose,
        closeIcon = <CloseOutlined />,
        closable,
        style
    } = props;


    const prefixCls = 'lion-alert';

    const alertCls = classNames(
        prefixCls,
        `${prefixCls}-${type}`
    )

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        setClosed(true);
        props.onClose?.(e);
    };
    
    return (
        <CSSMotion
            visible={!closed}
            motionName={`${prefixCls}-motion`}
            motionAppear={false}
            motionEnter={false}
            onLeaveStart={(node) => ({
                maxHeight: node.offsetHeight,
            })}
            onLeaveEnd={afterClose}
        >
            {({className: motionClassName, style: motionStyle}) => (
                <div
                    className={classNames(alertCls, motionClassName)}
                    style={{...style, ...motionStyle}}
                    role="alert"
                >
                    <div className="lion-alert-content">{message}</div>
                    <CloseIcon
                        isClosable={!!closable}
                        handleClose={handleClose}
                        closeIcon={closeIcon}
                    />
                </div>
            )}
     </CSSMotion>
    );
};

export default Alert;