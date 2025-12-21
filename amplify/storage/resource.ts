import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "47buildersStorage",
  access: (allow) => ({
    "public/profiles/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read"]),
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
    "protected/projects/*": [
      allow.authenticated.to(["read", "write", "delete"]),
    ],
  }),
});
