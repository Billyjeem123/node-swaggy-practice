// src/RedisClient.ts
import {createClient, RedisClientType} from 'redis';

export class RedisClient {
    private static client: RedisClientType;

    // Initialize the Redis client (singleton)
    public static async init(): Promise<void> {
        if (!this.client) {
            this.client = createClient();

            this.client.on('error', (err) => {
                console.error('❌ Redis error:', err);
            });

            try {
                await this.client.connect();
                console.log('✅ Redis connected successfully!');
            } catch (err) {
                console.error('❌ Redis connection failed:', err);
            }
        }
    }

    public static async set(key: string, value: any, expirySeconds = 3600): Promise<void> {
        if (!this.client) throw new Error('Redis client not initialized');
        await this.client.set(key, JSON.stringify(value), {EX: expirySeconds});
    }

    public static async get<T = any>(key: string): Promise<T | null> {
        if (!this.client) throw new Error('Redis client not initialized');
        const result = await this.client.get(key);
        return result ? JSON.parse(<string>result) : null;
    }

    public static async del(key: string): Promise<void> {
        if (!this.client) throw new Error('Redis client not initialized');
        await this.client.del(key);
    }

    public static getRawClient(): RedisClientType {
        if (!this.client) throw new Error('Redis client not initialized');
        return this.client;
    }
}
