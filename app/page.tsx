import VideoCard from "./components/VideoCard";

async function getVideos() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/video`,
      {
        cache: "no-store", // Always fetch fresh data
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch videos");
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export default async function Home() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Video Feed</h1>

        {videos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No videos uploaded yet</p>
            <a
              href="/upload"
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold"
            >
              Upload Your First Video
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video: any) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
