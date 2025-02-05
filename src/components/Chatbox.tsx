import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (message.trim() === '') return;

    // Process the message here (e.g., send to an API or update state)
    console.log('User message:', message);

    setLoading(true);

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'developer', 
            content: 'You are to help the user develop a habit plan to improve whatever they request. If the content has nothing to do with habits, self-improvement, or improvement of a skill, simply tell the user to try again with one of these topics in mind.'},
          { role: 'user', content: message }],
      });

      setResponse(chatCompletion.choices[0]?.message?.content || 'No Response.');
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to fetch response.');
    }

    setLoading(false);
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
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>

      {/* Display ChatGPT Response */}
      {response && (
        <div className="mt-4 border rounded-lg bg-gray-800 text-white">
          <strong>ChatGPT:</strong> {response}
        </div>
      )}

    </div>
  );
};

export default ChatBox;
