import classNames from "classnames";

function StatusCards({ data }) {
  return (
    <div className="h-[56px] rounded-[8px] bg-white px-[25px] flex gap-[16px] items-center">
      {Object.keys(data).map((status) => {
        return (
          <div key={status} className="flex items-center justify-center">
            <div
              className={classNames(`h-[8px] w-[8px] rounded-sm`, {
                "bg-[#CF1322]":
                  status === "Failed" ||
                  status === "Stalled" ||
                  status === "Archived",
                "bg-[#F0A203]":
                  status === "Scheduled" || status === "Cancelled",
                "bg-[#1D81E3]":
                  status === "Unarchiving" || status === "Downloading",
                "bg-[#0D7C2D]": status === "Downloaded",
              })}
            ></div>
            <div className="ml-[16px] text-[14px] tracking-[-0.2px] text-[#2D3540]">
              {data[status]}
            </div>
            <div className="ml-[2px] text-[14px] tracking-[-0.2px] text-[#2D3540]">
              {status}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatusCards;
