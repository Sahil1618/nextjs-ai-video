"use client";

import Header from "./components/Header";
import { NotificationProvider } from "./components/Notification";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationProvider>
      <Header />
      {children}
    </NotificationProvider>
  );
}
