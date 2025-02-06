import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { OpenAI } from 'openai';
import { ChatCompletionTool } from 'openai/resources/index.mjs';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const tools: ChatCompletionTool[] = [{
    'type': 'function',
    'function': {
      'name': 'get_plan',
      'description': 'Create a habit plan for the user.',
      'parameters': {
        'type': 'object',
        'properties': {
          'message': {
            'type': 'string',
            'description': 'Message that will be displayed to the user.'
          },
          'frequency': {
            'type': 'object',
            'description': 'Days of the week that are allocated to the habit.',
            'properties': {
              'sun': { 'type': 'boolean' },
              'mon': { 'type': 'boolean' },
              'tue': { 'type': 'boolean' },
              'wed': { 'type': 'boolean' },
              'thu': { 'type': 'boolean' },
              'fri': { 'type': 'boolean' },
              'sat': { 'type': 'boolean' }
            },
            'required': ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            'additionalProperties': false
          },
          'time': {
            'type': 'object',
            'description': 'Amount of time recommended for the habit, in hours and minutes',
            'properties': {
              'hrs': { 'type': 'number'},
              'mins': { 'type': 'number'},
            },
            'required': ['hrs', 'mins'],
            'additionalProperties': false
          }
        },
        'required': ['message', 'frequency', 'time'],
        'additionalProperties': false
      },
      'strict': true
    }
  }];

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
            content:
              'You are to help the user develop a habit plan to improve whatever they request. If the content has nothing to do with habits, self-improvement, or improvement of a skill, create an example. Create a schedule based on the tools provided, as a JSON object.'
          },
          { role: 'user', content: message }
        ],
        tools,
        store: true,
      });

      // Retrieving call
      const toolCall = chatCompletion.choices[0]?.message?.tool_calls?.[0];

      if (toolCall && toolCall.type === 'function') {
        const functionArgs = JSON.parse(toolCall.function.arguments);
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
        <div className="mt-4 border rounded-lg bg-gray-800 text-white">
          <strong>ChatGPT:</strong> {response}
        </div>
      )}

    </div>
  );
};

export default ChatBox;
