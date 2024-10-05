import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './GroupChat.css';

const GroupChat = ({ socket, roomId, username }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      const messageData = {
        room: roomId,
        author: username,
        message: inputMessage,
        time: new Date(),
      };
      socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setInputMessage('');
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInputMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);

    const diffInDays = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (messageDate.getFullYear() === now.getFullYear()) {
      return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      return messageDate.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="group-chat">
      <div className="chat-header">
        <h3>Chat</h3>
      </div>
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((msg, index) => {
          const showDateSeparator =
            index === 0 || formatDate(messages[index].time) !== formatDate(messages[index - 1].time);

          return (
            <React.Fragment key={index}>
              {showDateSeparator && (
                <div className="date-separator">{formatDate(msg.time)}</div>
              )}
              <div className={`message ${msg.author === username ? 'sent' : 'received'}`}>
                <div className="message-content">
                  {msg.author !== username && <div className="message-author">{msg.author}</div>}
                  <p>{msg.message}</p>
                  <span className="message-time">{formatTime(msg.time)}</span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <form onSubmit={sendMessage} className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="emoji-button"
        >
          😊
        </button>
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
      {showEmojiPicker && (
        <div className="emoji-picker-container">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default GroupChat;

