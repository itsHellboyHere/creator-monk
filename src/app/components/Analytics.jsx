"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag || !process.env.NEXT_PUBLIC_GA_ID) return;

    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      page_path: pathname + searchParams.toString(),
    });
  }, [pathname, searchParams]);

  return null;
}