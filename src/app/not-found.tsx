import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-surface p-6">
      <h2 className="text-4xl font-charter text-white mb-4">404 - Not Found</h2>
      <p className="text-on-surface/70">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-8 text-white px-6 py-2 bg-primary rounded hover:bg-primary/90 transition-colors">Return Home</Link>
    </div>
  )
}
