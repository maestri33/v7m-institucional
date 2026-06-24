import ReactFullpageImport from '@fullpage/react-fullpage'
import type { fullpageApi } from '@fullpage/react-fullpage'
import { AuroraBackground } from './components/ui/AuroraBackground'
import { Header } from './components/ui/Header'
import HeroSection from './components/sections/HeroSection'
import EducationSection from './components/sections/EducationSection'
import AffiliatesSection from './components/sections/AffiliatesSection'
import TechSection from './components/sections/TechSection'
import EngineeringSection from './components/sections/EngineeringSection'
import VideoMaskSection from './components/sections/VideoMaskSection'
import ContactSection from './components/sections/ContactSection'
import CareersFooterSection from './components/sections/CareersFooterSection'
import TermsOfUse from './components/TermsOfUse'
import PrivacyPolicy from './components/PrivacyPolicy'

// @fullpage/react-fullpage is bundled as CommonJS with `module.exports = { default: Component }`.
// Vite's client build resolves the default import to the class, but Node SSR imports the whole
// module object. Normalize so the same code works in both environments.
const ReactFullpage =
  typeof ReactFullpageImport === 'function'
    ? ReactFullpageImport
    : (ReactFullpageImport as unknown as { default: typeof ReactFullpageImport }).default

const FullpageWrapper =
  (ReactFullpageImport as unknown as { Wrapper?: typeof ReactFullpageImport.Wrapper }).Wrapper ??
  ReactFullpage.Wrapper

const ANCHORS = [
  'home',
  'educacao',
  'afiliados',
  'tech',
  'engenharia',
  'video',
  'contato',
  'carreiras',
]

function FullpageApp() {
  return (
    <ReactFullpage
      // TODO: replace OPEN-SOURCE-GPLV3-LICENSE with a commercial fullpage.js license key before production.
      licenseKey="OPEN-SOURCE-GPLV3-LICENSE"
      anchors={ANCHORS}
      navigation
      navigationPosition="right"
      scrollingSpeed={700}
      scrollOverflow
      credits={{ enabled: false }}
      render={({ fullpageApi }: { fullpageApi: fullpageApi }) => {
        return (
          <FullpageWrapper>
            <Header fullpageApi={fullpageApi} />
            <HeroSection />
            <EducationSection />
            <AffiliatesSection />
            <TechSection />
            <EngineeringSection />
            <VideoMaskSection />
            <ContactSection />
            <CareersFooterSection />
          </FullpageWrapper>
        )
      }}
    />
  )
}

export default function App() {
  const hash =
    typeof window !== 'undefined'
      ? window.location.hash.replace(/^#/, '').trim().toLowerCase()
      : ''

  if (hash === 'termos') {
    return <TermsOfUse />
  }

  if (hash === 'privacidade') {
    return <PrivacyPolicy />
  }

  return (
    <>
      <AuroraBackground />
      <FullpageApp />
    </>
  )
}
