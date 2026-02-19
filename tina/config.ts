// tina/config.ts
import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main", // or whatever branch you use
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
          {
            type: "string",
            name: "heroHeadline",
            label: "Hero Headline",
            description: "Use <br /> for line breaks",
          },
          {
            type: "string",
            name: "heroSubheadline",
            label: "Hero Subheadline",
          },
          {
            type: "string",
            name: "philosophyMain",
            label: "Main Philosophy Text",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "philosophyAccent",
            label: "Philosophy Accent (Gray) Text",
            ui: { component: "textarea" },
          }
        ],
      },
    ],
  },
});