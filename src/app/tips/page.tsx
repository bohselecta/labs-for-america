export default async function Tips({ searchParams }: { searchParams: Promise<{ sent?: string }> }) {
  const params = await searchParams;
  return (
    <main className="mx-auto max-w-lg px-6 py-12">
      <h1 className="text-2xl font-semibold">Send a confidential tip</h1>
      <p className="text-sm text-gray-600 mt-2">
        Do not post sensitive info in public chat. Use this form instead.
      </p>
      
      {params.sent === "1" && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            Thank you. Your tip has been received and will be reviewed by law enforcement.
          </p>
        </div>
      )}
      
      <form 
        action="/api/tips" 
        method="post" 
        className="mt-6 space-y-4 bg-white border border-gray-200 rounded-xl p-5"
      >
        <input 
          name="subject" 
          className="w-full border border-gray-300 rounded-md p-2" 
          placeholder="Subject" 
        />
        <textarea 
          name="body" 
          rows={6} 
          className="w-full border border-gray-300 rounded-md p-2" 
          placeholder="Describe what you know…"
        />
        <button className="px-5 py-2.5 rounded-md bg-blue-600 text-white">
          Send tip
        </button>
      </form>
      
      <p className="text-[11px] text-gray-500 mt-2">
        Your IP and metadata may be logged for safety and abuse prevention.
      </p>
    </main>
  );
}
