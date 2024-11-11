'use client'
import { useQuery } from "react-query";
import {getUsers} from "../services/api"
import { userColumns } from "./table/columns"
import { DashboardTable } from "./table/DashboardTable/DashboardTable"
import { User } from "../types/types";

export const DisplayDashboardTable = () => {
    const { data = [], error, isError, isLoading, } = useQuery<User[]>({ queryKey: ['users'], queryFn: getUsers });

    if (isLoading) {return <div>Loading...</div> }
    if (isError) { return <div>An error occured {error.message}</div> }

    return (
        <>
        <DashboardTable columns={userColumns} data={data} />
        </>
    )

}