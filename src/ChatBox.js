import React from 'react';

const ChatBox = ({
      sendMessage,
      clearMessages,
      disconnect,
      connect,
      setMessage,
      connected,
      myMessage,
      allMessages,
    }) =>
      <div className="chatbox">
        <h2>you are {connected ? 'connected' : 'not connected'}</h2>
        <form onSubmit={sendMessage}>
          <input value={myMessage} onChange={(e) => { setMessage(e.target.value); }} />
        </form>
        <button onClick={sendMessage}>click to send message</button>
        <button onClick={clearMessages}>click to clear messages</button>
        <div>
          {allMessages.map((message, i) =>
            <p key={i}>{message}</p>)}
          {
        connected ?
          <button onClick={disconnect}>disconnect</button>
        :
          <button onClick={connect}>reconnect</button>
        }

        </div>
      </div>;

export default ChatBox;
