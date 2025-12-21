import { a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  UserProfile: a
    .model({
      userId: a.id().required(),
      fullName: a.string().required(),
      phone: a.string(),
      role: a.enum(["CLIENT", "BUILDER", "ARTISAN", "ADMIN"]).required(),
      countryOfResidence: a.string(),
      diasporaCountry: a.enum(["NG", "UK", "US", "OTHER"]),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .identifier(["userId"])
    .authorization((allow) => [allow.ownerDefinedIn("userId"), allow.group("Admins")]),

  Lead: a
    .model({
      id: a.id().required(),
      fullName: a.string().required(),
      email: a.email().required(),
      phone: a.string(),
      diasporaCountry: a.enum(["UK", "US", "OTHER"]).required(),
      projectCity: a.enum(["LAGOS", "BENIN", "PORT_HARCOURT"]).required(),
      projectType: a.enum(["NEW_BUILD", "RENOVATION", "EXTENSION", "OTHER"]).required(),
      budgetRange: a.enum(["LOW", "MID", "HIGH", "UNSPECIFIED"]),
      timeline: a.string(),
      details: a.string().required(),
      status: a.enum(["NEW", "CONTACTED", "QUALIFIED", "CLOSED"]).default("NEW"),
      createdAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.authenticated().to(["create"]),
      allow.group("Admins").to(["read", "update", "delete"]),
    ]),

  Pro: a
    .model({
      id: a.id().required(),
      ownerUserId: a.id().required(),
      displayName: a.string().required(),
      trade: a.enum([
        "BUILDER",
        "ARCHITECT",
        "ENGINEER",
        "PLUMBER",
        "ELECTRICIAN",
        "TILER",
        "PAINTER",
        "CARPENTER",
        "OTHER",
      ]).required(),
      city: a.enum(["LAGOS", "BENIN", "PORT_HARCOURT"]).required(),
      bio: a.string(),
      yearsExperience: a.integer(),
      verificationStatus: a.enum(["PENDING", "VERIFIED", "REJECTED"]).default("PENDING"),
      ratingAvg: a.float(),
      jobsCompleted: a.integer().default(0),
      profilePhotoKey: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .secondaryIndexes((index) => [
      index("city").sortKeys(["verificationStatus"]),
      index("trade").sortKeys(["city"]),
      index("ownerUserId"),
    ])
    .authorization((allow) => [
      allow.ownerDefinedIn("ownerUserId").to(["create", "read", "update"]),
      allow.group("Admins").to(["create", "read", "update", "delete"]),
      allow.guest().to(["read"]),
    ]),

  Project: a
    .model({
      id: a.id().required(),
      clientUserId: a.id().required(),
      title: a.string().required(),
      city: a.enum(["LAGOS", "BENIN", "PORT_HARCOURT"]).required(),
      addressHint: a.string(),
      description: a.string().required(),
      status: a.enum(["DRAFT", "ACTIVE", "PAUSED", "COMPLETED"]).default("DRAFT"),
      assignedProId: a.id(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .secondaryIndexes((index) => [
      index("clientUserId").sortKeys(["createdAt"]),
      index("city").sortKeys(["createdAt"]),
      index("assignedProId").sortKeys(["createdAt"]),
    ])
    .authorization((allow) => [
      allow.ownerDefinedIn("clientUserId"),
      allow.group("Admins"),
    ]),

  ProjectUpdate: a
    .model({
      id: a.id().required(),
      projectId: a.id().required(),
      authorUserId: a.id().required(),
      message: a.string().required(),
      mediaKey: a.string(),
      createdAt: a.datetime(),
    })
    .secondaryIndexes((index) => [index("projectId").sortKeys(["createdAt"])])
    .authorization((allow) => [
      allow.ownerDefinedIn("authorUserId").to(["create", "read"]),
      allow.group("Admins").to(["read", "delete"]),
    ]),
});

export const data = defineData({
  schema,
});
