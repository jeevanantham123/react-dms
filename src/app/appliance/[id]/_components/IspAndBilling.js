function IspAndBilling({ data }) {
  const title = "text-[12px] font-medium text-[#2D3540]";
  const content = "text-[14px] mt-[2px] text-[#2D3540]";
  const applianceData = data?.data;

  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);

    // Get the day
    const day = date.getDate();

    // Format the output
    const formattedDate = `${day}${
      day === 1 ? "st" : day === 2 ? "nd" : "th"
    } ${date.toLocaleString("default", { month: "short" })}`;

    return formattedDate;
  };
  return (
    <div className="grid bg-white rounded-[8px] p-[24px] grid-cols-4 gap-[16px]">
      <div className="flex flex-col">
        <div className={title}>Device Serial</div>
        <div className={content}>{applianceData?.serialNo}</div>
      </div>
      <div className="flex flex-col">
        <div className={title}>Location</div>
        <div className={content}>{applianceData?.location?.city}</div>
      </div>
      <div className="flex flex-col">
        <div className={title}>City</div>
        <div className={content}>
          {applianceData?.location?.state},{applianceData?.location?.country}
        </div>
      </div>
      <div className="flex flex-col">
        <div className={title}>ISP Payment Responsibility</div>
        <div className={content}>{applianceData?.ispPaymentResponsibility}</div>
      </div>
      <div className="flex flex-col">
        <div className={title}>Bandwidth</div>
        <div className={content}>{applianceData?.bandwidth}</div>
      </div>
      <div className="flex flex-col">
        <div className={title}>Average Bandwidth</div>
        <div className={content}>{applianceData?.avgBandwidth}</div>
      </div>
      <div className="flex flex-col">
        <div className={title}>Plan Start Date</div>
        <div className={content}>
          {getFormattedDate(applianceData?.planStartDate)}
        </div>
      </div>
      <div className="flex flex-col">
        <div className={title}>Billing Cycle</div>
        <div className={content}>{applianceData?.billingCycle}</div>
      </div>
      <div className="flex flex-col">
        <div className={title}>Download Status</div>
        <div className={content}>{applianceData?.downloadStatus}</div>
      </div>
      <div className="flex flex-col">
        <div className={title}>OS Version</div>
        <div className={content}>{applianceData?.osVersion}</div>
      </div>
      <div className="flex flex-col">
        <div className={title}>Storage Available</div>
        <div className={content}>{applianceData?.storage}</div>
      </div>
    </div>
  );
}

export default IspAndBilling;
