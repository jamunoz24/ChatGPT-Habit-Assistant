import { ChatCompletionTool } from "openai/resources/index.mjs";

export const functionDefinitions: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_plan",
      description: "Create a habit plan for the user.",
      parameters: {
        type: "object",
        properties: {
          habit_name: {
            type: "string",
            description: "Name of the habit the user wants to currently work on."
          },
          emoji: {
            type: "string",
            description: "Emoji representing the habit."
          },
          frequency: {
            type: "object",
            description: "Days of the week that are allocated to the habit.",
            properties: {
              sun: { type: "boolean" },
              mon: { type: "boolean" },
              tue: { type: "boolean" },
              wed: { type: "boolean" },
              thu: { type: "boolean" },
              fri: { type: "boolean" },
              sat: { type: "boolean" }
            },
            required: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
            additionalProperties: false
          },
          time: {
            type: "object",
            description: "Amount of time recommended for the habit, in hours and minutes",
            properties: {
              hrs: { type: "number" },
              mins: { type: "number" }
            },
            required: ["hrs", "mins"],
            additionalProperties: false
          },
          message: {
            type: "string",
            description: "Message that will be displayed to the user."
          }
        },
        required: ["message", "frequency", "time", "habit_name", "emoji"],
        additionalProperties: false
      },
      strict: true
    }
  }
];
