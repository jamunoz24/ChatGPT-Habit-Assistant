import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { OpenAI } from 'openai';
import { functionDefinitions } from '../utils/functionDefinitions';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const ChatBox: React.FC<{ setHabitPlan: (plan: any) => void }> = ({ setHabitPlan }) => {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    // Check for empty string
    if (message.trim() === '') return;

    // Process the message here (e.g., send to an API or update state)
    console.log('User message:', message);

    setLoading(true);

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'developer', 
            content:
              'You are to help the user develop a habit plan to improve whatever they request. If the content has nothing to do with habits, self-improvement, or improvement of a skill, create an example. Create a schedule based on the tools provided, as a JSON object. The time allocated to the habit should be the same each day. Fill out the message field last, and in it explain to the user what the weekly schedule consists of.'
          },
          { role: 'user', content: message }
        ],
        tools: functionDefinitions,
        store: true,
      });

      // Retrieving call
      const toolCall = chatCompletion.choices[0]?.message?.tool_calls?.[0];

      if (toolCall && toolCall.type === 'function') {
        const functionArgs = JSON.parse(toolCall.function.arguments);
        setHabitPlan(functionArgs);
        console.log(functionArgs);

        setResponse(functionArgs.message);
      }

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
        <div className="mt-4 border rounded-lg bg-gray-900 text-white">
          <strong>ChatGPT:</strong> {response}
        </div>
      )}

    </div>
  );
};

export default ChatBox;
