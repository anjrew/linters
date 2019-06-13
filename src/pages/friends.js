import React from 'react';
import axios from '../react_utils/axios';
import { Action } from '../react_utils/redux/actions';

// COMPONENTS
import { Wrap } from '../components/layout/wrap';
import { CSSTransition } from "react-transition-group";
import { Row } from '../components/layout/row';
import { Avatar } from '../components/graphics/avatar';
import { Column } from '../components/layout/column';

export class Friends extends React.Component{

    componentDidMount(){
        Action.receiveFriendsWannabes();
    }

    render(){
        return (
            <Column padding={'20px'}>
                <h2>These people want to be your friends</h2>
                <Wrap></Wrap>
                       
            </Column>
        );
    }
}