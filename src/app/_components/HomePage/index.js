"use client";

import FilterAndPagination from "../FilterAndPagination";
import { useApplianceList } from "../hooks/useAppliance";
import Navbar from "../Navbar";
import StatusCards from "../StatusCards";
import Table from "../Table";

export default function HomePage() {
  const { applianceData, serverError, isLoading } = useApplianceList();

  if (serverError) throw new Error("Something went wrong");

  if (isLoading || applianceData === undefined)
    return (
      <div className="flex justify-center items-center w-full h-full">
        Loading...
      </div>
    );

  const groupedByDownloadStatus = applianceData?.appliances?.reduce(
    (acc, device) => {
      const status = device.downloadStatus;
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status]++;
      return acc;
    },
    {}
  );

  return (
    <>
      <Navbar />
      <div className="p-[24px]">
        <StatusCards data={groupedByDownloadStatus} />
        <FilterAndPagination />
        <Table data={applianceData?.appliances} />
      </div>
    </>
  );
}
