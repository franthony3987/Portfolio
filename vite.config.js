import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

const entry = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: entry('./index.html'),
        aiMultiAgentPlatform: entry('./projects/ai-multi-agent-platform/index.html'),
        aiAutomationSystem: entry('./projects/ai-automation-system/index.html'),
        aiDecisionEngine: entry('./projects/ai-decision-engine/index.html'),
        multiPlatformSocialMediaPublishingSaas: entry('./projects/multi-platform-social-media-publishing-saas/index.html'),
        fullStackSaasApplication: entry('./projects/full-stack-saas-application/index.html'),
      },
    },
  },
});
