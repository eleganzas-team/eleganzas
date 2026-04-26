import { Suspense } from "react";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardPage() {
  // Cek session dari cookie/localStorage di server
  // Karena custom auth menggunakan localStorage, kita perlu handle di client
  // Untuk sekarang, kita akan fetch data di client component
  
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}