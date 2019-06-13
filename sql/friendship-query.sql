SELECT * FROM friendships                                                                                                                                    
WHERE accepted = true                                                                                                                                                       
AND (sender_id=1 OR reciever_id=1 );