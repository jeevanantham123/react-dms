"use client";

import { useState, useCallback } from "react";
import useDebounce from "../hooks/useAppliance";
import Image from "next/image";
import classNames from "classnames";

function FilterAndPagination(searchText = "", onSearch) {
  const [search, setsearch] = useState("");
  const pageNumberArray = [1, 2, 3, 4, 5];
  const [activeNum, setactiveNum] = useState(null);

  // const { debounce } = useDebounce();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const handleSearch = useCallback(
  //   debounce((value) => onSearch(value), 1000),
  //   []
  // );

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
                // handleSearch(e.target.value);
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
                // onSearch(search);
              }}
            />
          </div>
          <div className="flex ml-[16px] cursor-pointer gap-[4px] bg-[#E6ECF0] text-[#2D3540] h-[32px] w-[70px] rounded-[8px] text-[12px] font-medium justify-center items-center">
            <Image
              src="/icons/filter.svg"
              alt="filter"
              width={14}
              height={14}
              onClick={(e) => {
                e.preventDefault();
              }}
            />
            Filter
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
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="flex ml-[20px] items-center justify-center">
            <div className="h-[32px] flex justify-center items-center mr-[10px]">
              <Image
                src="/icons/chevron.svg"
                alt="chevron"
                className="transform rotate-180"
                width={7}
                height={11}
                onClick={(e) => {
                  e.preventDefault();
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
                  }}
                >
                  {pageNumber}
                </div>
              );
            })}

            <div className="h-[32px] flex justify-center items-center mx-[10px]">
              <Image
                src="/icons/chevron.svg"
                alt="chevron"
                width={7}
                height={11}
                onClick={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterAndPagination;
