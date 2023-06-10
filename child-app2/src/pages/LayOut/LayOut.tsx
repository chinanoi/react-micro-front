import React from 'react';
import {Outlet, Link} from 'react-router-dom';
import './LayOut.less';
import {useSelector} from 'react-redux';
import {globalState} from '../../app/globalReducer';
import Alert2 from '../../components/Alert';
import Input2 from '../../components/Input';
import {Input} from 'antd';
import AutoComplate from '../../components/AutoComplate';

const lakersWithNumber = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0},
] 

const Home = () => {
    const {count} = useSelector(globalState);
    console.log('count', count);
    const handleFetch = (query: string) => {
        return lakersWithNumber.filter(player => player.value.includes(query));
    }
    return (
        <div className="homeBox">
            <AutoComplate fetchSuggestions={handleFetch} />
            <Alert2
                message="1111"
                type="error"
                closable
            />
            {/*
            <Input2 size="sm" />
            <Input2 />
            <Input2 size="lg" />
            <Input size="small" />
            <Input size="middle" />
            <Input size="large" /> */}
        </div>
    );
};

export default Home;