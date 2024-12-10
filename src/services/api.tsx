import axios from "axios"
import {User, UserEvent} from '../types/types'

const API_URL = 'https://localhost:7184/api';

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/users`);
    console.log(response);    
    return response.data;
};

export const getAllUsersWithEvents = async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/users/alluserswithevents`);
    console.log(response);    
    return response.data;
};

export const getUser = async (userId: string): Promise<User> => {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    console.log(response);    
    return response.data;
};

export const getEventsByUserId = async (userId: string ): Promise<UserEvent[]> => {
    const response = await axios.get(`${API_URL}/users/${userId}/events`);
    return response.data;
};

export const getEvents = async (): Promise<UserEvent[]> => {
    const response = await axios.get(`${API_URL}/events`);    
    return response.data;
};

