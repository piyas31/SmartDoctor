import HMSWrapper from "./hms-wrapper"; 
import VideoCall from "./video-call-ui";

export default async function VideoCallPage({ searchParams }) {
  const params = await searchParams;
  const sessionId = params.sessionId;
  const token = params.token;

  if (!token) {
    return <div className="text-white p-10">No token found...</div>;
  }

  return (
    <HMSWrapper>
      <VideoCall 
        key={token} 
        roomId={sessionId} 
        token={token} 
      />
    </HMSWrapper>
  );
}