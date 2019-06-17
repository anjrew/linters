CREATE TABLE chat_messages
	id SERIAL PRIMARY KEY,
	message TEXT,
	user_id TEXT INTERGER REFERANCES (users.id)
	