import { describe, expect, it } from "vitest";
import { projects } from "../src/lib/projects";

describe("portfolio project data", () => {
  it("contains five uniquely ordered projects in recruiter-first order", () => {
    expect(projects).toHaveLength(5);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((project) => project.order)).size).toBe(projects.length);
    expect(projects.map((project) => project.order)).toEqual([1, 2, 3, 4, 5]);
    expect(projects.map((project) => project.slug)).toEqual([
      "jobpilot-ai",
      "llm-business-insight-assistant",
      "rag-research-assistant",
      "job-market-skill-analyzer",
      "ml-prediction-app",
    ]);
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

  it("points the Skill Analyzer at the actual repository", () => {
    const project = projects.find((item) => item.slug === "job-market-skill-analyzer");
    expect(project?.links.some((link) => link.href === "https://github.com/Meettala/job-market-skill-analyzer")).toBe(true);
    expect(project?.links.some((link) => link.href.includes("ai-job-market-skill-analyzer"))).toBe(false);
  });

  it("requires live-demo links to match verified demo availability", () => {
    for (const project of projects) {
      const demoLinks = project.links.filter((link) => /live|try/i.test(link.label));
      if (project.liveDemoAvailable) {
        expect(demoLinks.length, project.title).toBeGreaterThan(0);
      } else {
        expect(demoLinks, project.title).toHaveLength(0);
      }
    }
  });

  it("records recruiter evidence and honest limitations for every case study", () => {
    for (const project of projects) {
      expect(project.highlights.length).toBeGreaterThanOrEqual(2);
      expect(project.verificationSignal.trim().length).toBeGreaterThan(40);
      expect(project.safetyNotes.length).toBeGreaterThanOrEqual(3);
      expect(project.limitations.length).toBeGreaterThanOrEqual(2);
      expect(project.approach.length).toBeGreaterThanOrEqual(4);
    }
  });
});
