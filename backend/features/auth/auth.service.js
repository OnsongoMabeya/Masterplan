import bcrypt from 'bcrypt';
import db from '../../database/db.js';
import { generateToken } from '../../shared/utils/jwt.utils.js';

const SALT_ROUNDS = 10;

export const getUserById = async (userId) => {
  return await db('users').where({ id: userId }).first();
};

export const getFirstUser = async () => {
  return await db('users').first();
};

export const setupPin = async (pin) => {
  const pinHash = await bcrypt.hash(pin, SALT_ROUNDS);
  
  const existingUser = await getFirstUser();
  
  if (existingUser) {
    await db('users').where({ id: existingUser.id }).update({
      pin_hash: pinHash,
      updated_at: db.fn.now()
    });
    return existingUser.id;
  } else {
    const [userId] = await db('users').insert({
      pin_hash: pinHash
    });
    return userId;
  }
};

export const verifyPin = async (userId, pin) => {
  const user = await getUserById(userId);
  if (!user) return false;
  
  return await bcrypt.compare(pin, user.pin_hash);
};

export const login = async (pin) => {
  const user = await getFirstUser();
  
  if (!user) {
    throw new Error('No user found. Please set up your PIN first.');
  }
  
  const isValid = await bcrypt.compare(pin, user.pin_hash);
  
  if (!isValid) {
    throw new Error('Invalid PIN');
  }
  
  const token = generateToken(user.id);
  
  return { token, userId: user.id };
};

export const changePin = async (userId, currentPin, newPin) => {
  const isValid = await verifyPin(userId, currentPin);
  
  if (!isValid) {
    throw new Error('Current PIN is incorrect');
  }
  
  const newPinHash = await bcrypt.hash(newPin, SALT_ROUNDS);
  
  await db('users').where({ id: userId }).update({
    pin_hash: newPinHash,
    updated_at: db.fn.now()
  });
  
  return true;
};

export const checkSetupStatus = async () => {
  const user = await getFirstUser();
  return {
    needsSetup: !user,
    hasUser: !!user
  };
};
