"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User, Upload } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            prefetch={true}
          >
            <Home className="w-5 h-5" />
            <span className="text-xl font-bold">Video with AI</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {session && (
              <Link
                href="/upload"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload Video
              </Link>
            )}

            {/* User Dropdown */}
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle hover:bg-gray-800"
                aria-label="User menu"
              >
                <User className="w-5 h-5 text-gray-300" />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu shadow-lg bg-gray-800 rounded-box w-52 mt-3 p-2 border border-gray-700"
              >
                {session ? (
                  <>
                    <li className="menu-title px-4 py-2">
                      <span className="text-sm text-gray-400">
                        {session.user?.email || session.user?.name}
                      </span>
                    </li>

                    <li>
                      <Link href="/upload" className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Video Upload
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={handleSignOut}
                        className="text-red-400 hover:text-red-300"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link href="/login">Sign In</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
