"use client";

import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Removed <Header /> - it's already in ClientWrapper */}

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Upload New Reel
          </h1>

          {/* Upload Form */}
          <VideoUploadForm />
        </div>
      </div>
    </div>
  );
}
