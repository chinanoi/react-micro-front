import React from 'react';
import ReactDOM from 'react-dom/client';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';
import './index.less';
import './public-path'; // 设置运行时publicPath，以使得qiankun加载时找到微应用的路径

if (module && module.hot) {
    module.hot.accept();
}

const root = document.getElementById('root')!;

function render(props?: any) {
    ReactDOM.createRoot(props.container ? props.container.querySelector('#root') : document.getElementById('root')).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );

}
console.log('1111', 111111);
// @ts-ignore 111
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
    console.log('react app bootstraped');
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
    console.log('基座下发的能力：', props);
    render(props);
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
    console.log('unmountunmountunmount');
    unmountComponentAtNode(root);
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props: any) {
    console.log('update props', props);
}
