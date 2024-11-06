'use client'
import { useQuery } from "react-query";
import {getUsers} from "../services/api"
import { userColumns } from "./table/columns"
import { DataTable } from "./table/DataTable/DataTable"
import { User } from "../types/types";

export const DisplayUsersTable = () => {
    const { data = [], error, isError, isLoading, } = useQuery<User[]>({ queryKey: ['users'], queryFn: getUsers });

    if (isLoading) {return <div>Loading...</div> }
    if (isError) { return <div>An error occured {error.message}</div> }

    return (
        <>
        <DataTable columns={userColumns} data={data} />
        </>
    )

}