# AUDIT.md — v7m-institucional (v7m.org)

**Data:** 2026-07-08
**Escopo:** Site institucional V7M — Vite + React 19 + TS + Tailwind v4, SSR/prerender
**Método:** 10 agents especializados + MCP frontend-checklist (385 regras) + auditoria da página renderizada (https://v7m.org)
**Agentes:** UI Designer, UX Researcher, Accessibility Auditor, Frontend Developer, Code Reviewer, Senior SecOps, Performance Benchmarker, SEO Specialist, Content Creator, Growth Hacker

---

## Sumário executivo

O site está **bem construído para o tamanho** (~1.885 LOC): fundações de acessibilidade presentes (skip-link, aria, `prefers-reduced-motion`, `<noscript>`, CSP), SSR/prerender funcional, design system com paleta dark+dourado e glassmorphism. Não é um resgate — é **refinamento de decente para excelente**.

**87 achados** brutos dos 10 agents, reduzidos a **42 achados únicos** após deduplicação. Desses, **5 críticos** (bugs que quebram funcionalidade), **15 altos**, **16 médios**, **6 baixos**.

O fio condutor: o site fala "corporativês de operações" na moldura (Hero, Contato, Carreiras) e só fala com o aluno dentro da seção Educação. O canal de conversão (`mailto:`) é o teto de crescimento — o público real (aluno de supletivo, mobile-first, WhatsApp-first) não converte por email. E há bugs de correção que quebram a hidratação SSR e a validação do form.

---

## Matriz de prioridade (impacto × esforço)

### 🔴 Bloco 1 — Críticos (corrigir antes do próximo deploy)

| # | Achado | Severidade | Esforço | Agentes |
|---|--------|-----------|---------|---------|
| C1 | **Trailing slash quebra SSR/hydration** — `/termos/` → `readHash()` retorna `'termos/'` → não casa → HomeStack substitui TermsOfUse na hidratação. `App.tsx:76` | CRÍTICO | 1 linha | Code Review, Frontend |
| C2 | **Variáveis CSS referenciadas na JSX não existem** — `var(--near-black)`, `var(--accent-gold)`, `var(--accent-silver)` não são definidas (o `@theme` só define `--color-near-black` etc.). Texto dos botões dourados herda cor clara → falha de contraste. `HeroSection.tsx:22`, `ContactSection.tsx:221`, `EducationSection.tsx:136`, `AffiliatesSection.tsx:89`, `EngineeringSection.tsx:137`, `ErrorBoundary.tsx:54`, `TermsOfUse.tsx`, `PrivacyPolicy.tsx` | CRÍTICO | find/replace | Frontend, UI, A11y |
| C3 | **Form de contato falha em silêncio no submit inválido** — campos só com espaços passam no `required` nativo mas falham no `.trim()` → `return` sem feedback. Sem `aria-invalid`, sem mensagem de erro, sem foco no campo inválido. `ContactSection.tsx:60-62` | CRÍTICO | Médio | UX, A11y, Code Review |
| C4 | **Email aceita lixo** — `type="email"` nativo aceita `"abc"` (não exige TLD). Só checa truthiness. `ContactSection.tsx:60` | CRÍTICO | 1 linha | Code Review |
| C5 | **CSP `frame-ancestors 'none'` é inerte** — declarada via `<meta>`, mas por especificação `frame-ancestors` é ignorada em meta CSP. Sem header HTTP `X-Frame-Options`. Site pode ser embutido em iframe por qualquer origem. `index.html:11` | CRÍTICO | 5 min (Caddy) | SecOps |

### 🟠 Bloco 2 — Altos (este sprint)

| # | Achado | Severidade | Esforço | Agentes |
|---|--------|-----------|---------|---------|
| A1 | **mailto: é o teto de conversão** — público supletivo é mobile/WhatsApp-first, não usa email. `mailto:` falha em silêncio no mobile sem app de email configurado. `ContactSection.tsx:77` | ALTO | Baixo | UX, Growth |
| A2 | **Zero rastreamento** — sem GA4, pixel ou analytics. CSP atual (`script-src 'self'`, `connect-src 'self'`) bloqueia ativamente qualquer beacon. Impossível medir conversão ou fazer remarketing. `index.html:10-11` | ALTO | Médio | Growth, SEO |
| A3 | **Páginas legais órfãs** — links internos usam `#termos`/`#privacidade` (fragmentos da home), mas as páginas reais são `/termos/` e `/privacidade/`. Google não recebe PageRank para as URLs indexáveis. `CareersFooterSection.tsx:25,31` | ALTO | 2 linhas | SEO |
| A4 | **Jornada do afiliado promete self-service que não existe** — Timeline diz "cadastro em minutos", "painel do afiliado", "resultados em tempo real", mas CTA cai no mesmo form mailto. `AffiliatesSection.tsx:6-31,88` | ALTO | Baixo (copy) | UX, Growth |
| A5 | **4 públicos → 1 formulário genérico, sem contexto** — CTAs de Tech, Engenharia, Afiliados e Educação jogam no mesmo form com dropdown vazio. Quem clicou "Solicitar orçamento" tem que reencontrar "Engenharia". `ContactSection.tsx:25` | ALTO | Baixo | UX |
| A6 | **Botão dourado vira PRATA no hover em 3 seções** — `hover:bg-[var(--accent-secondary)]` (#d6d6d6) em Tech, Engineering, Affiliates. Lê como bug. `TechSection.tsx:141`, `EngineeringSection.tsx:137`, `AffiliatesSection.tsx:89` | ALTO | Trivial | UI |
| A7 | **Navegação usa `<button>` em vez de `<a href>`** — perde abrir-em-nova-aba, clique-do-meio, semântica de link, e lista de links para leitores de tela. `Header.tsx:27,70-78,109-116` | ALTO | ~10 linhas | A11y, Code Review, Frontend |
| A8 | **Bordas dos inputs ~1.1:1 (falha WCAG 1.4.11)** — `rgba(255,255,255,0.08)` sobre fundo escuro. Campos quase invisíveis em repouso para baixa visão. `ContactSection.tsx:128,150,171,187,215` | ALTO | 1 token | A11y |
| A9 | **Skip-link e âncoras movem scroll mas não o foco** — `tabIndex={-1}` ausente em `<main>` e `<section>`. Teclado não entra no destino. `App.tsx:35`, `Section.tsx` | ALTO | 2 linhas | A11y |
| A10 | **framer-motion = 41 KB gzip (33% do bundle)** — para animações que CSS puro resolve (fade-up + stagger). Também ignora `prefers-reduced-motion`. 5 arquivos. | ALTO | Médio | Performance, Frontend, A11y |
| A11 | **Zero code-splitting** — páginas legais (8.6 KB) e seções abaixo da dobra no mesmo chunk de 393 KB. `App.tsx` (imports estáticos) | ALTO | Baixo | Performance |
| A12 | **og-image.png: 96 KB** — WebP reduz para ~25 KB. `public/og-image.png` | ALTO | Trivial | Performance |
| A13 | **"Email profissional / @empresa.com" exclui aluno** — label e placeholder assumem que o lead tem empresa. `ContactSection.tsx:137,145` | ALTO | 2 palavras | Copy, Growth |
| A14 | **Proposta de valor do Hero é corporativês vago** — "Estrutura para Executar" + "organiza, implanta e sustenta operações". Nenhum público se reconhece. `HeroSection.tsx:13,16` | ALTO | Baixo (copy) | Copy, UX, Growth |
| A15 | **Handoff para supletivo.net.br sem UTM** — atribuição perdida, tráfego chega como "direct". `EducationSection.tsx:133` | ALTO | 1 linha | Growth |

### 🟡 Bloco 3 — Médios (próximo sprint)

| # | Achado | Severidade | Esforço | Agentes |
|---|--------|-----------|---------|---------|
| M1 | **Sistema de tokens em cérebro-dividido** — `@theme` e `:root` duplicam valores com nomes divergentes. Causa-raiz de C2. `index.css:3-42` | MÉDIO | Médio | Frontend, UI |
| M2 | **Três sistemas de card/ícone diferentes** — Education (ícone nu vertical), Tech (ícone em caixa horizontal), Engineering (ícone em círculo). Mesmo padrão, 3 layouts. | MÉDIO | Médio | UI |
| M3 | **Vidro aninhado idêntico achata hierarquia** — painel `0.72` e cards internos `0.72` = sem elevação. `LiquidGlass.tsx:14` | MÉDIO | Baixo | UI |
| M4 | **Engenharia quebra padrão estrutural** — sem painel LiquidGlass envolvente (diferente de Education/Tech). `EngineeringSection.tsx:80` | MÉDIO | Baixo | UI |
| M5 | **Largura de coluna oscila entre seções** — 4xl→6xl→3xl→6xl→7xl→3xl ao rolar. | MÉDIO | Trivial | UI |
| M6 | **CTA do Hero "Nossas Operações" é rótulo interno** — não diz ação nem destino. `HeroSection.tsx:24` | MÉDIO | Baixo (copy) | Copy, UX |
| M7 | **Headlines redundantes ou fracas** — Educação repete selo, Tech "Programação +" parece rascunho, Afiliados não menciona comissão. | MÉDIO | Baixo (copy) | Copy |
| M8 | **"Stats" são slogans disfarçados de métricas** — formato visual de KPI numérico com conteúdo de tagline. Dissonância que reduz confiança. 3 seções. | MÉDIO | Baixo | UI, UX, Copy |
| M9 | **Trailing-slash inconsistente** — canonical/sitemap apontam sem barra, servidor serve com barra (301). `prerender.mjs:36,48`, `sitemap.xml` | MÉDIO | Baixo | SEO |
| M10 | **JSON-LD Organization genérico, `sameAs: []` vazio** — sem corroboração de entidade. `index.html:38,55` | MÉDIO | Baixo | SEO, Growth |
| M11 | **Sem dados estruturados de nicho** — sem `Course`/`Service`/`FAQPage` para rich results de educação. | MÉDIO | Médio | SEO |
| M12 | **mailto estoura com mensagens longas** — `encodeURIComponent` expande acentos (ç→%C3%A7), body pode ultrapassar 2000 chars. `ContactSection.tsx:64-77` | MÉDIO | 3 linhas | Code Review |
| M13 | **Double-submit race no form** — dois cliques rápidos abrem dois clientes de email. `ContactSection.tsx:77-80` | MÉDIO | 4 linhas | Code Review |
| M14 | **ErrorBoundary não cobre erros assíncronos** — `useEffect`/`onClick` que lançam não são capturados. `ErrorBoundary.tsx:16-63` | MÉDIO | ~15 linhas | Code Review |
| M15 | **Conflito hash+path: `/termos#privacidade`** — hash tem prioridade sobre path, mostra página errada. `App.tsx:74-77` | MÉDIO | 3 linhas | Code Review |
| M16 | **`role="dialog"` mal aplicado no menu mobile** — promete modal sem focus-trap. `Header.tsx:97` | MÉDIO | 1 linha | A11y |

### 🟢 Bloco 4 — Baixos/Polimento

| # | Achado | Severidade | Esforço | Agentes |
|---|--------|-----------|---------|---------|
| B1 | **Cores mágicas hardcoded** — `rgba(255,255,255,0.08)` repetida ~15x sem token. | BAIXO | Médio | Frontend |
| B2 | **`focus-visible:outline-*` redundante** — regra global já cobre; 2 ocorrências incompletas. | BAIXO | Trivial | Frontend |
| B3 | **Código morto: `VideoMaskSection.tsx`** — não importado em lugar nenhum. | BAIXO | Delete | Frontend |
| B4 | **`new Date().getFullYear()` no render** — risco de mismatch na virada de ano. `CareersFooterSection.tsx:6`, `LegalFooter.tsx:4` | BAIXO | 1 linha | Frontend |
| B5 | **Regex gulosa no prerender** — `[^]*` pode sobre-capturar. `prerender.mjs:50` | BAIXO | Baixo | Frontend |
| B6 | **`aria-required` redundante com `required`** — ARIA supérflua. `ContactSection.tsx:127,149,214` | BAIXO | Delete 3 attrs | A11y |

---

## Conflitos resolvidos

| Conflito | Agentes | Resolução |
|----------|---------|-----------|
| Cor do texto do botão dourado | Frontend (var não existe → claro) × A11y (calculou escuro 8.1:1) | **Verificar empiricamente** no site renderizado. Se claro: corrigir C2. Se escuro: o browser está resolvendo de outra forma — investigar. |
| Motion: quanto e como | UI (quer hover), A11y (quer reduced-motion), Perf (quer remover framer-motion) | **Remover framer-motion** (A10), usar CSS animations que respeitam `prefers-reduced-motion`. Hover transitions em CSS (leves, sem JS). |
| Carreiras: manter ou remover | UX (remover do header), Growth (relegar a footer), Copy (adicionar captura) | **Remover do header**, manter no footer com link mailto/WhatsApp para banco de talentos. |
| Stats: remover ou preencher | UI (remover formato KPI), UX (usar números reais), Copy (manter honesto) | **Substituir por bullets/selos** até haver números reais. Não fabricar métricas. |
| Seção Vídeo | Frontend (código morto), UI (placeholder vazio) | **Deletar `VideoMaskSection.tsx`**. Recriar quando houver conteúdo. |

---

## Headers HTTP — bloco Caddy (resolve C5 + A2 + baseline)

```caddy
header {
    Content-Security-Policy "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google-analytics.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com; object-src 'none'; base-uri 'self'; form-action 'self' mailto:; frame-ancestors 'none'"
    Strict-Transport-Security "max-age=31536000; includeSubDomains"
    X-Content-Type-Options "nosniff"
    X-Frame-Options "DENY"
    Referrer-Policy "strict-origin-when-cross-origin"
    Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
    -Server
}
```

**Nota:** `script-src` e `connect-src` expandidos para GA4/GTM. Ajustar domínios conforme provider de analytics escolhido. Se usar Plausible/umami (alternativa leve, sem cookies), ajustar domínios.

---

## Ordem de execução recomendada

### Dia 1 (~2h) — Críticos + triviais de alto impacto
1. C1: trailing slash (1 linha)
2. C2: variáveis CSS (find/replace)
3. C4: validação de email (1 linha)
4. C5: headers HTTP no Caddy (5 min)
5. A6: hover prata→dourado (trivial)
6. A12: og-image WebP (trivial)
7. A13: "Email profissional" → "Email" (2 palavras)
8. A15: UTM no link supletivo (1 linha)
9. A3: links legais `#termos` → `/termos` (2 linhas)

### Dia 2 (~3h) — Conversão + acessibilidade
10. A1: WhatsApp como canal primário (1 componente)
11. A8: bordas dos inputs (1 token)
12. A9: foco em skip-link/âncoras (2 linhas)
13. A7: `<button>` → `<a href>` no Header (~10 linhas)
14. C3: erros acessíveis do form (médio)
15. A5: deep-link de assunto no form (baixo)
16. A4: copy do afiliado (baixo)
17. A14: copy do Hero (baixo)

### Dia 3 (~3h) — Performance + código
18. A10: remover framer-motion (médio)
19. A11: code-split legal pages (baixo)
20. M1: unificar tokens `@theme`/`:root` (médio)

### Backlog — Próximo sprint
21. M2–M16, B1–B6: cards, vidro, SEO técnico, ErrorBoundary, polimento

---

## Verificação

- [ ] `npm ci && npm run lint && npm run build` passa limpo
- [ ] `npm run preview` — navegar todas as rotas (`/`, `/termos/`, `/privacidade/`)
- [ ] Teste de teclado: Tab pela home, skip-link funciona, âncoras recebem foco
- [ ] Form: submeter vazio → erro acessível; email inválido → barrado; submit válido → mailto abre
- [ ] Mobile: WhatsApp CTA visível, mailto fallback funciona
- [ ] `curl -sSI https://v7m.org/ | grep -iE "content-security-policy|strict-transport|x-frame|x-content-type|referrer-policy|permissions-policy"` → 6 headers
- [ ] Lighthouse: CWV < 2.5s LCP, < 0.1 CLS, < 200ms TBT em 4G
- [ ] Bundle JS < 85 KB gzip (após remover framer-motion + code-split)

---

## Agentes participantes

| Agente | Achados brutos | Dimensão |
|--------|---------------|----------|
| UI Designer | 12 | Sistema visual, consistência, tokens |
| UX Researcher | 11 | Arquitetura de informação, conversão, jornadas |
| Accessibility Auditor | 9 | WCAG 2.2 AA, contraste, foco, formulários |
| Frontend Developer | 12 | Qualidade de código, arquitetura, dívida técnica |
| Code Reviewer | 8 | Bugs de correção, edge cases, runtime |
| Senior SecOps | 4 | Headers HTTP, CSP, injeção, hardening |
| Performance Benchmarker | 12 | Bundle, CWV, code-splitting, imagens |
| SEO Specialist | 10 | Indexação, dados estruturados, prerender, hash |
| Content Creator | 11 | Copy, tom, CTAs, proposta de valor |
| Growth Hacker | 12 | Conversão, canais, funil, rastreamento |
| **Total** | **101** → **42 únicos** | |

---

*Relatório gerado por equipe de 10 agents especializados + MCP frontend-checklist (385 regras, 11 categorias).*
*Baseline: Fase 0 (read-only) — review_code + audit_url + grep de verificação.*
*Fase 1: fanout paralelo dos 10 agents com baseline injetado.*
*Fase 2: deduplicação, resolução de conflitos, priorização por impacto×esforço.*
