//Video chat component using WebRTC.
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';
import styled from 'styled-components';

const socket = io.connect('http://localhost:5000'); // Replace with your server URL

const VideoChat = () => {
  const [peers, setPeers] = useState([]);
  const [stream, setStream] = useState();
  const [screenStream, setScreenStream] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [playbackUrl, setPlaybackUrl] = useState(null);
  const [isHost, setIsHost] = useState(false); // Determine if the user is a host
  const userVideo = useRef();
  const peersRef = useRef([]);
  const mediaRecorderRef = useRef(null);
  const messageEndRef = useRef(null);
  const roomId = 'your-room-id'; // Replace with your room ID logic

  useEffect(() => {
    // Initialization and media stream setup
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      userVideo.current.srcObject = stream;

      socket.emit('join room', roomId);
      socket.on('all users', users => {
        const peers = [];
        users.forEach(userID => {
          const peer = createPeer(userID, socket.id, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          });
          peers.push(peer);
        });
        setPeers(peers);
      });

      socket.on('user joined', payload => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        });

        setPeers(users => [...users, peer]);
      });

      socket.on('receiving returned signal', payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });

      socket.on('receive message', message => {
        setMessages(messages => [...messages, message]);
      });

      socket.on('host status', isHostStatus => {
        setIsHost(isHostStatus); // Update host status
      });
    });
  }, []);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socket.emit('sending signal', { userToSignal, callerID, signal });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socket.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  const startScreenShare = () => {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(screenStream => {
      setScreenStream(screenStream);

      peersRef.current.forEach(({ peer }) => {
        peer.replaceTrack(
          stream.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          stream
        );
      });

      screenStream.getTracks()[0].onended = () => {
        stopScreenShare();
      };
    });
  };

  const stopScreenShare = () => {
    screenStream.getTracks().forEach(track => track.stop());
    setScreenStream(null);

    peersRef.current.forEach(({ peer }) => {
      peer.replaceTrack(
        screenStream.getVideoTracks()[0],
        stream.getVideoTracks()[0],
        stream
      );
    });
  };

  const startRecording = () => {
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = event => {
      setRecordedChunks(prevChunks => [...prevChunks, event.data]);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setPlaybackUrl(url); // Set URL for playback
      setRecordedChunks([]);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const uploadRecording = () => {
    if (!recordedChunks.length) return;

    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('video', blob, 'recording.webm');

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded successfully', data);
        // Set playback URL after upload, if needed
        setPlaybackUrl(data.url); // Adjust this if your server provides the URL in a different format
      })
      .catch(error => console.error('Error uploading file:', error));
    
    setRecordedChunks([]);
  };

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      user: socket.id, // You can add more user info if needed
      text: message,
    };

    socket.emit('send message', newMessage);
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const endCall = () => {
    socket.emit('end call', roomId); // Notify server to end call
    window.location.href = '/'; // Redirect to another page or home
  };

  const muteParticipant = participantId => {
    socket.emit('mute participant', participantId);
  };

  const unmuteParticipant = participantId => {
    socket.emit('unmute participant', participantId);
  };

  const kickParticipant = participantId => {
    socket.emit('kick participant', participantId);
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <VideoChatContainer>
      <Navbar>
        <Logo onClick={() => (window.location.href = '/dashboard')}>Dashboard</Logo>
        <Controls>
          <button onClick={screenStream ? stopScreenShare : startScreenShare}>
            {screenStream ? 'Stop Sharing' : 'Share Screen'}
          </button>
          <button onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
          <button onClick={uploadRecording}>
            Upload Recording
          </button>
          <button>Mute</button>
          <button>Stop Video</button>
          {isHost && (
            <>
              <button onClick={() => endCall()}>End Call</button>
              <button onClick={() => muteParticipant('participant-id')}>Mute Participant</button>
              <button onClick={() => unmuteParticipant('participant-id')}>Unmute Participant</button>
              <button onClick={() => kickParticipant('participant-id')}>Kick Participant</button>
            </>
          )}
        </Controls>
      </Navbar>
      <Content>
        <VideoGrid>
          <VideoWrapper>
            <Video autoPlay playsInline ref={userVideo} />
          </VideoWrapper>
          {peers.map((peer, index) => (
            <VideoWrapper key={index}>
              <PeerVideo peer={peer} />
            </VideoWrapper>
          ))}
        </VideoGrid>
        <ChatContainer>
          <MessagesContainer>
            {messages.map((msg, index) => (
              <Message key={index}>
                <strong>{msg.user}: </strong> {msg.text}
              </Message>
            ))}
            <div ref={messageEndRef} />
          </MessagesContainer>
          <ChatInputContainer>
            <ChatInput
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <ChatButton onClick={sendMessage}>Send</ChatButton>
          </ChatInputContainer>
        </ChatContainer>
      </Content>
      {playbackUrl && (
        <PlaybackContainer>
          <PlaybackVideo controls src={playbackUrl} />
        </PlaybackContainer>
      )}
    </VideoChatContainer>
  );
};

const PeerVideo = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', stream => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return <Video ref={ref} autoPlay playsInline />;
};

const VideoChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #007bff;
  color: white;
`;

const Logo = styled.div`
  font-size: 1.5em;
  cursor: pointer;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  flex: 1;
  padding: 10px;
  background-color: #e9ecef;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid #ddd;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f8f9fa;
`;

const Message = styled.div`
  margin-bottom: 10px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #e9ecef;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const ChatButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const PlaybackContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
`;

const PlaybackVideo = styled.video`
  width: 100%;
  height: auto;
`;

export default VideoChat;
