// __tests__/scheduled-exams.test.ts
// Booked Salesforce exams: label switch after the exam day, and a reminder
// that fails one week after an exam so the result gets recorded (FAQ,
// About page, content/certifications.ts) instead of lingering as "booked".

import { SCHEDULED_EXAMS, examTargetLabel, isExamPast } from "@/content/certifications";

const exam = SCHEDULED_EXAMS.platformFoundations; // 2026-12-29

describe("isExamPast", () => {
  it("is false on the exam day itself (Paris time)", () => {
    expect(isExamPast(exam, new Date("2026-12-29T22:59:00Z"))).toBe(false); // 23:59 Paris
  });
  it("is true from midnight Paris time the day after", () => {
    expect(isExamPast(exam, new Date("2026-12-29T23:00:00Z"))).toBe(true); // 00:00 Paris
  });
});

describe("examTargetLabel", () => {
  const before = new Date("2026-12-01T12:00:00Z");
  const after = new Date("2027-01-02T12:00:00Z");
  it("shows 'late December 2026' before the exam, never the exact date", () => {
    expect(examTargetLabel(exam, "fr", before)).toBe("Examen prévu fin décembre 2026");
    expect(examTargetLabel(exam, "en", before)).toBe("Exam planned for late December 2026");
    expect(examTargetLabel(exam, "es", before)).toBe("Examen previsto para finales de diciembre de 2026");
  });
  it("switches to 'result pending' afterwards", () => {
    expect(examTargetLabel(exam, "fr", after)).toBe("Examen passé fin décembre 2026 — résultat à venir");
    expect(examTargetLabel(exam, "en", after)).toBe("Exam taken in late December 2026 — result pending");
    expect(examTargetLabel(exam, "es", after)).toBe("Examen realizado a finales de diciembre de 2026 — resultado pendiente");
  });
});

describe("no exact exam date is published", () => {
  it("labels never show the day of the exam", () => {
    for (const e of Object.values(SCHEDULED_EXAMS)) {
      for (const label of [e.fr, e.en, e.es]) expect(label).not.toMatch(/\b(29|30)\b/);
    }
  });
});

describe("reminder: record exam results", () => {
  it.each(Object.entries(SCHEDULED_EXAMS))(
    "%s is not more than a week in the past",
    (_key, e) => {
      const deadline = new Date(`${e.iso}T00:00:00+01:00`);
      deadline.setUTCDate(deadline.getUTCDate() + 8);
      // Failing here means: the exam happened over a week ago. Move it to
      // `certifications` (or reschedule it) and update the FAQ and About page.
      expect(Date.now()).toBeLessThan(deadline.getTime());
    }
  );
});
