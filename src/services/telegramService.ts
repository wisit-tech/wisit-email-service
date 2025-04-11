// src/services/telegramService.ts

import { config } from '../utils/config';

/**
 * Sends an alert message on Telegram using the Bot API.
 *
 * @param channelId - The Telegram chat or channel ID where the alert will be sent
 * @param message - The alert message to be sent
 * @throws Will throw an error if sending the alert fails
 */
export const sendTelegramAlert = async (
  channelId: string,
  message: string
): Promise<void> => {
  try {
    console.log(config.telegram.api_key);
    const url = `https://api.telegram.org/bot${config.telegram.api_key}/sendMessage`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        chat_id: channelId,
        text: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error sending alert: ${errorText}`);
      throw new Error("Failed to send Telegram alert");
    }
    
    console.log(`Telegram alert sent to channel ${channelId}: ${message}`);
  } catch (error) {
    console.error("Error in sending Telegram alert:", error);
    throw new Error("Failed to send Telegram alert");
  }
};
