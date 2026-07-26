import { describe, expect, it } from "vitest";
import { projects } from "../src/lib/projects";

describe("portfolio project data", () => {
  it("contains five uniquely ordered projects with unique slugs", () => {
    expect(projects).toHaveLength(5);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((project) => project.order)).size).toBe(projects.length);
    expect(projects.map((project) => project.order)).toEqual([1, 2, 3, 4, 5]);
  });

  it("gives every repository-ready project an HTTPS GitHub link", () => {
    for (const project of projects.filter((item) => item.repositoryReady)) {
      const repositoryLink = project.links.find((link) =>
        link.href.startsWith("https://github.com/Meettala/"),
      );
      expect(repositoryLink, project.title).toBeDefined();
      expect(repositoryLink?.external).toBe(true);
      expect(project.status).toBe("verified");
    }
  });

  it("does not claim a public live demo for any unverified deployment", () => {
    for (const project of projects) {
      expect(project.liveDemoAvailable).toBe(false);
      expect(project.links.some((link) => /live|try/i.test(link.label))).toBe(false);
    }
  });

  it("records safety notes and honest limitations for every case study", () => {
    for (const project of projects) {
      expect(project.safetyNotes.length).toBeGreaterThanOrEqual(3);
      expect(project.limitations.length).toBeGreaterThanOrEqual(2);
      expect(project.approach.length).toBeGreaterThanOrEqual(4);
    }
  });
});
