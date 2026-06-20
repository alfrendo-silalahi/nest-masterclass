import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: Pool;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.pool = new Pool({
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      user: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      ssl: true,
    });

    // test connection
    try {
      const client = await this.pool.connect();
      client.release();
      this.logger.log('Database connected successfully.');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Database connection failed: ${error.message}`);
        this.logger.error('App running without database. Start PostgreSQL to enable DB features.');
        this.logger.error('Force close initiated. Shutting down all processes.');
        process.exit(1);
      }
    }
  }

  async onModuleDestroy() {
    await this.pool.connect();
  }

  getPool() {
    return this.pool;
  }
}
