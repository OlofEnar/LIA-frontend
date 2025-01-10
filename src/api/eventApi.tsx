import { UserEvent } from "../types/types";
import { api } from "./axiosClient";

export const getEventsByUserId = async (userId: string ): Promise<UserEvent[]> => {
    const response = await api.get(`/users/${userId}/events`);
    return response.data;
};

export const getEvents = async (): Promise<UserEvent[]> => {
    const response = await api.get('/events');    
    return response.data;
};