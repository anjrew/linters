import React, { useState, useEffect } from 'react';
import axios from '../../react_utils/axios';
import { CSSTransition } from 'react-transition-group';

// eslint-disable-next-line no-unused-vars
export function FindButton(id) {
    const [status, setStatus] = useState();

    useEffect(() => {
        if (!status) {
            axios.get(`'/api/friend-button/${id}`).then(({ data })=>{
            }).catch((e)=>{
                console.log('ERROR: ' + e);
            });       
        }   
    },[status]);

    
    return (

        <React.Component>
            <CSSTransition key={'hello'} in={!status } timeout={300} classNames="scale" unmountOnExit>
                <h3 style={{ margin: '10px '}}>Status</h3>
            </CSSTransition>

            <CSSTransition key="no-matches" in={!!status} timeout={300} classNames="scale" unmountOnExit>
                <h3 style={{ margin: '10px '}}>No Status</h3>
            </CSSTransition>
        </React.Component>
    );
}



