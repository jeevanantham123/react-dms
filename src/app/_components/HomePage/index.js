"use client";

import { useEffect, useState } from "react";
import FilterAndPagination from "../FilterAndPagination";
import { useApplianceList } from "../hooks/useAppliance";
import Navbar from "../Navbar";
import StatusCards from "../StatusCards";
import Table from "../Table";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState("");
  const [deviceStatus, setDeviceStatus] = useState("");
  const [downloadStatus, setDownloadStatus] = useState("");

  const { applianceData, serverError, isLoading } = useApplianceList();

  if (serverError) throw new Error("Something went wrong");

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
        <FilterAndPagination isLoading={isLoading} />
        <Table data={applianceData?.appliances} isLoading={isLoading} />
      </div>
    </>
  );
}
