import { z } from 'zod';

export const userUpdateSchema = z.object({
    name: z.string().min(2, 'Vorname muss mindestens 2 Zeichen lang sein'),
    email: z.string().email('Ungültige E-Mail-Adresse'),
    image: z.string().optional()
});

export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
