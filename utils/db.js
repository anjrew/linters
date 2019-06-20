
const spicedPg = require('spiced-pg');
const relation = 'nerd-network';
const print = require('../utils/print');


// process.env.NODE_ENV === "production" ? secrets = process.env : secrets = require('./secrets');
const dbUrl = process.env.DATABASE_URL || `postgres:postgres:postgres@localhost:5432/${relation}`;
const db = spicedPg(dbUrl);

module.exports.ids = {
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password'
};

module.exports.db = {

    getHashedPWord: function (email) {
        return db.query(`
            SELECT password
            FROM users 
            WHERE $1 = email; 
            `,
        [email]
        );
    },

    addUser: function (first, last, email, password) {
        return db.query(`
                INSERT INTO users(first, last, email, password) 
                VALUES ($1, $2, $3, $4)
                RETURNING id, first, last email;
                `,
        [first, last, email, password]
        );
    },

    insertImg: async function (userId, url) {
        return db.query(
            `UPDATE users
            SET pic_url=$2
            WHERE id=$1
            RETURNING pic_url;`,
            [userId, url],
        );
    },

    updateBio: async function (userId, bio) {
        return db.query(
            `
            UPDATE users
            SET bio=$2
            WHERE id=$1
            RETURNING *;`,
            [userId, bio],
        );
    },

    findUserEmail: function (email) {
        return db.query(
            `
			SELECT users.id, first, last, email, bio, pic_url, created_at
            FROM users
            WHERE email=$1;
            `,
            [email]
        );
    },
    
    findUserId: async function (id) {
        print.props(`User id in db is `, id);
        return db.query(
            `
            SELECT id, first, last, email, bio, pic_url, created_at
            FROM users
            WHERE id=$1;
            `,
            [id]
        );
    },

    findUsersQuery: function (query) {
        return db.query(
            `
            SELECT * 
            FROM users 
            WHERE first ILIKE $1;
            `,
            [query + '%']
        );
    },

    findLastestUsers: function (amount) {
        amount = Number(amount);
        return db.query(
            `
            SELECT * 
            FROM users 
            ORDER BY id DESC
            LIMIT $1;
            `,
            [amount]
        );
    },

    getRelationship: function (currentUserId, otheruserId) {
        return db.query(
            `
            SELECT * 
            FROM friendships 
            WHERE (sender_id =$1 AND reciever_id = $2)
            OR (sender_id =$2 AND reciever_id = $1);
            `,
            [currentUserId, otheruserId]
        );
    },

    addFriendRequest: function (currentUserId, otheruserId) { 
        return db.query(
            `
            INSERT INTO friendships(sender_id, reciever_id) 
            VALUES ($1, $2)
            RETURNING id, sender_id, reciever_id, accepted;
            `,
            [currentUserId, otheruserId]
        );
    },

    acceptFriendRequest: function (currentUserId, otheruserId) { 
        return db.query(
            `
            UPDATE friendships
            SET accepted=$3
			WHERE (sender_id =$2 AND reciever_id = $1)
			OR (reciever_id =$2 AND sender_id = $1)
            RETURNING id, sender_id, reciever_id, accepted;
            `,
            [currentUserId, otheruserId, true]
        );
    },

    unfriendReject: function (currentUserId, otheruserId) { 
        return db.query(
            `
            DELETE FROM friendships
            WHERE (sender_id =$1 AND reciever_id = $2)
			OR (reciever_id =$1 AND sender_id = $2);
            `,
            [currentUserId, otheruserId]
        );
    },
	
    getFriends: function(id){ 
        return db.query( 
            `
			SELECT users.id, first, last, email, bio, pic_url, created_at, accepted
			FROM friendships
			JOIN users
			ON (accepted = false AND reciever_id = $1 AND sender_id = users.id)
			OR (accepted = true AND reciever_id = $1 AND sender_id = users.id)
			OR (accepted = true AND sender_id = $1 AND reciever_id = users.id);
		`,
            [id]);
    },	
	
    // CHAT
    getChat: function(){
        return db.query( 
            `
			SELECT 
				chat_messages.id, 
				CONCAT(users.first, ' ' ,users.last) AS name, 
				chat_messages.user_id, 
				chat_messages.created_at, 
				pic_url,
				message
			FROM chat_messages
			JOIN users
			ON chat_messages.user_id = users.id
			ORDER BY id DESC
			LIMIT 10;
			`
        );
    },
	
    getMoreChat: function( startingId ){
        return db.query( 
            `
			SELECT 
				chat_messages.id, 
				CONCAT(users.first, ' ' ,users.last) AS name, 
				chat_messages.user_id, 
				chat_messages.created_at, 
				pic_url,
				message
			FROM chat_messages
			JOIN users
			ON chat_messages.user_id = users.id
			WHERE chat_messages.id < $1
			ORDER BY id DESC
			LIMIT 10;
			`,
            [ startingId ]
        );
    },
	
    getChatMessageById: function(chatMessageId){
        return db.query( 
            `
			SELECT 
				chat_messages.id, 
				CONCAT(users.first, ' ' ,users.last) AS name, 
				chat_messages.user_id, 
				chat_messages.created_at, 
				pic_url,
				message
			FROM chat_messages
			JOIN users
			ON chat_messages.user_id = users.id
			WHERE chat_messages.id=$1;
			`,
            [ chatMessageId ] 
        );
    },
	
    saveChatMessage: function(message, userId){
        return db.query( 
            `
			INSERT INTO chat_messages(message, user_id)
			VALUES ($1, $2)
			RETURNING *;
			`,
            [ message, userId ]
        );
    },
    getUserById: function(userId){
        return db.query(
            `
            SELECT users.id, first, last, email, bio, pic_url, created_at 
            FROM users 
            WHERE id =$1;
            `,
            [userId]
        );
    },
	
    /// Private messages
    savePrivateMessage: function(message, sender_id, receiver_id) {
        return db.query(
            `
			INSERT INTO private_messages (message, sender_id, receiver_id)
			VALUES ($1,$2, $3)
			RETURNING *
		`,
            [message, sender_id, receiver_id]
        );
    },
	
    getPrivateMessages: function(sender_id, receiver_id) {
        return db.query(
            `
			SELECT * 
			FROM private_messages
			WHERE (sender_id=$1 AND receiver_id =$2)
			OR (sender_id=$2 AND receiver_id =$3)
			`,
            [sender_id, receiver_id]
        );
    },
	
    // getAllPrivateMessages: function(userId) {
    //     return db.query(
    //         `
    // 		SELECT * 
    // 		FROM private_messages
    // 		WHERE sender_id=$1  
    // 		OR receiver_id =$1
    // 		`,
    //         [userId]
    //     );
    // }
    getAllPrivateMessages: function(userId) {
        return db.query(
            `
			SELECT 
				private_messages.id, 
				private_messages.sender_id, 
				private_messages.receiver_id,
				private_messages.created_at,
				private_messages.message,
				users.first,
				users.last,
				users.email,
				users.bio,
				users.pic_url
			FROM private_messages
			JOIN users ON 
			private_messages.sender_id = users.id
			WHERE private_messages.sender_id=$1  
			OR private_messages.receiver_id =$1
			ORDER BY private_messages.id ASC;
			`,
            [userId]
        );
    },
    getPrivateMessageId: function(id) {
        return db.query(
            `
			SELECT 
				private_messages.id, 
				private_messages.sender_id, 
				private_messages.receiver_id,
				private_messages.created_at,
				private_messages.message,
				users.first,
				users.last,
				users.email,
				users.bio,
				users.pic_url
			FROM private_messages
			JOIN users ON 
			private_messages.sender_id = users.id
			WHERE private_messages.id=$1;
			`,
            [id]
        );
    }
};



