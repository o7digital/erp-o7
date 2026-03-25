import { describe, expect, it } from "vitest";

import { pipelineDemoDeals, pipelineDemoWorkflows } from "@/lib/pipeline-demo-data";
import { filterPipelineDeals, getPipelineColumns, getPipelineSummary } from "@/lib/pipeline-utils";

describe("pipeline-utils", () => {
  it("computes open and total lead counts from the demo dataset", () => {
    expect(getPipelineSummary(pipelineDemoDeals)).toMatchObject({
      openLeads: 21,
      totalLeads: 24
    });
  });

  it("groups deals by stage and keeps stage totals dynamic", () => {
    const [workflow] = pipelineDemoWorkflows;
    const columns = getPipelineColumns(workflow.stages, pipelineDemoDeals);
    const propuesta = columns.find((column) => column.stage.id === "propuesta");

    expect(propuesta).toBeDefined();
    expect(propuesta?.dealCount).toBe(4);
    expect(propuesta?.totals).toEqual([
      { currency: "USD", amount: 3650 },
      { currency: "MXN", amount: 393488 }
    ]);
  });

  it("filters by owner, query and IA Pulse without mutating the source dataset", () => {
    const filtered = filterPipelineDeals(pipelineDemoDeals, {
      query: "Catalina",
      owner: "Valeria Cruz",
      status: "open",
      aiOnly: false
    });

    expect(filtered.map((deal) => deal.id)).toEqual(["deal-pipeline-012", "deal-pipeline-015"]);
    expect(pipelineDemoDeals).toHaveLength(24);
  });
});
