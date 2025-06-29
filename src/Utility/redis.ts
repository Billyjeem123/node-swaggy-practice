// src/RedisClient.ts
import {createClient, RedisClientType} from 'redis';
import {getEnvironmentVariables} from "../enviroments/environment";

export class Redis {
    private static client: RedisClientType;

    // ✅ Move environment variables inside the init method or top-level scope<?php
    private static redisHost = getEnvironmentVariables().redis_host;
    private static redisPort = getEnvironmentVariables().redis_port;
    private static redisPassword = null;

    // ✅ Initialize the Redis client (singleton)
    public static async init(): Promise<void> {
        if (!this.client) {
            this.client = createClient({
                socket: {
                    host: this.redisHost,
                    port: parseInt(String(this.redisPort), 10),
                },
                //password: this.redisPassword !== 'null' ? this.redisPassword : undefined,
            });

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
