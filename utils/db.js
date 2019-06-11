
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
            `UPDATE users
            SET bio=$2
            WHERE id=$1
            RETURNING *;`,
            [userId, bio],
        );
    },

    findUserEmail: function (email) {
        return db.query(
            `SELECT users.id, first, last, email, bio, pic_url, created_at
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
            SELECT users.id, first, last, email, bio, pic_url, created_at
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
            LIMIT $1
            `,
            [amount]
        );
    },

    getRelationship: function (currentUserId, otheruserId) {
        
        return db.query(
            `
            SELECT * 
            FROM friendships 
            WHERE sender_id =$1
            WHERE reciever_id = $2
            `,
            [currentUserId, otheruserId]
        );
    }
};



