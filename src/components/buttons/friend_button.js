import React, { useState, useEffect } from 'react';
import axios from '../../react_utils/axios';
import { CSSTransition } from 'react-transition-group';
import { socket } from '../../react_utils/socket';

// eslint-disable-next-line no-unused-vars
export function FriendButton(props) {
    const [status, setStatus] = useState('');
    console.log('The incoming Id prop is', props.id);
    console.log('the status property is ', status);

    useEffect(() => {
        if (!status && props.id) {
            // console.log('This inside the ajax call is ', this)
            axios.get(`/api/friend-button/${props.id}`).then(({ data })=>{
                setStatus(data);
            }).catch((e)=>{
                console.log('ERROR: ' + e);
            });       
        }   
    },[status, props]);

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
            buttontext = "Error";
            break;
    }

    async function onClick(){
        try {
            const reqData = { 
                status: status,
                id: props.id
            };
            console.log('trying to send data to post', reqData);
            const { data } = await axios.post('/api/friend-button', reqData);
            if ( status == 'noExistingRequest'){
                socket.emit('friendRequest',{ toUserId: props.id });
            }
            console.log('The return data is ' , data);
            setStatus(data);
        } catch (err) {
            console.log("Error from the database was", err);
        }
    }

    return (
        <CSSTransition key={buttontext} in={!!status} timeout={300} classNames="scale" unmountOnExit>
            <button style={{ margin: '10px '}} onClick={onClick}>{buttontext}</button>
        </CSSTransition>
    );
}



