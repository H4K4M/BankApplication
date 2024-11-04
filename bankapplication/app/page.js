// app/page.js
"use client"; // Add this at the top of the file to indicate a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null; // You can also return a loading indicator
};

export default Page;
