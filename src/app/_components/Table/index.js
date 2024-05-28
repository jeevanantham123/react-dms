"use client";

import classNames from "classnames";
import { useRouter } from "next/navigation";

function Table({ data, isLoading }) {
  const router = useRouter();
  const rowWidth = {
    serialNo: "200px",
    location: "350px",
    bandwidth: "200px",
    deviceStatus: "200px",
    osVersion: "200px",
    action: "100px",
    downloadStatus: "200px",
  };
  const tableHeader = [
    {
      header: "Device Serial",
      key: "serialNo",
    },
    {
      header: "Location",
      key: "location",
    },
    {
      header: "Bandwidth",
      key: "bandwidth",
    },
    {
      header: "Status",
      key: "deviceStatus",
    },
    {
      header: "Download Status",
      key: "downloadStatus",
    },
    {
      header: "OS Version",
      key: "osVersion",
    },
    {
      header: "Action",
      key: "action",
    },
  ];
  return (
    <div>
      <div className="flex border-b bg-white px-[16px] border-[#CFDCE5] justify-between">
        {tableHeader?.map((header) => {
          return (
            <div
              key={header}
              className="h-[65px] text-[14px] font-medium text-[#171A1F] flex items-center"
              style={{ width: `${rowWidth[header?.key]}` }}
            >
              {header?.header === "Action" ? null : header?.header}
            </div>
          );
        })}
      </div>
      {isLoading || data === undefined ? (
        <div className="flex justify-center items-center w-full h-[100px]">
          Loading...
        </div>
      ) : (
        <div className="bg-white p-[16px] h-[480px] overflow-y-scroll rounded-[4px]">
          {data?.map((row) => {
            return (
              <div
                className="h-[68px] flex justify-between items-center"
                key={row?.serialNo}
              >
                <div
                  className="text-[12px] text-[#2D3540]"
                  style={{ width: `${rowWidth["serialNo"]}` }}
                >
                  {row?.serialNo}
                </div>
                <div style={{ width: `${rowWidth["location"]}` }}>
                  <div className="flex flex-col">
                    <div className="text-[12px] text-[#2D3540]">
                      {row?.location?.city}
                    </div>
                    <div className="text-[12px] text-[#084782]">
                      {row?.location?.state}, {row?.location?.country}
                    </div>
                  </div>
                </div>
                <div style={{ width: `${rowWidth["bandwidth"]}` }}>
                  <div className="flex flex-col">
                    <div className="text-[12px] text-[#2D3540]">
                      {row.bandwidth}
                    </div>
                    <div className="text-[12px] text-[#69788C]">
                      {row?.avgBandwidth}
                    </div>
                  </div>
                </div>
                <div style={{ width: `${rowWidth["deviceStatus"]}` }}>
                  <div className="flex items-center">
                    <div
                      className={classNames(`h-[8px] w-[8px] rounded-sm`, {
                        "bg-[#CF1322]": row?.deviceStatus === "Offline",
                        "bg-[#0D7C2D]": row?.deviceStatus === "Online",
                      })}
                    ></div>
                    <span className="text-[12px] ml-[10px] text-[#084782]">
                      {row?.deviceStatus}
                    </span>
                  </div>
                </div>
                <div style={{ width: `${rowWidth["downloadStatus"]}` }}>
                  <div className="flex items-center">
                    <div
                      className={classNames(`h-[8px] w-[8px] rounded-sm`, {
                        "bg-[#CF1322]":
                          row?.downloadStatus === "Failed" ||
                          row?.downloadStatus === "Stalled" ||
                          row?.downloadStatus === "Archived",
                        "bg-[#F0A203]":
                          row?.downloadStatus === "Scheduled" ||
                          row?.downloadStatus === "Cancelled",
                        "bg-[#1D81E3]":
                          row?.downloadStatus === "Unarchiving" ||
                          row?.downloadStatus === "Downloading",
                        "bg-[#0D7C2D]": row?.downloadStatus === "Downloaded",
                      })}
                    ></div>
                    <span className="text-[12px] ml-[10px] text-[#084782]">
                      {row?.downloadStatus}
                    </span>
                  </div>
                </div>
                <div
                  className="text-[12px] text-[#2D3540]"
                  style={{ width: `${rowWidth["osVersion"]}` }}
                >
                  {row.osVersion}
                </div>
                <div style={{ width: `${rowWidth["action"]}` }}>
                  <div
                    className="bg-[#E6ECF0] rounded-[6px] cursor-pointer h-[28px] w-[48px] flex justify-center items-center text-[12px] text-[#2D3540] font-medium"
                    onClick={() => router.push(`/appliance/${row?.serialNo}`)}
                  >
                    View
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Table;
