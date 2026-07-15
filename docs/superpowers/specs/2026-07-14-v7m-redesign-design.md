---
title: V7M Home Redesign — Restyling C (scroll-preserving)
date: 2026-07-14
status: approved (Fase 0)
source: claude.ai/design/p/642b415b-5fcd-40c5-b02c-1a88120986d4 (V7M Redesign.dc.html)
repo: /opt/test/v7m-institucional/
branch: v7m-audit-fixes-2 → main (merge direto, rollback manual)
---

# V7M Redesign — Spec

## 1. Objetivo

Substituir o visual da home atual de **v7m.org** pelo visual proposto em `V7M Redesign.dc.html`, **mantendo** a arquitetura de scroll vertical e as 7 seções atuais, **sem regredir** os 42 achados resolvidos na auditoria de 2026-07-08 (`AUDIT.md`).

## 2. Decisões aprovadas

| # | Decisão | Origem |
|---|---|---|
| D1 | **C — Restyling visual na home atual** (mantém scroll, não carousel) | Victor |
| D2 | **8 animações curadas** (aurora, kenburns A/B, riseUp, cascade, drawPath, movingBorder, pulseDot, lampGrow) | Victor |
| D3 | **Segoe UI** do sistema (sem web font) | Victor |
| D4 | **Hero: slot preparado pra vídeo depois** (sem CDN agora) | Victor |
| D5 | **Tech: card com "em breve: IA"** (sem endpoint) | Victor |
| D6 | **Afiliados: tabela de faixas estática** | Victor |
| D7 | **LegalHeader fixo no topo** (Termos/Privacidade) | Victor |
| D8 | **WhatsApp stub** (`wa.me/55?text=...`) | Victor |
| D9 | **Merge direto + rollback manual** (sem PR) | Victor |
| D10 | **TechSection e ContactSection separados** (não juntar) | Victor |
| D11 | **Bento de Educação: visual novo, sem LiquidGlass** | Victor |
| D12 | **Spec gravada em `docs/superpowers/specs/`** | Victor |

## 3. Fora de escopo (explícito)

- Carousel/launchpad com dock inferior (opções A/B do redesign original)
- Geração de headlines por IA (sem endpoint de IA disponível)
- Slider de comissão interativo (substituído por tabela estática)
- 16 dos 24 keyframes do source (D2 — curado para 8)
- Web font (D3 — Segoe UI do sistema)
- Mudanças no Header atual (anchor nav preservada)
- Mudanças em `index.html` (CSP, meta) e nos headers Caddy
- Páginas legais `/termos`, `/privacidade` (inalteradas)
- `entry-server.tsx`, `prerender.mjs`, `routes.ts` (sem mudança de SSR)

## 4. Arquitetura (preservada)

```
App.tsx → HomeStack
├── AuroraBackground (existente)
├── SkipLink (existente)
├── Header (existente, com anchor nav)
├── main#main-content (existente)
│   ├── HeroSection (REESCRITA)
│   ├── EducationSection (REESCRITA — bento grid)
│   ├── AffiliatesSection (REESCRITA — cascade + tabela)
│   ├── TechSection (MÍNIMA — só chip "em breve: IA")
│   ├── EngineeringSection (REESCRITA — blueprint SVG)
│   ├── ContactSection (MÍNIMA — só whatsapp stub se já não tem)
│   └── CareersFooterSection (PRESERVADA)
├── LegalFooter (existente)
└── LegalHeader fixo no topo (NOVO — links Termos/Privacidade sempre visíveis)
```

## 5. Mudanças por seção

### 5.1 Tokens globais (`src/index.css`)

**Adicionar** (não substituir):

```css
:root {
  /* paleta existente preservada */
  --accent-highlight: #eedda1;
  /* gradiente atualizado para usar o highlight */
  --accent-gradient: linear-gradient(135deg, #cd9d58, #eedda1);
}

@keyframes kenburnsA { /* scale 1 → 1.18 com translate 2% -2% */ }
@keyframes kenburnsB { /* scale 1.15 -2% 1% → scale 1 0 0 */ }
@keyframes lampGrow   { /* width 8rem → 30rem, opacity 0.3 → 1 */ }
@keyframes riseUp     { /* translateY 48px → 0, opacity 0 → 1 */ }
@keyframes cascade    { /* translateX 90px rotate 1.5° → 0 0 */ }
@keyframes drawPath   { /* stroke-dashoffset 900 → 0 */ }
@keyframes movingBorder { /* rotate 0 → 360deg */ }
@keyframes pulseDot   { /* box-shadow ring expandido */ }

/* prefers-reduced-motion: já existe regra global; expandir para os 8 novos */
@media (prefers-reduced-motion: reduce) {
  .cinematic-layer, .lamp-line, .hero-card, .bento-card,
  .affiliate-card, .blueprint-path, .moving-border, .pulse-dot {
    animation: none !important;
  }
}
```

### 5.2 HeroSection (REESCRITA)

- Substituir wrapper `LiquidGlass` por 3 camadas cinematográficas (`kenburnsA` + `kenburnsB`) com gradientes radiais
- Adicionar `lampGrow` (linha dourada sobre o título)
- CTA primário "Ver o que fazemos" ganha borda `movingBorder` (conic-gradient rotativa)
- Slot de vídeo: `<video loop muted autoplay playsinline>` com `src` vazio + `data-src=""` para plugar depois
- Copy: manter "Estrutura para Executar" (mesma do source e do site atual)
- Subtítulo: "Supletivo e EAD reconhecidos, software com IA e engenharia civil e elétrica — tudo numa só operação." (preservar)

### 5.3 EducationSection (REESCRITA — bento grid)

- Substituir lista simples por grid 2x2 (1 card grande + 3 cards menores)
- **Sem `LiquidGlass` em cada card** (D11) — visual próprio do redesign: `border` + `bg rgba(15,15,15,0.72)` + `backdrop-filter blur(24px)`
- Cards: Supletivo (grande), Rede de polos, Cursos online, Parceiros & afiliados
- `animation-delay` escalonado (riseUp 0.5s → 0.82s)
- CTA "Conheça o supletivo.net.br" com UTM (A15 da auditoria)

### 5.4 AffiliatesSection (REESCRITA)

- Substituir `Timeline` por 4 cards numerados com `cascade` (delay 0.2s → 0.56s)
- Card #4 destacado (border + glow dourado)
- Tabela de faixas estática abaixo (placeholder editável — você define os valores)
- CTA "Quero ser afiliado" mantido

### 5.5 TechSection (MÍNIMA)

- **Não reescrever visual** — só adicionar chip "em breve: seção regenerada por IA" no topo
- Tudo o mais preservado

### 5.6 EngineeringSection (REESCRITA)

- SVG inline do blueprint (`drawPath` animado)
- Paths: estrutura externa + linhas internas + nó no topo
- `stroke-dasharray="900"` com animation-delay escalonado (0.2s → 1.3s)
- Chips das 6 categorias de serviço mantidos

### 5.7 ContactSection (MÍNIMA)

- WhatsApp stub com link `https://wa.me/55?text=...` (já existe hoje)
- Visual da borda do input preservado (rgba(255,255,255,0.28) — fix A8)

### 5.8 CareersFooterSection (PRESERVADA)

- Visual atual mantido; ganha apenas `<pulseDot>` no logo do header (uma instância global)

### 5.9 LegalHeader (NOVO — fixo no topo)

- Já existe um `LegalHeader` em `App.tsx` (no ramo `/termos`, `/privacidade`)
- **Não confundir**: o que precisa existir é um mini header FIXO com links Termos/Privacidade, sempre visível
- Implementação: `<a href="/termos">Termos</a> · <a href="/privacidade">Privacidade</a>` no topo direito do Header atual ou como barra separada abaixo dele

## 6. Risco de regressão (matriz de proteção)

| Achado auditoria | Status atual | Risco no redesign | Mitigação obrigatória |
|---|---|---|---|
| C2 — variáveis CSS inexistentes | Resolvido | **Médio** | Usar só tokens validados; não criar novos sem teste de build |
| A6 — hover prata→dourado | Resolvido | Baixo | `hover:bg-[#e0b570]` no novo CTA |
| A7 — `<a href>` no Header | Resolvido | Nenhum | Não tocar Header |
| A8 — borda dos inputs 1.1:1 | Resolvido | Nenhum | Preservar cor da borda |
| A9 — foco em skip-link | Resolvido | Nenhum | Não tocar skip-link |
| A14 — copy do Hero | Já é "Estrutura para Executar" | Nenhum | Mesma copy |
| M2 — 3 sistemas de card | Parcialmente | **Alto** | D11: cards de Educação seguem padrão próprio (não LiquidGlass), mas documentar como 4º padrão e unificar em spec futura |
| M3 — vidro aninhado | Resolvido | Baixo | Bento não usa LiquidGlass; usa bg próprio |

## 7. Critérios de aceitação

- `npm ci && npm run lint && npm run build` passa limpo
- `npm run preview` em `/`, `/termos/`, `/privacidade/`
- Tab pelo site, skip-link funciona, foco visível
- `prefers-reduced-motion: reduce` desativa os 8 novos keyframes
- Lighthouse desktop e mobile: Performance ≥ 95, A11y ≥ 95
- Bundle JS continua < 85 KB gzip (sem JS novo; só CSS keyframes)
- Screenshots antes/depois em `evidences/redesign/`

## 8. Plano de implementação (jornadas)

| # | Jornada | Arquivos tocados | Risco regressão |
|---|---|---|---|
| J1 | Tokens + 8 keyframes + prefers-reduced-motion | `src/index.css` | Médio (CSS) |
| J2 | Hero restyling (cinematic layers + lamp + movingBorder + slot vídeo) | `src/components/sections/HeroSection.tsx` | Baixo |
| J3 | Education bento grid | `src/components/sections/EducationSection.tsx` | Médio (M2) |
| J4 | Affiliates cascade + tabela | `src/components/sections/AffiliatesSection.tsx` + (deletar `Timeline.tsx` ou tornar unused) | Médio |
| J5 | Tech chip "em breve: IA" | `src/components/sections/TechSection.tsx` (1 linha) | Mínimo |
| J6 | Engenharia blueprint SVG | `src/components/sections/EngineeringSection.tsx` + `src/components/ui/BlueprintSVG.tsx` (NOVO) | Baixo |
| J7 | LegalHeader fixo no topo (mini) | `src/components/ui/Header.tsx` (mini bloco) ou novo componente | Baixo |
| J8 | Verificação completa | `evidences/redesign/`, Lighthouse, axe | — |

## 9. Verificação ao final

- [ ] Build passa limpo
- [ ] Screenshots antes/depois em `evidences/redesign/` (mobile 375px + desktop 1280px)
- [ ] Lighthouse desktop: Performance ≥ 95, A11y ≥ 95
- [ ] Lighthouse mobile: Performance ≥ 90, A11y ≥ 95
- [ ] `axe-core` 0 violations
- [ ] `curl -sSI https://v7m.org` headers inalterados (6 headers)
- [ ] `npm run preview` em todas as 3 rotas
- [ ] Teste de teclado: Tab pela home, skip-link funcional, foco em todas âncoras

## 10. Rollback

- Merge direto em `main` (D9)
- Se regressão crítica for detectada pós-deploy: `git revert <merge-commit-sha>` + push
- Não há flag de preview (D9 — sem feature flag)

---

*Aprovada por Victor em 2026-07-14. Próxima etapa: skill `writing-plans` para detalhar cada jornada.*
