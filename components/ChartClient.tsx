/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";

const ChartWrapper = dynamic(() => import("@/components/ChartWrapper"), {
  ssr: false,
});

export default function ChartClient({ data }: { data: any }) {
  return <ChartWrapper data={data} />;
}
