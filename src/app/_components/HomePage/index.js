"use client";

import FilterAndPagination from "../FilterAndPagination";
import { useApplianceList } from "../hooks/useAppliance";
import Navbar from "../Navbar";
import StatusCards from "../StatusCards";
import Table from "../Table";

export default function HomePage() {
  const { applianceData, serverError, isLoading } = useApplianceList();

  if (isLoading || applianceData === undefined) return <h2> Loading.. </h2>;

  if (!applianceData?.success || serverError)
    throw new Error("Something went wrong");

  const groupedByDownloadStatus = applianceData?.data?.reduce((acc, device) => {
    const status = device.downloadStatus;
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status]++;
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className="p-[24px]">
        <StatusCards data={groupedByDownloadStatus} />
        <FilterAndPagination />
        <Table data={applianceData?.data} />
      </div>
    </>
  );
}
