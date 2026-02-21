import { defineConfig } from "tinacms";

// We use process.env here because the Tina CLI runs in Node.js
const branch = process.env.VITE_TINA_BRANCH || "main";
const clientId = process.env.VITE_TINA_CLIENT_ID;
const token = process.env.VITE_TINA_TOKEN;

export default defineConfig({
  branch,
  clientId,
  token,
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
          { type: "string", name: "heroHeadline", label: "Hero Headline" },
          { type: "string", name: "heroSubheadline", label: "Hero Subheadline" },
          { type: "string", name: "philosophyMain", label: "Philosophy Main Text", ui: { component: "textarea" } },
          { type: "string", name: "philosophyAccent", label: "Philosophy Accent Text", ui: { component: "textarea" } },
          { type: "string", name: "approachText", label: "The Approach Description", ui: { component: "textarea" } },
          { type: "string", name: "executionText", label: "The Execution Description", ui: { component: "textarea" } },
          {
            type: "object",
            list: true,
            name: "capabilities",
            label: "Capabilities",
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "contactEmail", label: "Contact Email" },
          { type: "string", name: "instagramUrl", label: "Instagram URL" },
          { type: "string", name: "linkedinUrl", label: "LinkedIn URL" },
        ],
      },
    ],
  },
});