import { defineEntity, p, type InferEntity } from '@mikro-orm/core';
import { email, object, string } from 'zod';

export const UserSchema = defineEntity({
  name: 'User',
  properties: {
    id: p.string().primary(),
    email: p.string(),
    firstName: p.string(),
    lastName: p.string(),
    password: p.string(),
  },
});

export type UserSchemaType = InferEntity<typeof UserSchema>;

// Input validation for creating users (includes password)
export const UserCreateSchema = object({
  id: string().optional(),
  email: email(),
  firstName: string().min(1),
  lastName: string().min(1),
  password: string().min(8),
});

// Input validation for updating users (password optional)
export const UserUpdateSchema = object({
  email: email().optional(),
  firstName: string().min(1).optional(),
  lastName: string().min(1).optional(),
  password: string().min(8).optional(),
});

// Response schema (excludes password)
export const UserResponseSchema = object({
  id: string(),
  email: email(),
  firstName: string(),
  lastName: string(),
});

// Login credentials schema
export const LoginSchema = object({
  email: email(),
  password: string(),
});