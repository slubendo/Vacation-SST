import { StackContext, Api, StaticSite, Bucket } from "sst/constructs";

export function API({ stack }: StackContext) {
  const audience = `https://cloudrecipe.kinde.com/api`;

  const assetsBucket = new Bucket(stack, "assets");

  const api = new Api(stack, "api", {
    authorizers: {
      myAuthorizer: {
        type: "jwt",
        jwt: {
          issuer: "https://cloudrecipe.kinde.com",
          audience: [audience],
        },
      },
    },
    defaults: {
      authorizer: "myAuthorizer",
      function: {
        environment: {
          DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL!,
        },
      },
    },
    routes: {
      "GET /": {
        authorizer: "none",
        function: {
          handler: "packages/functions/src/lambda.handler",
        },
      },

      "GET /posts": "packages/functions/src/posts.handler",
      "POST /posts": "packages/functions/src/posts.handler",
      "DELETE /posts": "packages/functions/src/posts.handler",
      "POST /likes": "packages/functions/src/likes.handler",

      // "GET /csharp": {
      //   authorizer: "none",
      //   function: {
      //     handler: "packages/CSharp/Function",
      //     runtime: "container",
      //   },
      // },
      "POST /signed-url": {
        function: {
          environment: {
            ASSETS_BUCKET_NAME: assetsBucket.bucketName,
          },
          handler: "packages/functions/src/s3.handler",
        },
      },
    },
  });

  api.attachPermissionsToRoute("POST /signed-url", [assetsBucket, "grantPut"]);

  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
      VITE_APP_KINDE_AUDIENCE: audience,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteUrl: web.url,
  });
}
