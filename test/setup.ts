import "@testing-library/jest-dom/vitest";
import { config } from "@vue/test-utils";
import { defaultOptions } from "primevue/config";

config.global.mocks["$primevue"] = {
  config: defaultOptions,
};
