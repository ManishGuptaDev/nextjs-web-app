import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
          Welcome to the App
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Full-stack applications built with Next.js, Prisma, and Supabase.
        </p>
        
        <div className="flex flex-col gap-4">
          <Link
            href="/todo"
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go to Todo App →
          </Link>
          
          <Link
            href="/currency"
            className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Go to Currency Converter →
          </Link>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Todo App
              </h3>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                <li>✓ Create todos</li>
                <li>✓ Mark complete</li>
                <li>✓ Delete todos</li>
                <li>✓ Type-safe API</li>
              </ul>
            </div>
            
            <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Currency Converter
              </h3>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                <li>✓ Real-time rates</li>
                <li>✓ 160+ currencies</li>
                <li>✓ Conversion history</li>
                <li>✓ USD to any currency</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
