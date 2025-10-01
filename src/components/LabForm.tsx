"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  category: z.string().min(2).optional(),
  prize: z.coerce.number().min(0).optional(),
  deadline: z.coerce.date().optional(),
  status: z.enum(["open", "upcoming", "closed"]).optional(),
  summary: z.string().min(10).optional(),
  bodyMd: z.string().min(10).optional(),
  heroUrl: z.string().optional(),
});

export default function LabForm({ initial }: { initial?: Partial<z.infer<typeof schema>> }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initial || {
      category: "Civic",
      status: "open" as const,
      prize: 1000,
      slug: "",
      heroUrl: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const res = await fetch("/api/labs" + (data.id ? `/${data.id}` : ""), {
      method: data.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    
    if (res.ok) {
      router.push("/admin/labs");
    } else {
      alert("Save failed");
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">
        {initial ? "Edit Lab" : "New Lab"}
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <input type="hidden" {...register("id")} />
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input 
              {...register("title")} 
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600">Slug</label>
            <input 
              {...register("slug")} 
              className="w-full p-3 border border-gray-300 rounded-md" 
              placeholder="lake-cleanup-2026"
            />
            {errors.slug && (
              <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <input 
              {...register("category")} 
              className="w-full p-3 border border-gray-300 rounded-md" 
              placeholder="Civic"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Prize (USD)</label>
            <input 
              type="number" 
              {...register("prize")} 
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Deadline</label>
            <input 
              type="date" 
              {...register("deadline")} 
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <select 
              {...register("status")} 
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="open">open</option>
              <option value="upcoming">upcoming</option>
              <option value="closed">closed</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Hero Image URL</label>
            <input 
              {...register("heroUrl")} 
              className="w-full p-3 border border-gray-300 rounded-md" 
              placeholder="/images/lake.png"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600">Summary</label>
          <textarea 
            {...register("summary")} 
            rows={3} 
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.summary && (
            <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>
          )}
        </div>
        
        <div>
          <label className="text-sm text-gray-600">Details (Markdown)</label>
          <textarea 
            {...register("bodyMd")} 
            rows={8} 
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.bodyMd && (
            <p className="text-red-500 text-sm mt-1">{errors.bodyMd.message}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button 
            disabled={isSubmitting} 
            className="px-5 py-3 rounded-md bg-blue-600 text-white disabled:opacity-50"
          >
            {initial ? "Save" : "Create"}
          </button>
          <a 
            href="/admin/labs" 
            className="px-5 py-3 rounded-md border border-gray-300"
          >
            Cancel
          </a>
        </div>
      </form>
    </main>
  );
}
