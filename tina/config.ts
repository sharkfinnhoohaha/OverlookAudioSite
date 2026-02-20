import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        fields: [
          // Hero Section
          {
            type: "string",
            name: "heroHeadline",
            label: "Hero Headline",
            description: "Supports <br /> for line breaks",
          },
          {
            type: "string",
            name: "heroSubheadline",
            label: "Hero Subheadline",
          },
          // Philosophy Section
          {
            type: "string",
            name: "philosophyMain",
            label: "Philosophy Main Text",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "philosophyAccent",
            label: "Philosophy Accent Text",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "approachText",
            label: "The Approach Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "executionText",
            label: "The Execution Description",
            ui: { component: "textarea" },
          },
          // Capabilities Section (Object List)
          {
            type: "object",
            list: true,
            name: "capabilities",
            label: "Capabilities",
            ui: {
              itemProps: (item) => {
                return { label: item?.title };
              },
            },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
            ],
          },
          // Footer / Contact
          {
            type: "string",
            name: "contactEmail",
            label: "Contact Email",
          },
          {
            type: "string",
            name: "instagramUrl",
            label: "Instagram URL",
          },
          {
            type: "string",
            name: "linkedinUrl",
            label: "LinkedIn URL",
          },
        ],
      },
    ],
  },
});