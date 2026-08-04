export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white">ZAUQ COLLECTION</h1>
        <p className="text-yellow-500 mt-4 text-xl">Coming Soon...</p>
        <a
          href="/auth/login"
          className="inline-block mt-8 px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}