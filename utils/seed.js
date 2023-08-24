const connection = require('../config/connection');
const { User, Thought } = require('../models')

connection.on('error', (err) => err);

connection.on('open', async () => {
    console.log('connected');
        let userCheck = await connection.db.listCollections({ name: 'users'}).toArray();
        if(userCheck.length){
            await connection.dropCollection('users');
        }
    
    const users = [];
})