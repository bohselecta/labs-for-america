"use client";
import { useAuth } from "@/lib/fake-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminHome() {
  const { user, signIn } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <a 
          href="/admin/labs/new" 
          className="px-4 py-2 rounded-md bg-blue-600 text-white"
        >
          New Lab
        </a>
      </div>
      
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <a 
          href="/admin/labs" 
          className="rounded-xl bg-white border border-gray-200 p-5 hover:shadow"
        >
          <div className="text-gray-500">Manage</div>
          <div className="text-lg font-semibold">Labs</div>
        </a>
        <a 
          href="/admin/org" 
          className="rounded-xl bg-white border border-gray-200 p-5 hover:shadow"
        >
          <div className="text-gray-500">Branding</div>
          <div className="text-lg font-semibold">Organization</div>
        </a>
        <a 
          href="/admin/crisis" 
          className="rounded-xl bg-white border border-gray-200 p-5 hover:shadow"
        >
          <div className="text-gray-500">Public Alert</div>
          <div className="text-lg font-semibold">Manhunt & Emergency modes</div>
          <p className="mt-1 text-sm text-gray-600">
            Enable a homepage banner and open the live community chat.
          </p>
        </a>
      </div>
    </main>
  );
}
