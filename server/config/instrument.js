// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
Sentry.init({
    dsn: "https://05673f2d46ca3e3d6da2579d5dbd0c00@o4509920466436096.ingest.us.sentry.io/4509920642007040",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
   integrations: [
   Sentry.mongooseIntegration()
  ],
  //tracesSampleRate: 1.0,
});

Sentry.profiler.startProfiler();


