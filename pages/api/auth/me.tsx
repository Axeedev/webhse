// pages/api/auth/me.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

interface UserResponse {
  id: number;
  username: string;
  email: string | null;
  role: string;
  created_at: string;
}

interface JwtPayload {
  userId: number;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    const user = db.prepare('SELECT id, username, email, role, created_at FROM users WHERE id = ?').get(decoded.userId) as UserResponse | undefined;
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}