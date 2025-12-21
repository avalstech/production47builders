import { defineFunction } from "@aws-amplify/backend";

export const notifyNewLead = defineFunction({
  name: "notifyNewLead",
  entry: "./handler.ts",
  environment: {
    TO_EMAIL: "leads@47builders.uk",
  },
});
