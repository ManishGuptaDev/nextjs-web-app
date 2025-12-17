import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
          Welcome to Todo App
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          A simple todo application built with Next.js, Prisma, and Supabase.
        </p>
        
        <div className="flex flex-col gap-4">
          <Link
            href="/todo"
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go to Todo App →
          </Link>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Features
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
                Tech Stack
              </h3>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                <li>• Next.js 16</li>
                <li>• Prisma ORM</li>
                <li>• Supabase</li>
                <li>• TypeScript</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
