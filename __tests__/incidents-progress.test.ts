import { computeChecklistProgress, groupChecklistByPhase } from "@/lib/incidentProgress";
import type { ChecklistPhase } from "@/lib/incidentPlaybooks";

type TestItem = { id: string; phase: ChecklistPhase; label: string; is_done: boolean };

function item(overrides: Partial<TestItem> = {}): TestItem {
  return {
    id: "item-1",
    phase: "detection",
    label: "Test item",
    is_done: false,
    ...overrides,
  };
}

describe("computeChecklistProgress", () => {
  it("returns 0/0/0 for an empty checklist", () => {
    expect(computeChecklistProgress([])).toEqual({ done: 0, total: 0, percent: 0 });
  });

  it("counts done items and computes a rounded percentage", () => {
    const items = [
      item({ is_done: true }),
      item({ is_done: true }),
      item({ is_done: false }),
    ];
    expect(computeChecklistProgress(items)).toEqual({ done: 2, total: 3, percent: 67 });
  });

  it("returns 100% when every item is done", () => {
    const items = [item({ is_done: true }), item({ is_done: true })];
    expect(computeChecklistProgress(items)).toEqual({ done: 2, total: 2, percent: 100 });
  });
});

describe("groupChecklistByPhase", () => {
  it("groups items under their phase, preserving order within a phase", () => {
    const items = [
      item({ id: "a", phase: "detection", label: "A" }),
      item({ id: "b", phase: "containment", label: "B" }),
      item({ id: "c", phase: "detection", label: "C" }),
    ];

    const grouped = groupChecklistByPhase(items);

    expect(grouped.detection?.map((i) => i.id)).toEqual(["a", "c"]);
    expect(grouped.containment?.map((i) => i.id)).toEqual(["b"]);
    expect(grouped.eradication).toBeUndefined();
  });

  it("returns an empty object for an empty checklist", () => {
    expect(groupChecklistByPhase([])).toEqual({});
  });
});
