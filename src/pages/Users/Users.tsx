import "./Users.scss"
import DataTable from "../../components/table/DataTable/DataTable";
import { userColumns } from "../../components/table/columns";
import { useUsersQuery } from "../../queries/useUserQueries";

const Users = () => {
    const { data: Users = [], error, isError, isLoading, } = useUsersQuery();

    if (isLoading) {return <div>Loading...</div> }
    if (isError) { return <div>An error occured {error.message}</div> }

    return (
        <>
        <DataTable columns={userColumns} data={Users} />
        </>
    );
}
export default Users;