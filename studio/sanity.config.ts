import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;
const studioHost = process.env.SANITY_STUDIO_STUDIO_HOST;
const corsOrigins = process.env.SANITY_STUDIO_CORS_ORIGINS;
const basePath = process.env.SANITY_STUDIO_BASE_PATH;

export default defineConfig({
  name: "default",
  title: "Sanity Studio",
  projectId: projectId!,
  dataset: dataset!,
  basePath: '/studio',
  cors: {
    credentials: 'include',
    origin: corsOrigins ? corsOrigins.split(',').map(origin => origin.trim()) : ['http://localhost:3000', 'http://localhost:3001'],
  } as any,
  plugins: [structureTool(), visionTool()],
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
