export function Footer() {
  return (
    <div className="max-w-[1160px] mx-auto px-6">
      <footer className="py-8 text-[var(--mute)] text-sm flex flex-wrap items-center justify-between gap-4">
        <span className="font-stretched font-bold text-base text-ink-900 dark:text-white">
          Cast<span className="text-mint">Staff</span>
        </span>
        <p>AI and data consulting. Systems cast to last.</p>
        <a href="mailto:hello@caststaff.com" className="hover:text-accent transition-colors">
          hello@caststaff.com
        </a>
      </footer>
    </div>
  );
}
