"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
  selectPeers,
  selectLocalPeer,
  selectHMSMessages,
  selectVideoTrackByPeerID,
} from "@100mslive/react-sdk";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  User,
  Send,
} from "lucide-react";
import { toast } from "sonner";

const VideoTile = ({ peer, isLocal }) => {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectVideoTrackByPeerID(peer.id));

  useEffect(() => {
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted={isLocal}
      playsInline
      className={`w-full h-full object-cover rounded-xl ${isLocal ? "scale-x-[-1]" : ""}`}
    />
  );
};

export default function VideoCall({ roomId, token, userName = "Participant" }) {
  const router = useRouter();
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
  const localPeer = useHMSStore(selectLocalPeer);
  const allMessages = useHMSStore(selectHMSMessages);

  const [isLoading, setIsLoading] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const chatContainerRef = useRef(null);
  const hasJoined = useRef(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [allMessages]);

  useEffect(() => {
    const joinRoom = async () => {
      if (!token || hasJoined.current || isConnected) return;

      try {
        hasJoined.current = true;
        setIsLoading(true);

        const authToken = typeof token === 'object' ? token.token : token;

        if (!authToken) {
          throw new Error("Token is empty or invalid");
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        await hmsActions.join({
          authToken: authToken,
          userName: userName || "User",
          rememberDeviceSelection: true,
        });
        
        setIsLoading(false);
      } catch (e) {
        console.error("100ms SDK Error:", e);
        hasJoined.current = false;
        setIsLoading(false);
        if (e.message?.includes('already joined')) {
           setIsLoading(false);
        }
      }
    };

    joinRoom();

    return () => {
      
      hmsActions.leave().catch(console.error);
      hasJoined.current = false;
    };
    
  }, [token]); 

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    await hmsActions.sendBroadcastMessage(inputMessage);
    setInputMessage("");
  };

  const endCall = async () => {
    if (window.confirm("Are you sure you want to end the call?")) {
      await hmsActions.leave();
      router.push("/appointments");
    }
  };

  if (isLoading && !isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-emerald-400 animate-spin mb-4" />
        <p className="text-white font-medium">Connecting to secure room...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-150px)]">
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 min-h-0">
            <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-emerald-900/20 aspect-video sm:aspect-auto">
              <div className="absolute top-2 left-2 z-10 bg-black/50 px-2 py-1 rounded text-xs text-white">You</div>
              {localPeer && <VideoTile peer={localPeer} isLocal={true} />}
            </div>

            <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-emerald-900/20 flex items-center justify-center aspect-video sm:aspect-auto">
              <div className="absolute top-2 left-2 z-10 bg-black/50 px-2 py-1 rounded text-xs text-white">Participant</div>
              {peers.find((p) => !p.isLocal) ? (
                <VideoTile peer={peers.find((p) => !p.isLocal)} isLocal={false} />
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  <User className="h-16 w-16 mx-auto opacity-20 mb-2" />
                  <p className="text-sm">Waiting for others to join...</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-4 py-4 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/5">
            <Button
              variant="outline"
              size="icon"
              onClick={() => hmsActions.setLocalVideoEnabled(!localPeer?.videoEnabled)}
              className={`rounded-full ${!localPeer?.videoEnabled ? "bg-red-500/20 border-red-500" : "bg-slate-800"}`}
            >
              {localPeer?.videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5 text-red-500" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => hmsActions.setLocalAudioEnabled(!localPeer?.audioEnabled)}
              className={`rounded-full ${!localPeer?.audioEnabled ? "bg-red-500/20 border-red-500" : "bg-slate-800"}`}
            >
              {localPeer?.audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5 text-red-500" />}
            </Button>
            <Button variant="destructive" size="icon" onClick={endCall} className="rounded-full shadow-lg shadow-red-500/20">
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1 bg-slate-900 rounded-xl border border-emerald-900/20 flex flex-col overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-emerald-900/20 font-semibold text-emerald-400 bg-slate-800/50 flex justify-between items-center">
            <span>Live Chat</span>
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {allMessages.map((msg, i) => {
              const isMyMessage = msg.senderUserId === localPeer?.customerUserId || msg.senderName === "You";
              return (
                <div key={i} className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"}`}>
                  <span className="text-[10px] mb-1 opacity-50 px-1 font-medium">{isMyMessage ? "You" : msg.senderName}</span>
                  <p className={`p-2 px-3 rounded-2xl text-sm max-w-[85%] break-words shadow-md ${isMyMessage ? "bg-emerald-600 text-white rounded-tr-none" : "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700"}`}>
                    {msg.message}
                  </p>
                </div>
              );
            })}
          </div>

          <form onSubmit={sendMessage} className="p-4 bg-slate-800/50 border-t border-emerald-900/10 flex gap-2">
            <input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-emerald-500 text-white"
            />
            <Button type="submit" size="icon" className="bg-emerald-600 hover:bg-emerald-700 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}