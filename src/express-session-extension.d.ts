import { Request } from 'express';

declare module 'express' {
  interface Request {
    session?: any; // Add cookie seesion to Request properties
  }
}