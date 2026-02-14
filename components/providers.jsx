"use client";

import { HMSRoomProvider } from "@100mslive/react-sdk";

export function Providers({ children }) {
  return (
    <HMSRoomProvider>
      {children}
    </HMSRoomProvider>
  );
}