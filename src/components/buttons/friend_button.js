import React, { useState, useEffect } from 'react';
import axios from '../../react_utils/axios';
import { CSSTransition } from 'react-transition-group';

// eslint-disable-next-line no-unused-vars
export function FindButton(id) {
    const [status, setStatus] = useState();

    useEffect(() => {
        if (!status) {
            axios.get(`'/api/friend-button/${id}`).then(({ data })=>{
                console.log(`The data from the /api/friend-button/${id} request was`, data);
                setStatus(data);
            }).catch((e)=>{
                console.log('ERROR: ' + e);
            });       
        }   
    },[status]);

    let buttontext;

    switch (status) {
                    case 'accepted': 
                        buttontext = "Unfriend";
                        break;
                    case 'cancelRequest': 
                        buttontext = "Cancel Friend Request";
                        break;
                    case 'acceptRequest': 
                        buttontext = "Accept Friend Request";
                        break;
                    case 'noExistingRequest': 
                        buttontext = "Send Friend Request";
                        break;
                    default:
                        break;
    }

    return (

        <CSSTransition key={buttontext} in={!!status} timeout={300} classNames="scale" unmountOnExit>
            <button style={{ margin: '10px '}}>buttontext</button>
        </CSSTransition>
    );
}



