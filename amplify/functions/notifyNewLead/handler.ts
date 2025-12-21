import type { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  console.log("New lead event:", JSON.stringify(event));
  return { ok: true };
};
