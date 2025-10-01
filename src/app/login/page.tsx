"use client";
import { useAuth } from "@/lib/fake-auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const { signIn } = useAuth();
  const router = useRouter();

  return (
    <main className="mx-auto max-w-sm px-6 py-20">
      <div className="rounded-xl bg-white border border-gray-200 p-6">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <p className="text-sm text-gray-600 mt-1">
          Demo auth. Swap to Clerk/NextAuth later.
        </p>
        <button 
          onClick={() => {
            signIn();
            router.push("/admin");
          }}
          className="mt-6 w-full rounded-md bg-blue-600 text-white py-3 hover:bg-blue-500"
        >
          Continue as Admin (demo)
        </button>
      </div>
    </main>
  );
}
