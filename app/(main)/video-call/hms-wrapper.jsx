"use client"; 

import { HMSRoomProvider } from "@100mslive/react-sdk";

export default function HMSWrapper({ children }) {
  return <HMSRoomProvider>{children}</HMSRoomProvider>;
}