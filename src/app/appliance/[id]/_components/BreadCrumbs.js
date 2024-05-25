"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function BreadCrumbs({ id }) {
  const router = useRouter();
  return (
    <div className="flex h-[48px] px-[20px] gap-[10px] items-center">
      <div
        className="text-[#69788C] cursor-pointer text-[12px] font-medium"
        onClick={() => router.push("/")}
      >
        Devices
      </div>
      <Image src="/icons/Chevron.svg" alt="chevron" width={6} height={10} />
      <div className="text-[12px] text-[#2D3540]"> {id}</div>
    </div>
  );
}

export default BreadCrumbs;
