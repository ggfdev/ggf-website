'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
                    <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
                    <p className="text-gray-400 mb-8">{error.message}</p>
                    <button
                        onClick={() => reset()}
                        className="px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-600 transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
