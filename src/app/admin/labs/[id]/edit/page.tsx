import { prisma } from "@/lib/prisma";
import LabForm from "@/components/LabForm";

export default async function EditLab({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const lab = await prisma.lab.findUnique({ 
    where: { id } 
  });
  
  if (!lab) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        Not found.
      </div>
    );
  }
  
  return <LabForm initial={{
    id: lab.id,
    title: lab.title,
    slug: lab.slug,
    category: lab.category,
    prize: lab.prize,
    deadline: lab.deadline,
    status: lab.status as "open" | "upcoming" | "closed",
    summary: lab.summary,
    bodyMd: lab.bodyMd,
    heroUrl: lab.heroUrl || undefined
  }} />;
}
