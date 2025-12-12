"use client";

import Image from "next/image";
import { useState } from "react";

interface VideoCardProps {
  video: {
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    createdAt?: string;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Thumbnail/Video */}
      <div className="relative aspect-video bg-gray-800">
        {!isPlaying ? (
          <>
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
            >
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-black ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </>
        ) : (
          <video
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full h-full"
          />
        )}
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {video.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2">
          {video.description}
        </p>
        {video.createdAt && (
          <p className="text-gray-500 text-xs mt-2">
            {new Date(video.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
