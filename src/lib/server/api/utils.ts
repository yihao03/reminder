import type { ApiResponse } from ".";

export function getResponseMessages(response: ApiResponse<any>): string {
  return response.messages?.length > 0
    ? response.messages.map((message) => message.content).join(" : ")
    : "-";
}
