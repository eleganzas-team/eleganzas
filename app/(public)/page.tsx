import { Suspense } from "react";
import { HomeContent } from "./home-content";
import { HomeSkeleton } from "@/components/ui/loading-skeleton";
// import { templateServiceServer } from "@/services/template.service.server";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
//   const supabase = await createClient();
  
//   const [trendingTemplates, newTemplates, premiumTemplates] = await Promise.all([
//     templateServiceServer.getTrending(4),
//     templateServiceServer.getNew(4),
//     templateServiceServer.getFeatured(4),
//   ]);

//   const { count: totalTemplates } = await supabase
//     .from("templates")
//     .select("*", { count: "exact", head: true });

//   const { count: totalOrders } = await supabase
//     .from("orders")
//     .select("*", { count: "exact", head: true });

  const stats = {
    totalTemplates:  100,
    totalOrders:  5000,
    rating: 4.9,
  };

  const featuredTemplates = {
    trending:  [],
    new:  [],
    premium:  [],
  };

  return (
    <Suspense fallback={<HomeSkeleton />}>
        {/* <div>dasuidhasd</div> */}
      <HomeContent featuredTemplates={featuredTemplates} stats={stats} />
    </Suspense>
  );
}