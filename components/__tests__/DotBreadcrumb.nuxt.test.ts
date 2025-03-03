import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/vue";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import DotBreadcrumb from "../DotBreadcrumb.vue";
import { createRouter, createMemoryHistory } from "vue-router";
import type { Router } from "vue-router";

const routes = [
  { path: "/", name: "home", component: { template: "<div>Home</div>" } },
  {
    path: "/teams",
    name: "teams",
    component: { template: "<div>Teams</div>" },
  },
];

let router: Router;

beforeEach(async () => {
  router = createRouter({
    history: createMemoryHistory(),
    routes,
  });
  await router.push("/");
});

describe("DotBreadcrumb", () => {
  it("renders home and items correctly", async () => {
    const home = { label: "Home", route: "/", icon: "pi pi-home" };
    const items = [{ label: "Teams", route: "/teams", icon: "pi pi-users" }];

    await renderSuspended(DotBreadcrumb, {
      props: { home, items },
      global: {
        plugins: [router],
      },
    });

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Teams")).toBeInTheDocument();
  });

  it("renders external links correctly", async () => {
    const home = { label: "Home", route: "/" };
    const items = [
      { label: "External", url: "https://example.com", target: "_blank" },
    ];

    await renderSuspended(DotBreadcrumb, {
      props: { home, items },
      global: {
        plugins: [router],
      },
    });

    const externalLink = screen.getByText("External");
    expect(externalLink.closest("a")).toHaveAttribute(
      "href",
      "https://example.com",
    );
    expect(externalLink.closest("a")).toHaveAttribute("target", "_blank");
  });
});
