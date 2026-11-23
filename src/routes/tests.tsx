import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/tests")({
  head: () => ({ meta: [{ title: "Tests — Nexus Study" }, { name: "description", content: "Practice tests to check what you learned." }, { property: "og:title", content: "Tests — Nexus Study" }, { property: "og:description", content: "Practice tests to check what you learned." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Tests,
});

const qs = [
  { q: "What is the time complexity of binary search?", o: ["O(n)", "O(log n)", "O(n²)", "O(1)"], a: 1 },
  { q: "What is the derivative of x²?", o: ["x", "2x", "x²/2", "2"], a: 1 },
  { q: "Which pattern ensures a class has only one instance?", o: ["Observer", "Factory", "Singleton", "Adapter"], a: 2 },
];

function Tests() {
  const [ans, setAns] = useState<Record<number, number>>({});
  const score = qs.filter((q, i) => ans[i] === q.a).length;
  return (
    <>
      <PageHero kicker="Tests" title="Test yourself" text="Try this quick sample quiz. Full tests for each course are coming soon." />
      <div className="mx-auto grid w-[min(800px,92%)] gap-6">
        {qs.map((q, i) => (
          <div key={i} className="glass rounded-2xl p-6">
            <h3 className="font-semibold">{i + 1}. {q.q}</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {q.o.map((o, j) => {
                const picked = ans[i] === j; const done = ans[i] !== undefined;
                const cls = done && j === q.a ? "border-primary bg-primary/20" : picked ? "border-destructive bg-destructive/20" : "hover:bg-muted";
                return <button key={o} disabled={done} onClick={() => setAns({ ...ans, [i]: j })} className={"rounded-xl border px-4 py-3 text-left transition " + cls}>{o}</button>;
              })}
            </div>
          </div>
        ))}
        <p className="text-center font-display text-2xl">Score: <span className="text-gradient font-bold">{score}/{qs.length}</span></p>
      </div>
    </>
  );
}
