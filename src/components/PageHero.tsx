export function PageHero({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <section className="mx-auto w-[min(1100px,92%)] pb-10 pt-20 animate-rise">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{kicker}</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-6xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{text}</p>
    </section>
  );
}
