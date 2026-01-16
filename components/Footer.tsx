import { COMPLIANCE, CONTACT_EMAIL } from '@/lib/constants';
import { StaticLogo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="py-16 px-6 bg-navy-950 text-white/60">
      <div className="max-w-4xl mx-auto text-center">
        <StaticLogo className="w-12 h-12 mx-auto mb-8 opacity-40" />

        <p className="text-sm">{COMPLIANCE.firm}</p>

        <p className="mt-4 text-xs max-w-2xl mx-auto leading-relaxed">
          {COMPLIANCE.risk}
        </p>

        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-xs">
            &copy; {COMPLIANCE.year} Coreline Partners. All rights reserved.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-block text-xs text-white/40 hover:text-white/60 transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
