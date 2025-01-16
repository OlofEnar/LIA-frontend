'use client';
import { userColumns } from '../columns';
import { DashboardTable } from './DashboardTable';
import { useUsersQuery } from '../../../queries/useUserQueries';

export const DisplayDashboardTable = () => {
  const { data = [], error, isError, isLoading } = useUsersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>An error occured {error.message}</div>;
  }

  return (
    <>
      <DashboardTable columns={userColumns} data={data} />
    </>
  );
};
