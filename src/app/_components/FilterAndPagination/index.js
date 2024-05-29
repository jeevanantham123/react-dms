"use client";

import { useState, useCallback } from "react";
import useDebounce from "../hooks/useAppliance";
import Image from "next/image";
import classNames from "classnames";

function FilterAndPagination({ isLoading, data, filters, setFilters, total }) {
  const [limit, setLimit] = useState(10);
  const [activeNum, setactiveNum] = useState(1);
  const [offline, setOffline] = useState(false);
  const [online, setOnline] = useState(false);

  const [search, setsearch] = useState("");
  const [open, setOpen] = useState(false);
  const totalPages = Math.ceil(total / limit);

  const pageNumberArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const { debounce } = useDebounce();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((value) => setFilters({ ...filters, searchText: value }), 1000),
    []
  );

  return (
    <div className="bg-white p-[16px] rounded-t-[8px] mt-[16px]">
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex h-[32px] w-[240px] rounded-[4px] items-center gap-[20px] border border-[#CFDCE5] px-[10px]">
            <input
              className="w-full bg-transparent text-[14px] outline-none"
              type="text"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
                handleSearch(e.target.value);
              }}
              placeholder="search"
            />
            <Image
              src="/icons/search.svg"
              alt="search"
              className="cursor-pointer"
              width={14}
              height={14}
              onClick={(e) => {
                e.preventDefault();
                handleSearch(e.target.value);
              }}
            />
          </div>
          <div className="relative">
            <div
              className="flex ml-[16px] cursor-pointer gap-[4px] bg-[#E6ECF0] text-[#2D3540] h-[32px] w-[70px] rounded-[8px] text-[12px] font-medium justify-center items-center"
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
            >
              <Image
                src="/icons/Filter.svg"
                alt="filter"
                width={14}
                height={14}
              />
              Filter
            </div>
            {open ? (
              <div className="absolute">
                <div
                  className="bg-white rounded-lg min-w-[200px] w-[200px] ml-[20px] shadow-md border-[#CFDCE5] p-[16px]"
                  tabIndex={0}
                >
                  <div className="mb-[12px] text-[14px] font-medium text-[#171A1F]">
                    Device Status
                  </div>
                  <div className="flex items-center gap-[10px] text-[12px] text-[#171A1F]">
                    <input
                      type="checkbox"
                      id="online"
                      name="status"
                      checked={online}
                      value="online"
                      onClick={(e) => {
                        setOnline(!online);
                        if (e.target.checked) {
                          if (offline) {
                            setLimit(10);
                            setactiveNum(1);
                            setFilters({
                              ...filters,
                              deviceStatus: "",
                              page: 1,
                              limit: 10,
                            });
                          } else {
                            setLimit(10);
                            setactiveNum(1);
                            setFilters({
                              ...filters,
                              deviceStatus: "online",
                              page: 1,
                              limit: 10,
                            });
                          }
                        } else {
                          if (!offline) {
                            setLimit(10);
                            setactiveNum(1);
                            setFilters({
                              ...filters,
                              deviceStatus: "",
                              page: 1,
                              limit: 10,
                            });
                          } else {
                            setLimit(10);
                            setactiveNum(1);
                            setFilters({
                              ...filters,
                              deviceStatus: "offline",
                              page: 1,
                              limit: 10,
                            });
                          }
                        }
                      }}
                    />
                    <label for="online">Online</label>
                    <input
                      type="checkbox"
                      id="offline"
                      checked={offline}
                      name="status"
                      value="offline"
                      onClick={(e) => {
                        setOffline(!offline);
                        if (e.target.checked) {
                          if (online) {
                            setLimit(10);
                            setactiveNum(1);
                            setFilters({
                              ...filters,
                              deviceStatus: "",
                              page: 1,
                              limit: 10,
                            });
                          } else {
                            setLimit(10);
                            setactiveNum(1);
                            setFilters({
                              ...filters,
                              deviceStatus: "offline",
                              page: 1,
                              limit: 10,
                            });
                          }
                        } else {
                          if (!online) {
                            setLimit(10);
                            setactiveNum(1);
                            setFilters({
                              ...filters,
                              deviceStatus: "",
                              page: 1,
                              limit: 10,
                            });
                          } else {
                            setLimit(10);
                            setactiveNum(1);
                            setFilters({
                              ...filters,
                              deviceStatus: "online",
                              page: 1,
                              limit: 10,
                            });
                          }
                        }
                      }}
                    />
                    <label for="offline">Offline</label>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex">
          <div className="flex justify-center items-center gap-[6px]">
            <span className="text-[12px] font-medium text-[#69788C]">Show</span>
            <select
              name="rows"
              id="rows"
              className="border cursor-pointer border-[#CFDCE5] rounded h-[32px] w-[70px] px-[8px] bg-white"
              onChange={(e) => {
                setLimit(e.target.value);
                setactiveNum(1);
                setFilters({ ...filters, limit: e.target.value, page: 1 });
              }}
              value={limit}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          {pageNumberArray?.length ? (
            <div className="flex ml-[20px] items-center justify-center">
              <div className="h-[32px] flex justify-center items-center mr-[10px]">
                <Image
                  src="/icons/Chevron.svg"
                  alt="chevron"
                  className="transform rotate-180"
                  width={7}
                  height={11}
                  onClick={(e) => {
                    e.preventDefault();
                    if (activeNum - 1 > 0) {
                      setactiveNum(activeNum - 1);
                      setFilters({ ...filters, page: activeNum - 1 });
                    }
                  }}
                />
              </div>

              {pageNumberArray?.map((pageNumber) => {
                return (
                  <div
                    key={pageNumber}
                    className={classNames(
                      "h-[32px] flex cursor-pointer text-[12px] font-medium text-black justify-center items-center w-[32px]",
                      {
                        "bg-[#EBF5FF] border border-[#084782] rounded-[8px]":
                          activeNum === pageNumber,
                      }
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setactiveNum(pageNumber);
                      setFilters({ ...filters, page: pageNumber });
                    }}
                  >
                    {pageNumber}
                  </div>
                );
              })}

              <div className="h-[32px] flex justify-center items-center mx-[10px]">
                <Image
                  src="/icons/Chevron.svg"
                  alt="chevron"
                  width={7}
                  height={11}
                  onClick={(e) => {
                    e.preventDefault();
                    if (activeNum + 1 <= totalPages) {
                      setactiveNum(activeNum + 1);
                      setFilters({ ...filters, page: activeNum + 1 });
                    }
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default FilterAndPagination;
