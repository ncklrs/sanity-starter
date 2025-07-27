import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { assist } from "@sanity/assist";
import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schemaTypes";

// Validate required environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wf6g5hjm';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Only throw errors in production
if (process.env.NODE_ENV === 'production') {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID');
  }
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_DATASET');
  }
}

const corsOrigins = process.env.SANITY_STUDIO_CORS_ORIGINS;
const basePath = process.env.SANITY_STUDIO_BASE_PATH;

export default defineConfig({
  name: "default",
  title: "Sanity Studio",
  projectId,
  dataset,
  basePath: '/studio',
  cors: {
    credentials: 'include',
    origin: corsOrigins ? corsOrigins.split(',').map(origin => origin.trim()) : ['http://localhost:3000', 'http://localhost:3001'],
  } as any,
  plugins: [
    structureTool(),
    visionTool(),
    assist(),
    codeInput(),
    colorInput(),
    media(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Prevent new document types from being created
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'post')
      }
      return prev
    },
  },
});
