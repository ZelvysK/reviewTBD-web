import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schema.graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        scalars: {
          Date: {
            input: "Date",
            output: "Date",
          },
          UUID: {
            input: "string",
            output: "string",
          },
        },
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
