import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { findUserByEmail } from "../models/UserModel";


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

   //const valid = await bcrypt.compare(password, user.password);
    const valid = await ( user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, role: user.role_id }, 'secret', { expiresIn: '1h' });

    res.json({ token });
}