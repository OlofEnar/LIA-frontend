import { GetUserEventTableData } from "../services/GetUserEventTableData";
import { userEventColumns } from "./table/columns";
import DataTable from "./table/DataTable/DataTable";

export const DisplayUserEventTable = ({userId}: {userId:string}) => {
  const { data: chartData = [], totalEvents} = GetUserEventTableData(userId);

    return (
        <>
          <DataTable columns={userEventColumns(totalEvents)} data={chartData} showTotalFooter={true}/>
        </>
    );
};