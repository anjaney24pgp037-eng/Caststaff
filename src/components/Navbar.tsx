import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  dark: boolean;
  onToggleTheme: () => void;
}

const navLinks = [
  { label: 'Services', href: '#build' },
  { label: 'Readiness check', href: '#assess' },
  { label: 'Process', href: '#process' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar({ dark, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-900/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1160px] mx-auto px-6 flex items-center justify-between py-4">
        <a href="#top" className="font-stretched font-extrabold text-xl text-white tracking-tight">
          Cast<span className="text-mint">Staff</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onToggleTheme}
            className="text-white/70 hover:text-white transition-colors p-1.5"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="#call"
            className="inline-block px-4 py-2 rounded text-[15px] font-semibold bg-accent-light text-ink-900 hover:bg-mint transition-all duration-200 hover:scale-[1.03]"
          >
            Book a call
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onToggleTheme}
            className="text-white/70 hover:text-white transition-colors p-1.5"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="text-white p-1"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-ink-900/98 backdrop-blur-md border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white/80 hover:text-white py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#call"
              onClick={() => setMobileOpen(false)}
              className="inline-block text-center px-4 py-2.5 rounded font-semibold bg-accent-light text-ink-900 mt-2"
            >
              Book a call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
