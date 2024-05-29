"use client";

import { useEffect, useState } from "react";
import FilterAndPagination from "../FilterAndPagination";
import { useApplianceList } from "../hooks/useAppliance";
import Navbar from "../Navbar";
import StatusCards from "../StatusCards";
import Table from "../Table";

export default function HomePage() {
  const [filters, setFilters] = useState({
    searchText: "",
    page: 1,
    limit: 10,
    deviceStatus: "",
  });

  const [total, setTotal] = useState();
  const [data, setData] = useState();

  const { applianceData, serverError, isLoading } = useApplianceList(
    "",
    10,
    1,
    ""
  );

  useEffect(() => {
    if (applianceData) {
      setTotal(applianceData?.total);
      setData(applianceData?.appliances);
    }
  }, [applianceData]);

  if (isLoading || applianceData === undefined) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        Loading...
      </div>
    );
  }

  if (serverError) throw new Error("Something went wrong");

  const groupedByDownloadStatus = data?.reduce((acc, device) => {
    const status = device.downloadStatus;
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status]++;
    return acc;
  }, {});

  console.log(total);

  return (
    <>
      <Navbar />
      <div className="p-[24px]">
        <StatusCards data={groupedByDownloadStatus} />
        <FilterAndPagination
          isLoading={isLoading}
          data={applianceData}
          total={total}
          filters={filters}
          setFilters={(value) => {
            setFilters({ ...filters, ...value });
          }}
        />
        <Table
          filters={filters}
          setFilters={(value) => {
            setFilters({ ...filters, ...value });
          }}
          setTotal={(value) => setTotal(value)}
          setData={(value) => setData(value)}
        />
      </div>
    </>
  );
}
