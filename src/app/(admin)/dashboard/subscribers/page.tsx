import { DataTable } from "@/components/data-table";
import { H1 } from "@/components/ui/typography";
import { subscriberColumns } from "@/features/subscribers/components/subscribers-table/subscribers-columns";
import { db } from "@/server/db";

export default async function AdminSubscribersPage() {
  const subscribers = await db.contactInfo.findMany({
    where: {
      wantsMarketingEmails: true,
    },
  });
  return (
    <div>
      <H1>Subscribers</H1>
      <div className="my-10">
        <DataTable
          columns={subscriberColumns}
          data={subscribers}
          noDataMessage="You don't have any subscribers yet"
        />
      </div>
    </div>
  );
}
