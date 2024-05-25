import NotFound from "@/app/not-found";
import BreadCrumbs from "./_components/BreadCrumbs";
import Details from "./_components/Details";
import IspAndBilling from "./_components/IspAndBilling";

export default async function Appliance({ params }) {
  const { id } = params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2/appliance/${id}/info`,
    {
      cache: "no-store",
    }
  ).then((data) => data.json());
  const { success, httpStatus, httpCode } = data;

  if (httpCode === "NOT_FOUND") return <NotFound />;
  if (httpCode === "INTERNAL_SERVER_ERROR")
    throw new Error("Something went wrong");

  return (
    <div className="">
      <BreadCrumbs id={id} />
      <Details data={data} />
      <div className="p-[20px]">
        <IspAndBilling data={data} />
      </div>
    </div>
  );
}
