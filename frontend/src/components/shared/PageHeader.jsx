function PageHeader({ title, description, action }) {
  return (
    <section className="frosted-panel relative flex flex-col justify-between gap-4 overflow-hidden rounded-3xl p-6 md:flex-row md:items-center">
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="flex flex-col">
        <div className="mb-1 flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-cyan-400">
            Registry Ops Terminal
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
          <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-slate-400">
            SYS-REV-26.11
          </span>
        </div>

        <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-[13px] text-slate-300">
            {description}
          </p>
        )}
      </div>

      {action && <div className="flex items-center gap-3 flex-wrap">{action}</div>}
    </section>
  );
}

export default PageHeader;
