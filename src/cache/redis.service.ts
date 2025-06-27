import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private client = new Redis();

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value), 'EX', 60);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
