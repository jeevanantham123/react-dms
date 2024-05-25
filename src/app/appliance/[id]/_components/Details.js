import classNames from "classnames";
import Image from "next/image";

function Details({ data }) {
  const applianceDetails = data?.data;
  return (
    <div className="bg-white p-[16px]">
      <div className="flex justify-between">
        <div className="text-[28px] text-[#2D3540]">
          {applianceDetails?.serialNo}
        </div>
        <div className="flex gap-[10px]">
          <div className="h-[32px] cursor-pointer text-[12px] font-medium text-[#2D3540] w-[94px] bg-[#E6ECF0] rounded-[8px] flex justify-center items-center">
            <Image
              src="/icons/Status.svg"
              alt="chevron"
              width={20}
              height={20}
            />
            SpeedTest
          </div>
          <div className="h-[32px] cursor-pointer text-[12px] font-medium text-[#2D3540] w-[66px] bg-[#E6ECF0] rounded-[8px] flex justify-center items-center">
            <Image src="/icons/Logs.svg" alt="chevron" width={20} height={20} />
            Logs
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-[8px]">
        <div className="text-[14px] text-[#2D3540]">
          {applianceDetails?.theatreName}
        </div>
        <div className="text-[12px] text-[#69788C]">
          {applianceDetails?.location?.city},{applianceDetails?.location?.state}
          ,{applianceDetails?.location?.country}
        </div>
      </div>
      <div className="flex mt-[8px] gap-[8px] pb-[8px] border-b-[2px] border-[#F5F8FA]">
        <div className="w-[70px] h-[20px] pt-[1px] bg-[#E6ECF0] text-[12px] font-medium text-[#2D3540] rounded-full flex justify-center items-center">
          <div
            className={classNames("h-[10px] w-[10px] rounded-full mr-[4px]", {
              "bg-[#CF1322]": applianceDetails?.deviceStatus === "Offline",
              "bg-[#0D7C2D]": applianceDetails?.deviceStatus === "Online",
            })}
          ></div>
          {applianceDetails?.deviceStatus}
        </div>
        <div className="w-[70px] h-[20px] pt-[1px] bg-[#E6ECF0] text-[12px] font-medium text-[#2D3540] rounded-full flex justify-center items-center">
          <Image
            src="/icons/Storage.svg"
            alt="storage"
            className="mr-[4px]"
            width={13}
            height={13}
          />
          {applianceDetails?.storage}
        </div>
      </div>
      <div className="flex ml-[10px] gap-[20px] mt-[16px] text-[14px] text-[#69788C] font-medium justify-start items-start">
        <div>Device</div>
        <div>Content</div>
        <div>Bandwidth</div>
      </div>
    </div>
  );
}

export default Details;
