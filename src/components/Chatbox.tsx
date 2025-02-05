import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    if (message.trim() === '') return;

    // Process the message here (e.g., send to an API or update state)
    console.log('User message:', message);

    // Clear the input after sending
    setMessage('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // If Enter is pressed without Shift, send the message
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="p-4 w-full">
      <textarea
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={2}
        placeholder="What would you like to improve on?"
        className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <button
        onClick={handleSend}
        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  );
};

export default ChatBox;
