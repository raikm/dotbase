import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/vue";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import DotMenu from "../DotMenu.vue";

const mockUser = {
  firstName: "John",
  lastName: "Doe",
  role: "Developer",
};

describe("DotMenu", () => {
  it("renders user information correctly", async () => {
    await renderSuspended(DotMenu, {
      props: {
        user: mockUser,
      },
    });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
  });

  it("renders the app title", async () => {
    await renderSuspended(DotMenu, {
      props: {
        user: mockUser,
      },
    });

    expect(screen.getByText("Dotbase Coding Challenge")).toBeInTheDocument();
  });
});
