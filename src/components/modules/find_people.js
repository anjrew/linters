import React, { useState, useEffect } from 'react';
import axios from '../../react_utils/axios';
import { CenteredColumn } from '../layout/centered_column';
import { CSSTransition } from 'react-transition-group';
import { CircularProgressIndicator } from '../progress_indicators/circular_progress_indicator';
import { Avatar } from '../graphics/avatar';
import { Row } from '../layout/row';



// eslint-disable-next-line no-unused-vars
export function FindPeople() {

    const [users, setUsers] = useState();
    const [searchVal, setSearchVal] = useState('');

    useEffect(() => {
        console.log('The users are ', users);
        console.log('And the search val is ',  searchVal);
        if (!users && !searchVal) {
            console.log('Getting the latest users');
            axios.get(`/api/users`).then(({ data })=>{
                console.log('The data from the databse is', data);
                setUsers(data);
            }).catch((e)=>{
                console.log('ERROR: ' + e);
            });
                    
        } else {
            if (searchVal) {
                console.log(`Trying to get users with search val ${searchVal}`);
                axios.get(`/api/users/${searchVal}`).then(({ data }) =>{
                    console.log('The data from the database is', data);
                    setUsers(data);
                }).catch((e)=>{
                    console.log('ERROR: ' + e);
                });  
            }
        }   
    },[searchVal]);

    
    const showCheckText = users ? users.length < 0 ? true : false : false;
    const showUsers = !showCheckText;

    const usersList = users ? (
        <CSSTransition key="users" in={showUsers} timeout={300} classNames="scale" unmountOnExit>
            <CenteredColumn width='100%'>
                {users && users.map(
                    user => (
                        <Row key={user.id}>
                            <Avatar imageUrl={user.pic_url}/>
                            <h2>{user.first}</h2>
                            {/* ... */}
                        </Row>
                    )
                )}
            </CenteredColumn>
        </CSSTransition>
    ): null;
    

    return (
        <CenteredColumn>
            <h2>Find people</h2>

            <CSSTransition key="checkNewPeople" in={showCheckText} timeout={300} classNames="scale" unmountOnExit>
                <h3>Check out the new people who have joined</h3>
            </CSSTransition>
            
            { !showUsers ? <CircularProgressIndicator /> : usersList}
         
            <input onChange={e => setSearchVal(e.target.value)} defaultValue={''} />
    
        </CenteredColumn>
    );
}



