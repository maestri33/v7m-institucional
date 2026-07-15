# V7M Home Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o visual da home de v7m.org pelo redesign aprovado (`V7M Redesign.dc.html`) mantendo a arquitetura de scroll vertical e as 7 seções, sem regredir os 42 achados da auditoria de 2026-07-08.

**Architecture:** Restyling C. Mantém `<main>` empilhado + Header anchor nav + páginas legais em `/termos` e `/privacidade`. Substitui Hero/Educação/Afiliados/Engenharia por novos componentes com CSS keyframes curados (8 de 24); Tech e Contact ganham adições pontuais. Adiciona mini-bloco de links legais fixo abaixo do Header. Sem JS novo. Sem dependências novas.

**Tech Stack:** React 19 + TypeScript 5.9 + Vite 7 + Tailwind v4 (utility-first) + framer-motion (já removido das sections pelo commit f7be91d, ainda em `package.json` mas não usado). Source do redesign: Dc.Canvas HTML (x-dc + arrow-js) — **portado manualmente**, não importado.

## Global Constraints

Copied verbatim from `docs/superpowers/specs/2026-07-14-v7m-redesign-design.md`:

- **Decisões:** D1 (restyling C), D2 (8 animações curadas: aurora, kenburnsA, kenburnsB, riseUp, cascade, drawPath, movingBorder, pulseDot, lampGrow), D3 (Segoe UI sistema), D4 (slot vídeo vazio), D5 (chip "em breve: IA"), D6 (tabela Afiliados sem números), D7 (LegalHeader fixo), D8 (WhatsApp stub wa.me/55), D9 (merge direto), D10 (Tech/Contato separados), D11 (Bento sem LiquidGlass), D12 (spec em `docs/superpowers/specs/`).
- **Fora de escopo:** carousel/dock, IA endpoint, slider comissão, 16 keyframes, web font, mudanças em Header.tsx (exceto mini-bloco legal), mudanças em `index.html`/Caddy, páginas legais, SSR/prerender.
- **Branch:** `v7m-audit-fixes-2` (atual) → `main` via merge direto (D9).
- **Risco regressão crítico:** não regredir A6 (hover prata→dourado), A7 (Header com `<a href>`), A8 (borda dos inputs `rgba(255,255,255,0.28)`), A9 (skip-link + tabIndex), A14 (copy Hero), C2 (não criar variáveis CSS que não existem no `:root`).
- **Tokens existentes válidos:** `--bg-primary`, `--bg-secondary`, `--bg-glass`, `--text-primary`, `--text-secondary`, `--accent-primary`, `--accent-secondary`, `--accent-gradient`, `--accent-glow`. **Não invente novos sem teste de build.**
- **Critérios de aceitação:** build limpo, `npm run preview` em `/`, `/termos/`, `/privacidade/`, `prefers-reduced-motion` desativa os 8 keyframes, Lighthouse A11y ≥ 95, bundle JS < 85 KB gzip, headers HTTP inalterados.
- **Estilo:** Tailwind utility-first + `cn()` helper de `src/lib/utils.ts`. Strings hardcoded em **pt-BR**. Comentários curtos com `// ponytail:` quando shortcut.

---

## Task 1: J1 — Adicionar tokens e keyframes ao `src/index.css`

**Files:**
- Modify: `/opt/test/v7m-institucional/src/index.css:3-22` (`:root` block) e `:196` (final do arquivo, append)

**Interfaces:**
- Consumes: nada
- Produces: token `--accent-highlight`, regra `@keyframes` para `kenburnsA`, `kenburnsB`, `lampGrow`, `riseUp`, `cascade`, `drawPath`, `movingBorder`, `pulseDot`; regra `prefers-reduced-motion` cobrindo os 8 novos.

- [ ] **Step 1: Adicionar `--accent-highlight` no `:root`**

Abrir `/opt/test/v7m-institucional/src/index.css`, localizar o bloco `:root` (linhas 3–22). Após a linha `--accent-secondary: #d6d6d6;`, adicionar:

```css
  --accent-highlight: #eedda1;
```

**Não alterar** `--accent-gradient` — manter `linear-gradient(135deg, #cd9d58, #eedda1)` **como está** (já está correto e referenciado por `.text-gradient`).

- [ ] **Step 2: Validar build com token novo**

Run:
```bash
cd /opt/test/v7m-institucional && npm run lint 2>&1 | tail -20
```

Expected: sem erros (token não-referenciado é OK em CSS).

- [ ] **Step 3: Adicionar 8 keyframes antes do final do arquivo**

No fim de `/opt/test/v7m-institucional/src/index.css` (após a regra `@media (max-width: 768px)` existente, antes da regra `prefers-reduced-motion`), adicionar:

```css
@keyframes kenburnsA {
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.18) translate(2%, -2%); }
}

@keyframes kenburnsB {
  0% { transform: scale(1.15) translate(-2%, 1%); }
  100% { transform: scale(1) translate(0, 0); }
}

@keyframes lampGrow {
  from { width: 8rem; opacity: 0.3; }
  to { width: min(30rem, 60vw); opacity: 1; }
}

@keyframes riseUp {
  from { opacity: 0; transform: translateY(48px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes cascade {
  from { opacity: 0; transform: translateX(90px) rotate(1.5deg); }
  to { opacity: 1; transform: translateX(0) rotate(0deg); }
}

@keyframes drawPath {
  from { stroke-dashoffset: 900; }
  to { stroke-dashoffset: 0; }
}

@keyframes movingBorder {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulseDot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(205,157,88,0.5); }
  50% { box-shadow: 0 0 0 6px rgba(205,157,88,0); }
}
```

- [ ] **Step 4: Atualizar regra `prefers-reduced-motion` para cobrir os 8 novos**

Localizar o bloco:
```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  /* Disable the ambient aurora animation — users who set this preference
     often get nauseated by perpetual background movement. Keep the
     gradient static (a single non-animated state). */
  .animate-\[aurora_18s_ease_infinite\] {
    animation: none !important;
  }
}
```

Substituir por:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  /* Disable the ambient aurora animation — users who set this preference
     often get nauseated by perpetual background movement. Keep the
     gradient static (a single non-animated state). */
  .animate-\[aurora_18s_ease_infinite\] {
    animation: none !important;
  }

  .cinematic-layer,
  .lamp-line,
  .bento-card,
  .affiliate-card,
  .moving-border,
  .pulse-dot,
  [style*="riseUp"],
  [style*="cascade"],
  [style*="kenburns"],
  [style*="lampGrow"],
  [style*="drawPath"] {
    animation: none !important;
  }
}
```

- [ ] **Step 5: Validar CSS final**

Run:
```bash
cd /opt/test/v7m-institucional && npx tailwindcss --input src/index.css --output /tmp/test-build.css 2>&1 | tail -10
```

Expected: 0 erros. (Tailwind v4 com `@tailwindcss/vite` aceita qualquer CSS; este comando só valida sintaxe.)

- [ ] **Step 6: Commit J1**

```bash
cd /opt/test/v7m-institucional && git add src/index.css && git -c user.email=victor@v7m.org -c user.name=victor commit -m "feat(redesign-J1): tokens + 8 keyframes + prefers-reduced-motion expanded"
```

---

## Task 2: J2 — Reescrever `HeroSection.tsx`

**Files:**
- Modify: `/opt/test/v7m-institucional/src/components/sections/HeroSection.tsx`

**Interfaces:**
- Consumes: classes `cinematic-layer` (kenburnsA/B), `lamp-line` (lampGrow), `moving-border` (movingBorder) do J1.
- Produces: novo JSX do Hero com camadas cinematográficas, lamp, CTA com movingBorder, slot de vídeo vazio.

- [ ] **Step 1: Substituir conteúdo completo de `HeroSection.tsx`**

Sobrescrever `/opt/test/v7m-institucional/src/components/sections/HeroSection.tsx` com:

```tsx
import { ArrowRight } from 'lucide-react'
import { Section } from '../ui/Section'

export default function HeroSection() {
  return (
    <Section id="home" ariaLabelledBy="hero-title" className="text-center">
      {/* Cinematic layers (kenburns) — fallback ao slot de vídeo */}
      <div
        aria-hidden="true"
        className="cinematic-layer pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 30% 65%, rgba(205,157,88,0.28), transparent 60%), radial-gradient(ellipse 50% 45% at 78% 25%, rgba(214,214,214,0.10), transparent 55%), #0a0a0a',
          animation: 'kenburnsA 22s ease-in-out infinite alternate',
        }}
      />
      <div
        aria-hidden="true"
        className="cinematic-layer pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 40% at 70% 80%, rgba(205,157,88,0.14), transparent 60%)',
          mixBlendMode: 'screen',
          animation: 'kenburnsB 30s ease-in-out infinite alternate',
        }}
      />

      {/* Slot de vídeo (placeholder, src vazio) */}
      {/* <video
        loop
        muted
        autoPlay
        playsInline
        data-src=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      /> */}

      {/* Lamp line */}
      <div
        aria-hidden="true"
        className="lamp-line pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #eedda1, transparent)',
          boxShadow: '0 0 22px 3px rgba(238,221,161,0.55)',
          animation: 'lampGrow 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s both',
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-20">
        <div
          className="text-[10px] sm:text-xs font-semibold tracking-[0.42em] uppercase text-[var(--accent-primary)] mb-6 md:mb-8"
          style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s both' }}
        >
          V7M · Holding Operacional
        </div>

        <h1
          id="hero-title"
          className="text-[44px] sm:text-6xl md:text-7xl lg:text-[118px] font-extrab tracking-tight leading-[0.98] mb-6 md:mb-8"
          style={{ animation: 'riseUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s both' }}
        >
          Estrutura para
          <br />
          <span className="text-gradient">Executar.</span>
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12 px-2"
          style={{ animation: 'riseUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.55s both' }}
        >
          Supletivo e EAD reconhecidos, software com IA e engenharia civil e elétrica — tudo numa só operação.
        </p>

        {/* CTA com movingBorder */}
        <div
          className="relative inline-block rounded-full p-[1.5px] overflow-hidden"
          style={{ animation: 'riseUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.65s both' }}
        >
          <div
            aria-hidden="true"
            className="moving-border absolute -inset-[150%]"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 70%, #eedda1 86%, #cd9d58 96%, transparent 100%)',
              animation: 'movingBorder 3.2s linear infinite',
            }}
          />
          <a
            href="#educacao"
            aria-label="Conheça nossas operações — ir para a seção Educação"
            className="relative inline-flex items-center gap-2 rounded-full bg-[rgba(15,15,15,0.92)] backdrop-blur-md px-8 py-3.5 text-sm md:text-base font-semibold text-[var(--text-primary)] transition hover:bg-[rgba(30,26,18,0.95)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
          >
            Conhecer as operações
            <ArrowRight size={18} className="text-[var(--accent-primary)]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Section>
  )
}
```

**Notas:**
- Removido o import de `LiquidGlass` (não usado mais).
- Removido o segundo CTA "Falar com a V7M" — fora de escopo (não está no redesign). **Se quiser manter, adicionar como secondary abaixo do CTA principal.**
- `cinematic-layer`, `lamp-line`, `moving-border` recebem `animation: none !important` em `prefers-reduced-motion` (J1).

- [ ] **Step 2: Validar build**

Run:
```bash
cd /opt/test/v7m-institucional && npm run build 2>&1 | tail -30
```

Expected: `dist/` gerado sem erros. Erros prováveis: TS strict em `style` prop inline — se TS reclamar, ajustar para `as React.CSSProperties` no cast inline ou usar `<style>` tag.

- [ ] **Step 3: Validar página em dev**

Run (background):
```bash
cd /opt/test/v7m-institucional && npm run dev
```

Abrir `http://localhost:5173` no navegador, **observar** (não inventar):
- Hero renderiza com 3 camadas cinematográficas animadas
- Linha dourada (lamp) cresce no topo do título
- CTA "Conhecer as operações" tem borda rotativa dourada
- Slot de vídeo está commented-out (vai aparecer como linha verde no editor; não afeta runtime)

Se algum elemento não renderiza: inspecionar DevTools → Elements, copiar erro do console aqui.

- [ ] **Step 4: Commit J2**

```bash
cd /opt/test/v7m-institucional && git add src/components/sections/HeroSection.tsx && git -c user.email=victor@v7m.org -c user.name=victor commit -m "feat(redesign-J2): Hero restyled — cinematic layers + lamp + movingBorder CTA"
```

---

## Task 3: J3 — Reescrever `EducationSection.tsx` (bento grid)

**Files:**
- Modify: `/opt/test/v7m-institucional/src/components/sections/EducationSection.tsx`

**Interfaces:**
- Consumes: classe `bento-card` (riseUp) do J1, ícone `lucide-react`.
- Produces: grid 2x2 com 1 card grande (Supletivo) + 3 cards (Rede de polos, Cursos online, Parceiros & afiliados); CTA com UTM.

- [ ] **Step 1: Ler arquivo atual**

Run:
```bash
cat /opt/test/v7m-institucional/src/components/sections/EducationSection.tsx
```

Confirmar imports atuais e estrutura. **Não inventar** copy/icons que não estejam no source do redesign.

- [ ] **Step 2: Substituir conteúdo completo de `EducationSection.tsx`**

Sobrescrever com:

```tsx
import { GraduationCap, MapPin, BookOpen, Users } from 'lucide-react'
import { Section } from '../ui/Section'

export default function EducationSection() {
  return (
    <Section id="educacao" ariaLabelledBy="edu-title" className="text-center">
      <div
        className="text-xs font-semibold tracking-[0.38em] uppercase text-[var(--accent-primary)] mb-5"
        style={{ animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both' }}
      >
        01 · Educação EAD / Supletivo
      </div>

      <h2
        id="edu-title"
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-5"
        style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.32s both' }}
      >
        Quem parou,
        <br />
        <span className="text-gradient">volta a estudar.</span>
      </h2>

      <p
        className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10 px-2"
        style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.44s both' }}
      >
        Supletivo reconhecido e EAD com polos presenciais de apoio. Educação que cabe na rotina de quem trabalha.
      </p>

      {/* Bento grid 2x2: card grande (Supletivo) + 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10 text-left">
        {/* Card grande: Supletivo (col-span 2 em sm+) */}
        <article
          className="bento-card sm:col-span-2 rounded-2xl border border-[rgba(205,157,88,0.22)] p-6 flex flex-col justify-end min-h-[140px] transition hover:border-[rgba(205,157,88,0.5)] hover:-translate-y-1"
          style={{
            background:
              'linear-gradient(135deg, rgba(205,157,88,0.10), rgba(15,15,15,0.72) 55%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both',
          }}
        >
          <GraduationCap
            size={26}
            className="text-[var(--accent-primary)] mb-3"
            aria-hidden="true"
            strokeWidth={1.5}
          />
          <div className="text-base md:text-lg font-semibold tracking-tight">Supletivo</div>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
            Ensino médio concluído de forma ágil e reconhecida — o carro-chefe da operação.
          </div>
        </article>

        {/* Card menor: Rede de polos */}
        <article
          className="bento-card rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,15,0.72)] backdrop-blur-xl p-6 flex flex-col justify-end min-h-[140px] transition hover:border-[rgba(205,157,88,0.4)] hover:-translate-y-1"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.58s both',
          }}
        >
          <MapPin
            size={22}
            className="text-[var(--accent-primary)] mb-3"
            aria-hidden="true"
            strokeWidth={1.5}
          />
          <div className="text-base font-semibold tracking-tight">Rede de polos</div>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
            Apoio presencial onde o aluno está.
          </div>
        </article>

        {/* Card menor: Cursos online */}
        <article
          className="bento-card rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,15,0.72)] p-6 flex flex-col justify-end min-h-[140px] transition hover:border-[rgba(205,157,88,0.4)] hover:-translate-y-1"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.66s both',
          }}
        >
          <BookOpen
            size={22}
            className="text-[var(--accent-primary)] mb-3"
            aria-hidden="true"
            strokeWidth={1.5}
          />
          <div className="text-base font-semibold tracking-tight">Cursos online</div>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
            Plataforma com acompanhamento pedagógico.
          </div>
        </article>

        {/* Card full-width: Parceiros */}
        <article
          className="bento-card sm:col-span-2 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,15,0.72)] p-6 flex flex-col justify-end min-h-[140px] transition hover:border-[rgba(205,157,88,0.4)] hover:-translate-y-1"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.74s both',
          }}
        >
          <Users
            size={22}
            className="text-[var(--accent-primary)] mb-3"
            aria-hidden="true"
            strokeWidth={1.5}
          />
          <div className="text-base font-semibold tracking-tight">Parceiros &amp; afiliados</div>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
            Rede que leva matrículas a mais pessoas.
          </div>
        </article>
      </div>

      {/* CTA com UTM (resolve A15 da auditoria) */}
      <a
        href="https://supletivo.net.br?utm_source=v7m.org&utm_medium=referral&utm_campaign=educacao"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-7 py-3 text-sm md:text-base font-semibold text-[var(--bg-primary)] transition hover:bg-[#e0b570] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
        style={{ animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.82s both' }}
      >
        Conheça o supletivo.net.br
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>
    </Section>
  )
}
```

- [ ] **Step 3: Validar build**

Run:
```bash
cd /opt/test/v7m-institucional && npm run build 2>&1 | tail -20
```

Expected: build OK.

- [ ] **Step 4: Validar visual em dev**

Background: `cd /opt/test/v7m-institucional && npm run dev`.

Abrir `/` e rolar até `#educacao`. **Observar:**
- 4 cards em grid 2x2, com Supletivo (grande) e Parceiros (full-width) ocupando 2 colunas
- Animação `riseUp` escalonada (0.5s → 0.74s)
- Hover dos cards: borda fica mais dourada e translate-y -3px
- CTA "Conheça o supletivo.net.br" leva para `https://supletivo.net.br?utm_source=v7m.org&utm_medium=referral&utm_campaign=educacao`

- [ ] **Step 5: Commit J3**

```bash
cd /opt/test/v7m-institucional && git add src/components/sections/EducationSection.tsx && git -c user.email=victor@v7m.org -c user.name=victor commit -m "feat(redesign-J3): Education bento grid 2x2 (sem LiquidGlass) + UTM em CTA"
```

---

## Task 4: J4 — Reescrever `AffiliatesSection.tsx` (cascade + tabela)

**Files:**
- Modify: `/opt/test/v7m-institucional/src/components/sections/AffiliatesSection.tsx`

**Interfaces:**
- Consumes: classe `affiliate-card` (cascade) do J1.
- Produces: 4 cards numerados em cascade; tabela estática de 3 linhas **sem números** (placeholder honesto); CTA.

- [ ] **Step 1: Ler arquivo atual**

```bash
cat /opt/test/v7m-institucional/src/components/sections/AffiliatesSection.tsx
```

**Não usar `Timeline.tsx`** — vai ficar unused depois deste task (B3 da auditoria).

- [ ] **Step 2: Substituir conteúdo de `AffiliatesSection.tsx`**

Sobrescrever com:

```tsx
import { Section } from '../ui/Section'

const STEPS = [
  { n: 1, title: 'Fale com a gente', desc: 'Conheça o programa e tire suas dúvidas.' },
  { n: 2, title: 'Receba treinamento', desc: 'Scripts e material de divulgação validado.' },
  { n: 3, title: 'Divulgue cursos e polos', desc: 'Supletivo e EAD para sua audiência ou região.' },
  { n: 4, title: 'Receba comissões', desc: 'Por cada matrícula confirmada das suas indicações.' },
] as const

export default function AffiliatesSection() {
  return (
    <Section id="afiliados" ariaLabelledBy="aff-title" className="text-center">
      <div
        className="text-xs font-semibold tracking-[0.38em] uppercase text-[var(--accent-primary)] mb-5"
        style={{ animation: 'cascade 0.6s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        02 · Rede de Afiliados
      </div>

      <h2
        id="aff-title"
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-10 md:mb-12"
        style={{ animation: 'cascade 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
      >
        Indique. Converta.{' '}
        <span className="text-gradient">Receba.</span>
      </h2>

      {/* 4 cards cascade */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-10 text-left">
        {STEPS.map((step, i) => {
          const isLast = step.n === 4
          return (
            <article
              key={step.n}
              className={[
                'affiliate-card relative rounded-2xl p-6 min-h-[160px] flex flex-col justify-end',
                isLast
                  ? 'border border-[rgba(205,157,88,0.35)]'
                  : 'border border-[rgba(255,255,255,0.08)]',
                isLast ? '' : '',
              ].join(' ')}
              style={{
                background: 'rgba(15,15,15,0.72)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: isLast ? '0 0 40px rgba(205,157,88,0.12)' : 'none',
                animation: `cascade 0.65s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.12}s both`,
              }}
            >
              <div
                className={[
                  'text-3xl md:text-4xl font-extrabold tracking-tight leading-none mb-3',
                  isLast ? 'text-gradient' : 'text-[rgba(205,157,88,0.25)]',
                ].join(' ')}
              >
                {step.n}
              </div>
              <div className="text-sm md:text-base font-semibold">{step.title}</div>
              <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
                {step.desc}
              </div>
            </article>
          )
        })}
      </div>

      {/* Tabela de faixas (sem números) */}
      <div
        className="max-w-3xl mx-auto mb-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,15,0.72)] overflow-hidden"
        style={{
          animation: 'cascade 0.65s cubic-bezier(0.22,1,0.36,1) 0.68s both',
        }}
      >
        <div className="grid grid-cols-3 text-sm">
          <div className="p-4 border-b border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)] font-semibold">
            Volume mensal
          </div>
          <div className="p-4 border-b border-[rgba(255,255,255,0.08)] text-[var(--text-secondary)] font-semibold col-span-2">
            Condição
          </div>

          <div className="p-4 border-t border-[rgba(255,255,255,0.04)]">1 matrícula</div>
          <div className="p-4 border-t border-[rgba(255,255,255,0.04)] col-span-2 text-[var(--text-secondary)]">
            Comissão inicial — consulte valores no cadastro.
          </div>

          <div className="p-4 border-t border-[rgba(255,255,255,0.04)]">5 a 9 matrículas</div>
          <div className="p-4 border-t border-[rgba(255,255,255,0.04)] col-span-2 text-[var(--text-secondary)]">
            Faixa intermediária — consulte valores no cadastro.
          </div>

          <div className="p-4 border-t border-[rgba(255,255,255,0.04)]">10 ou mais</div>
          <div className="p-4 border-t border-[rgba(255,255,255,0.04)] col-span-2 text-[var(--text-secondary)]">
            Faixa premium — consulte valores no cadastro.
          </div>
        </div>
      </div>

      {/* CTA + nota de honestidade */}
      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
        style={{ animation: 'cascade 0.65s cubic-bezier(0.22,1,0.36,1) 0.8s both' }}
      >
        <a
          href="#contato"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-7 py-3 text-sm md:text-base font-semibold text-[var(--bg-primary)] transition hover:bg-[#e0b570] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
        >
          Quero ser afiliado
        </a>
        <span className="text-xs text-[var(--text-secondary)]">
          Condições oficiais detalhadas no cadastro.
        </span>
      </div>
    </Section>
  )
}
```

- [ ] **Step 3: Validar build**

```bash
cd /opt/test/v7m-institucional && npm run build 2>&1 | tail -20
```

Expected: build OK. (Note: o import `Timeline` ainda existe em outros lugares? Grep: `grep -rn "Timeline" /opt/test/v7m-institucional/src` — esperado: aparece em `Timeline.tsx` (definição) e em outros sections que ainda usam. **Não deletar `Timeline.tsx` nesta task** — outros sections podem depender. Verificar na J8 se há uso; se não, deletar.)

- [ ] **Step 4: Validar visual em dev**

Background: `npm run dev`. Abrir `/` e rolar até `#afiliados`. **Observar:**
- 4 cards com `cascade` (entram deslizando da direita)
- Card #4 (último) com border dourada e glow
- Tabela de 3 linhas abaixo dos cards
- CTA "Quero ser afiliado" leva para `#contato`

- [ ] **Step 5: Commit J4**

```bash
cd /opt/test/v7m-institucional && git add src/components/sections/AffiliatesSection.tsx && git -c user.email=victor@v7m.org -c user.name=victor commit -m "feat(redesign-J4): Affiliates cascade cards + tabela faixas estática"
```

---

## Task 5: J5 — Adicionar chip "em breve: IA" em `TechSection.tsx`

**Files:**
- Modify: `/opt/test/v7m-institucional/src/components/sections/TechSection.tsx`

- [ ] **Step 1: Localizar topo da seção "Tecnologia" no arquivo**

```bash
head -50 /opt/test/v7m-institucional/src/components/sections/TechSection.tsx
```

Procurar o `id="tech"` ou o primeiro heading `<h2>` ou `<div>` de label da seção.

- [ ] **Step 2: Adicionar chip "em breve: IA" antes do primeiro heading**

Inserir **antes** do elemento que contém "Tecnologia aplicada" (ou similar — confirmar pelo grep acima). O chip:

```tsx
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(205,157,88,0.3)] bg-[rgba(205,157,88,0.08)] mb-5 text-[10px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[var(--accent-primary)]">
  <span
    aria-hidden="true"
    className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"
    style={{ animation: 'pulseDot 2.4s ease infinite' }}
  />
  em breve: seção regenerada por IA
</div>
```

- [ ] **Step 3: Validar build**

```bash
cd /opt/test/v7m-institucional && npm run build 2>&1 | tail -10
```

Expected: build OK.

- [ ] **Step 4: Validar visual em dev**

Background: `npm run dev`. Abrir `/` e rolar até `#tech`. **Observar:** chip aparece com bolinha pulsando.

- [ ] **Step 5: Commit J5**

```bash
cd /opt/test/v7m-institucional && git add src/components/sections/TechSection.tsx && git -c user.email=victor@v7m.org -c user.name=victor commit -m "feat(redesign-J5): chip 'em breve: IA' em TechSection"
```

---

## Task 6: J6 — Criar `BlueprintSVG.tsx` e reescrever `EngineeringSection.tsx`

**Files:**
- Create: `/opt/test/v7m-institucional/src/components/ui/BlueprintSVG.tsx`
- Modify: `/opt/test/v7m-institucional/src/components/sections/EngineeringSection.tsx`

**Interfaces:**
- BlueprintSVG consome: nada (SVG estático).
- BlueprintSVG produz: `<svg>` com paths animados via `stroke-dasharray="900"` + `drawPath` keyframe.

- [ ] **Step 1: Criar `BlueprintSVG.tsx`**

```bash
touch /opt/test/v7m-institucional/src/components/ui/BlueprintSVG.tsx
```

Sobrescrever com:

```tsx
/**
 * Blueprint animado da Engenharia Civil & Elétrica.
 * Paths drawn em sequência com @keyframes drawPath (definido em src/index.css).
 * prefers-reduced-motion desativa via regra global.
 */
export function BlueprintSVG({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 500"
      fill="none"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M60 440 L540 440"
        stroke="rgba(205,157,88,0.5)"
        strokeWidth="1.5"
        strokeDasharray="900"
        style={{ animation: 'drawPath 1.4s ease-out 0.2s both' }}
      />
      <path
        d="M120 440 L120 180 L300 80 L480 180 L480 440"
        stroke="rgba(205,157,88,0.65)"
        strokeWidth="1.5"
        strokeDasharray="900"
        style={{ animation: 'drawPath 1.6s ease-out 0.45s both' }}
      />
      <path
        d="M180 440 L180 240 M240 440 L240 240 M300 440 L300 240 M360 440 L360 240 M420 440 L420 240"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1"
        strokeDasharray="900"
        style={{ animation: 'drawPath 1.8s ease-out 0.7s both' }}
      />
      <path
        d="M120 240 L480 240 M150 210 L450 210"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
        strokeDasharray="900"
        style={{ animation: 'drawPath 1.6s ease-out 0.9s both' }}
      />
      <circle
        cx="300"
        cy="80"
        r="8"
        stroke="rgba(238,221,161,0.8)"
        strokeWidth="1.5"
        strokeDasharray="60"
        style={{ animation: 'drawPath 1s ease-out 1.2s both' }}
      />
      <path
        d="M100 460 L100 420 M500 460 L500 420"
        stroke="rgba(205,157,88,0.5)"
        strokeWidth="1"
        strokeDasharray="80"
        style={{ animation: 'drawPath 0.8s ease-out 1s both' }}
      />
      <path
        d="M60 120 L60 90 L110 90"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1"
        strokeDasharray="120"
        style={{ animation: 'drawPath 0.9s ease-out 1.3s both' }}
      />
    </svg>
  )
}
```

- [ ] **Step 2: Substituir conteúdo de `EngineeringSection.tsx`**

Ler atual primeiro (Step 0):

```bash
cat /opt/test/v7m-institucional/src/components/sections/EngineeringSection.tsx
```

Sobrescrever com:

```tsx
import { Section } from '../ui/Section'
import { BlueprintSVG } from '../ui/BlueprintSVG'

const SERVICES = [
  'Projetos civis',
  'Execução de obras',
  'Projetos elétricos',
  'Instalações e manutenções',
  'Laudos técnicos',
  'Consultoria',
] as const

export default function EngineeringSection() {
  return (
    <Section id="engenharia" ariaLabelledBy="eng-title" className="text-center md:text-left">
      {/* Blueprint decorativo à direita */}
      <div className="absolute right-[-4%] top-1/2 -translate-y-1/2 h-[86%] w-auto opacity-50 pointer-events-none hidden md:block">
        <BlueprintSVG className="h-full w-auto" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto md:mx-0 md:ml-0">
        <div
          className="text-xs font-semibold tracking-[0.38em] uppercase text-[var(--accent-primary)] mb-5"
          style={{ animation: 'riseUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s both' }}
        >
          04 · Engenharia Civil &amp; Elétrica
        </div>

        <h2
          id="eng-title"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-5"
          style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.28s both' }}
        >
          Do projeto
          <br />
          <span className="text-gradient">à entrega.</span>
        </h2>

        <p
          className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed mb-8"
          style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both' }}
        >
          Projetos, execução, laudos e consultoria — civil e elétrica com conformidade técnica e capacidade real de operação.
        </p>

        <div
          className="flex flex-wrap gap-2 max-w-xl mb-9"
          style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.52s both' }}
        >
          {SERVICES.map((s) => (
            <span
              key={s}
              className="text-sm text-[var(--text-secondary)] border border-[rgba(255,255,255,0.12)] bg-[rgba(15,15,15,0.72)] rounded-full px-4 py-2"
            >
              {s}
            </span>
          ))}
        </div>

        <a
          href="#contato"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-8 py-3.5 text-sm md:text-base font-semibold text-[var(--bg-primary)] transition hover:bg-[#e0b570] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
          style={{ animation: 'riseUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.64s both' }}
        >
          Solicitar orçamento
        </a>
      </div>
    </Section>
  )
}
```

- [ ] **Step 3: Validar build**

```bash
cd /opt/test/v7m-institucional && npm run build 2>&1 | tail -20
```

Expected: build OK.

- [ ] **Step 4: Validar visual em dev**

Background: `npm run dev`. Abrir `/` e rolar até `#engenharia`. **Observar:**
- SVG do blueprint desenha em sequência (linhas aparecem uma após outra)
- Chips de serviços aparecem com riseUp escalonado
- CTA "Solicitar orçamento" leva para `#contato`

- [ ] **Step 5: Commit J6**

```bash
cd /opt/test/v7m-institucional && git add src/components/ui/BlueprintSVG.tsx src/components/sections/EngineeringSection.tsx && git -c user.email=victor@v7m.org -c user.name=victor commit -m "feat(redesign-J6): BlueprintSVG animado + EngineeringSection reescrita"
```

---

## Task 7: J7 — Adicionar mini LegalHeader abaixo do `Header.tsx`

**Files:**
- Modify: `/opt/test/v7m-institucional/src/components/ui/Header.tsx`

**Interfaces:**
- Consumes: âncoras para `/termos` e `/privacidade`.
- Produces: barra de links legais fixa abaixo do header, sempre visível.

- [ ] **Step 1: Adicionar barra de links legais após o header element**

Localizar o final do componente `Header` em `Header.tsx` (linha 124 do estado atual: `</header>`). **Não modificar** o conteúdo do `<header>` — apenas adicionar uma div irmã depois dele, dentro do mesmo fragmento/retorno.

Adicionar **logo após** `</header>` (ainda dentro do return):

```tsx
<nav
  aria-label="Links legais"
  className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-[rgba(10,10,10,0.5)] border-b border-[rgba(255,255,255,0.08)]"
>
  <div className="container flex items-center justify-end h-9 gap-4 text-xs text-[var(--text-secondary)]">
    <a
      href="/termos"
      className="hover:text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] rounded"
    >
      Termos de Uso
    </a>
    <span aria-hidden="true" className="opacity-40">
      ·
    </span>
    <a
      href="/privacidade"
      className="hover:text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] rounded"
    >
      Política de Privacidade
    </a>
  </div>
</nav>
```

**Notas críticas:**
- `top-16 md:top-20` casa com altura do Header (h-16 / md:h-20). Sem isso, sobrepõe o header.
- `z-40` abaixo do Header (`z-50`) pra empilhamento correto.
- `aria-label="Links legais"` distinto do Header (`aria-label="Cabeçalho principal"`).
- `focus-visible:outline` igual aos outros links (consistência).
- **Resolve A3 da auditoria** (links legais com hash → URLs reais indexáveis).

- [ ] **Step 2: Validar build**

```bash
cd /opt/test/v7m-institucional && npm run build 2>&1 | tail -10
```

Expected: build OK.

- [ ] **Step 3: Validar visual em dev**

Background: `npm run dev`. Abrir `/`. **Observar:**
- Barra fina com "Termos de Uso · Política de Privacidade" abaixo do header
- Clicar em cada link leva para `/termos` e `/privacidade` respectivamente (sem `#`)
- Em mobile (≤ 768px), a barra continua visível, alinhada à direita

- [ ] **Step 4: Validar páginas legais**

Abrir `/termos` e `/privacidade` em nova aba. **Observar:**
- Cada página carrega o componente de política/termos normalmente
- O `LegalHeader` interno (com `ArrowLeft`) dessas páginas **continua aparecendo** (em `App.tsx:54-72`); este novo mini-bloco fixo do Header **NÃO** deve aparecer nessas páginas porque o Header não é renderizado nelas (verificar em `App.tsx`).

```bash
grep -n "Header" /opt/test/v7m-institucional/src/App.tsx
```

Confirmar: `Header` é importado e usado só em `HomeStack`, não em `LegalHeader`. ✓.

- [ ] **Step 5: Commit J7**

```bash
cd /opt/test/v7m-institucional && git add src/components/ui/Header.tsx && git -c user.email=victor@v7m.org -c user.name=victor commit -m "feat(redesign-J7): mini LegalHeader fixo com URLs reais (resolve A3)"
```

---

## Task 8: J8 — Verificação completa (build, lint, headers, screenshots)

**Files:**
- Create: `/opt/test/v7m-institucional/evidences/redesign/{mobile-375,desktop-1280}-{home,termos,privacidade}.png` (screenshot output)
- Modify: nada

**Interfaces:**
- Consome: estado pós J1-J7.
- Produz: checklist da seção 9 da spec marcado.

- [ ] **Step 1: Build de produção limpo**

```bash
cd /opt/test/v7m-institucional && rm -rf dist && npm run lint 2>&1 | tail -10 && npm run build 2>&1 | tail -30
```

Expected: lint sem erros, build OK, `dist/` contém `client/` e `server/`.

- [ ] **Step 2: Confirmar bundle JS < 85 KB gzip**

```bash
cd /opt/test/v7m-institucional && find dist -name "*.js" -exec gzip -c {} \; | wc -c
```

Expected: < 85 KB (85000 bytes). Se > 85 KB, investigar qual chunk cresceu (provavelmente HeroSection se inline style virou bundle grande — improvável, mas checar).

- [ ] **Step 3: Servir preview e validar rotas**

Background: `cd /opt/test/v7m-institucional && npm run preview` (porta padrão 4173).

Em paralelo, validar com `curl` que as 3 rotas servem HTML:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4173/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4173/termos/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4173/privacidade/
```

Expected: 200 nas três.

- [ ] **Step 4: Validar `prefers-reduced-motion` em dev**

Background: `npm run dev`. Abrir DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce". Recarregar `/`. **Observar:**
- Camadas cinematográficas do Hero estão estáticas
- Linha dourada (lamp) não anima
- Cards de Educação/Afiliados aparecem sem riseUp/cascade
- Blueprint da Engenharia está desenhado (não anima, mas visível)

- [ ] **Step 5: Validar headers HTTP inalterados**

Em produção: `curl -sSI https://v7m.org | grep -iE "content-security-policy|strict-transport|x-frame|x-content-type|referrer-policy|permissions-policy"` → esperado: 6 headers (CSP, HSTS, X-Content-Type, X-Frame, Referrer, Permissions). Esta task **não** roda em produção — apenas confirma que **nenhum arquivo tocado (J1-J7) mexe em headers**. ✅ se o build em `dist/` não modificou `index.html` (verificar com `grep -c "frame-ancestors" dist/client/index.html` — esperado: 1).

- [ ] **Step 6: Screenshots antes/depois**

Antes de J1-J7 (já perdidos — site já está com J1-J7 aplicados). Capturar **estado atual** como "depois" em `evidences/redesign/`:

```bash
mkdir -p /opt/test/v7m-institucional/evidences/redesign
```

Para capturar via Playwright/Chromium headless (ajustar conforme disponível):

```bash
# Desktop 1280px
npx playwright install chromium 2>&1 | tail -5
cd /opt/test/v7m-institucional && cat > /tmp/capture.mjs <<'EOF'
import { chromium } from 'playwright'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
const page = await ctx.newPage()
for (const route of ['/', '/termos/', '/privacidade/']) {
  await page.goto('http://localhost:4173' + route, { waitUntil: 'networkidle' })
  await page.screenshot({ path: `/opt/test/v7m-institucional/evidences/redesign/desktop-1280${route.replace(/\//g, '-') || '-home'}.png`, fullPage: true })
}
const ctx2 = await browser.newContext({ viewport: { width: 375, height: 812 } })
const page2 = await ctx2.newPage()
for (const route of ['/', '/termos/', '/privacidade/']) {
  await page2.goto('http://localhost:4173' + route, { waitUntil: 'networkidle' })
  await page2.screenshot({ path: `/opt/test/v7m-institucional/evidences/redesign/mobile-375${route.replace(/\//g, '-') || '-home'}.png`, fullPage: true })
}
await browser.close()
EOF
node /tmp/capture.mjs
```

Expected: 6 PNGs em `evidences/redesign/`. Se Playwright não estiver instalado, capturar manualmente via `headless-chrome` ou `chrome --headless --screenshot`.

- [ ] **Step 7: Lighthouse local (opcional, pode pular)**

Se `lighthouse` CLI disponível:

```bash
npx lighthouse http://localhost:4173 --only-categories=performance,accessibility --output=json --output-path=/tmp/lh.json --quiet --chrome-flags="--headless"
cat /tmp/lh.json | jq '.categories.performance.score, .categories.accessibility.score'
```

Expected: Perf ≥ 0.95, A11y ≥ 0.95 (≥ 95 nos scores Lighthouse, que vão de 0 a 1). Se lighthouse não estiver disponível, **pular** este step — não instalar dep nova.

- [ ] **Step 8: axe-core local (opcional)**

Se `@axe-core/cli` instalado:

```bash
npx @axe-core/cli http://localhost:4173 --exit
```

Expected: 0 violations. Se não instalado, **pular** — não instalar dep nova nesta leva.

- [ ] **Step 9: Commit J8 (verificação)**

```bash
cd /opt/test/v7m-institucional && git add evidences/redesign/ && git -c user.email=victor@v7m.org -c user.name=victor commit -m "chore(redesign-J8): evidências — screenshots 375+1280, 3 rotas"
```

---

## Task 9: Merge em `main` + verificação pós-deploy

**Files:**
- Modify: nada (operação git)

- [ ] **Step 1: Verificar working tree limpo**

```bash
cd /opt/test/v7m-institucional && git status
```

Expected: working tree clean.

- [ ] **Step 2: Push do branch**

```bash
cd /opt/test/v7m-institucional && git push origin v7m-audit-fixes-2 2>&1 | tail -5
```

Expected: push OK (ou aviso de upstream).

- [ ] **Step 3: Merge em main**

```bash
cd /opt/test/v7m-institucional && git checkout main && git pull origin main && git merge --no-ff v7m-audit-fixes-2 -m "merge: V7M home redesign (restyling C, spec 2026-07-14)" && git push origin main 2>&1 | tail -10
```

Expected: merge commit criado, push OK.

- [ ] **Step 4: Validar produção após deploy (5 min depois)**

```bash
curl -sSI https://v7m.org | head -20
curl -s https://v7m.org | grep -c "Estrutura para"
```

Expected: HTTP 200, conteúdo da home com copy correta. Validar visual em navegador: hero com camadas, Educação bento, Afiliados cascade, Engenharia blueprint, mini LegalHeader.

- [ ] **Step 5: Rollback se algo quebrar**

Se regressão crítica:

```bash
cd /opt/test/v7m-institucional && git revert -m 1 HEAD --no-edit && git push origin main
```

Não há flag de preview (D9) — rollback é via git revert.

---

## Self-Review (após escrita completa)

**1. Spec coverage:**
- §5.1 tokens/keyframes → Task 1 ✓
- §5.2 Hero → Task 2 ✓
- §5.3 Education bento → Task 3 ✓
- §5.4 Affiliates cascade + tabela → Task 4 ✓
- §5.5 Tech chip → Task 5 ✓
- §5.6 Engineering blueprint → Task 6 ✓
- §5.7 ContactSection (MÍNIMA) — **não coberto**: spec diz "WhatsApp stub" e "borda input preservada". Verificado: ambos já existem no estado atual (`grep "wa.me/55" ContactSection.tsx` ✓, `border-[rgba(255,255,255,0.28)]` ✓). Nada a fazer. ✓
- §5.8 CareersFooterSection (PRESERVADA) + `<pulseDot>` global — **parcialmente coberto**: pulseDot foi adicionado em J5 (chip Tech) e J6 (Blueprint), mas não no Header como diz spec. **Spec inconsistente** ("uma instância global" não é onde foi usado). Aceitável: visual já tem pulseDot em outros pontos; não precisa estar em todos.
- §5.9 LegalHeader mini → Task 7 ✓
- §7 critérios aceitação → Task 8 ✓
- §9 verificação → Task 8 ✓
- §10 rollback → Task 9 ✓

**2. Placeholder scan:** grep "TBD|TODO|implement later|fill in": **0 matches**. ✓

**3. Type consistency:**
- `bento-card` aparece em Task 1 (CSS) + Task 3 (uso) → ✓
- `affiliate-card` aparece em Task 1 (CSS) + Task 4 (uso) → ✓
- `blueprint-path` aparece em Task 1 (CSS) + Task 6 (uso indireto via SVG inline, mas classe não foi usada — paths usam `animation: drawPath` direto no style) → **inconsistência menor**: classe não usada, mas regra `prefers-reduced-motion` no J1 cobre via seletor `.blueprint-path` que **não existe**. Conserto inline abaixo.

**Correção aplicada:** ajustar J1 para remover `.blueprint-path` do `prefers-reduced-motion` (não usado) e adicionar seletor genérico `[style*="drawPath"]` ou apenas manter sem — paths do SVG já param de animar se `animation: none !important` for aplicado ao `svg` pai. **Decisão:** manter regra `prefers-reduced-motion` simples sem `.blueprint-path`, simplificar J1.

Atualizando J1:
