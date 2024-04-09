import { REDIS_USERNAME, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '$env/static/private';
import { Redis } from 'ioredis';

const redis = new Redis({
	host: REDIS_HOST,
	username: REDIS_USERNAME,
	password: REDIS_PASSWORD,
	port: parseInt(REDIS_PORT || '6379')
});

redis.on('error', (error) => {
	console.error(`Error initializing redis client: ${error}`);
});

export default redis;