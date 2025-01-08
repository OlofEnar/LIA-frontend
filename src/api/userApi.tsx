import { User } from '../types/types'
import { api } from "../api/axios";

const ENDPOINT = '/users';

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get(ENDPOINT);
    console.log(response);    
    return response.data;
};

export const getAllUsersWithEvents = async (): Promise<User[]> => {
    const response = await api.get(`${ENDPOINT}/alluserswithevents`);
    console.log(response);    
    return response.data;
};

export const getUser = async (userId: string): Promise<User> => {
    const response = await api.get(`${ENDPOINT}/${userId}`);
    console.log(response);    
    return response.data;
};