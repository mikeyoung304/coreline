'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Container } from '@/components/ui/Container';

const philosophyPoints = [
  {
    title: 'Long-Term Vision',
    description:
      'We build portfolios designed to preserve and grow wealth across generations, not quarters.',
  },
  {
    title: 'Disciplined Approach',
    description:
      'Our investment process combines rigorous analysis with time-tested principles.',
  },
  {
    title: 'Aligned Interests',
    description:
      'We invest alongside our clients, ensuring our success is measured by yours.',
  },
];

export function About() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <Container>
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-navy-950 text-center tracking-tight">
            Our Philosophy
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 text-lg md:text-xl text-navy-800/70 text-center max-w-2xl mx-auto">
            At Coreline Partners, we believe exceptional returns come from exceptional patience and discipline.
          </p>
        </ScrollReveal>

        <div className="mt-20 grid gap-12 md:gap-16 md:grid-cols-3">
          {philosophyPoints.map((point, index) => (
            <ScrollReveal key={point.title} delay={0.15 + index * 0.1}>
              <div className="text-center md:text-left">
                <span className="text-sm font-medium text-navy-800/40 tracking-wide">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-xl font-medium text-navy-950 tracking-tight">
                  {point.title}
                </h3>
                <p className="mt-3 text-navy-800/60 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
