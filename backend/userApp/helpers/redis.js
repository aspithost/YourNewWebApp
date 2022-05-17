const { createClient } = require('redis');

let client

module.exports = {
    connectToRedis: async () => {
        try {
            if (process.env.NODE_ENV === 'production') {
                client = createClient({ 
                    socket: {
                        host: process.env.REDIS_HOST, 
                        port: process.env.REDIS_PORT,
                    },
                    password: process.env.REDIS_PASSWORD
                });
            } else {
                client = createClient();
            }     

            client.on('ready', () => console.log('Connected to Redis!'));
            client.on('error', () => {
                throw new Error();
            });

            await client.connect();
        } catch (err) {
            console.log('Redis error: ', err)
        }
    },
    getRedis: () => client
}