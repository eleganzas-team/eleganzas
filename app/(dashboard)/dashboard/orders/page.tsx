import { Suspense } from "react";
import { OrdersContent } from "./orders-content";

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <OrdersContent />
    </Suspense>
  );
}