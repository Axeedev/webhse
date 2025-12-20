import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';


interface DbUser {
  id: number;
  username: string;
  password_hash: string;
  email: string | null;
  role: string;
  created_at: string;
}


interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string | null;
    role: string;
  };    
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;


  if (!username || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as DbUser | undefined;
    
    if (!user) {
      return res.status(401).json({ message: 'Пользователя с таким именем не существует!' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    // Создать JWT токен
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );


    const { password_hash, ...userWithoutPassword } = user;
    
    res.status(200).json({
      token,
      user: userWithoutPassword
    } as LoginResponse);
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}