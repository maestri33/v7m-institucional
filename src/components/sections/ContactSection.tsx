import { type ChangeEvent, type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Phone, Send, User } from 'lucide-react'
import { Section } from '../ui/Section'
import { LiquidGlass } from '../ui/LiquidGlass'

type ContactForm = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type FeedbackState = 'idle' | 'ready'

const INITIAL_FORM: ContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const SUBJECT_OPTIONS = [
  { value: '', label: 'Selecione um assunto' },
  { value: 'Educação', label: 'Educação' },
  { value: 'Afiliados', label: 'Afiliados' },
  { value: 'Tecnologia', label: 'Tecnologia' },
  { value: 'Engenharia', label: 'Engenharia' },
  { value: 'Outro', label: 'Outro' },
]

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'contato@v7m.org'

export default function ContactSection() {
  // ponytail: pre-select subject from hash (e.g. #contato-engenharia → Engenharia)
  const initialSubject = (() => {
    if (typeof window === 'undefined') return ''
    const h = window.location.hash.replace(/^#contato-?/, '').toLowerCase()
    const match = SUBJECT_OPTIONS.find(o => o.value.toLowerCase() === h || o.label.toLowerCase() === h)
    return match ? match.value : ''
  })()

  const [form, setForm] = useState<ContactForm>({ ...INITIAL_FORM, subject: initialSubject })
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('idle')
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({})

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))

    if (feedbackState !== 'idle') {
      setFeedbackState('idle')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // ponytail: guard double-submit race
    if (submitting) return

    const cleanName = form.name.trim()
    const cleanEmail = form.email.trim()
    const cleanPhone = form.phone.trim()
    const cleanSubject = form.subject.trim()
    const cleanMessage = form.message.trim()

    // ponytail: validate email format (native type=email accepts "abc"), guard against whitespace-only
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)

    const newErrors: Partial<Record<keyof ContactForm, string>> = {}
    if (!cleanName) newErrors.name = 'Informe seu nome completo.'
    if (!cleanEmail) newErrors.email = 'Informe seu email.'
    else if (!emailValid) newErrors.email = 'Informe um email válido (ex: nome@dominio.com).'
    if (!cleanMessage) newErrors.message = 'Escreva sua mensagem.'

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      // Focus first invalid field for keyboard users
      const firstKey = Object.keys(newErrors)[0] as keyof ContactForm
      const el = document.getElementById(firstKey)
      el?.focus()
      return
    }

    const subject = encodeURIComponent(`Contato via v7m.org - ${cleanName}`)
    const body = encodeURIComponent(
      [
        `Nome: ${cleanName}`,
        `Email: ${cleanEmail}`,
        ...(cleanPhone ? [`Telefone: ${cleanPhone}`] : []),
        ...(cleanSubject ? [`Assunto/Interesse: ${cleanSubject}`] : []),
        '',
        'Mensagem:',
        // ponytail: truncate long messages to avoid mailto URL length limits (~2000 chars)
        cleanMessage.length > 800 ? cleanMessage.slice(0, 800) + '… [mensagem truncada — envie o restante por email]' : cleanMessage,
      ].join('\n'),
    )

    setSubmitting(true)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    setFeedbackState('ready')
    setForm(INITIAL_FORM)
    // ponytail: reset submitting after navigation; mailto: navigates away so this is defensive
    setTimeout(() => setSubmitting(false), 1000)
  }

  return (
    <Section id="contato" ariaLabelledBy="contact-title">
      <motion.div
        initial={{ y: 24 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-3xl"
      >
        <LiquidGlass className="p-6 md:p-10">
          <div className="text-center mb-8">
            <h2 id="contact-title" className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
              Fale com a <span className="text-gradient">V7M</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Entre em contato para conhecer nossas operações, propor parcerias ou explorar
              oportunidades.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <p className="text-xs text-[var(--text-secondary)]">
              Campos marcados com <span className="text-[var(--accent-primary)]" aria-hidden="true">*</span>
              <span className="sr-only">asterisco</span> são obrigatórios.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]"
                >
                  <User size={16} aria-hidden="true" /> Nome completo
                  <span className="text-[var(--accent-primary)]" aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={handleChange}
                  required
                  aria-invalid={errors.name ? 'true' : undefined}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.28)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition focus:border-[var(--accent-primary)] focus:bg-[rgba(255,255,255,0.07)]"
                />
                {errors.name && <p id="name-error" className="text-sm text-red-400 mt-1" role="alert">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]"
                >
                  <Mail size={16} aria-hidden="true" /> Email
                  <span className="text-[var(--accent-primary)]" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.28)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition focus:border-[var(--accent-primary)] focus:bg-[rgba(255,255,255,0.07)]"
                />
                {errors.email && <p id="email-error" className="text-sm text-red-400 mt-1" role="alert">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]"
                >
                  <Phone size={16} aria-hidden="true" /> Telefone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(00) 00000-0000"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.28)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition focus:border-[var(--accent-primary)] focus:bg-[rgba(255,255,255,0.07)]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]"
                >
                  <MessageSquare size={16} aria-hidden="true" /> Assunto/Interesse
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.28)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[var(--text-primary)] transition focus:border-[var(--accent-primary)] focus:bg-[rgba(255,255,255,0.07)] appearance-none"
                >
                  {SUBJECT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]"
              >
                <MessageSquare size={16} aria-hidden="true" /> Mensagem
                <span className="text-[var(--accent-primary)]" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Como podemos ajudar?"
                value={form.message}
                onChange={handleChange}
                required
                aria-invalid={errors.message ? 'true' : undefined}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.28)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition focus:border-[var(--accent-primary)] focus:bg-[rgba(255,255,255,0.07)] resize-none"
              />
              {errors.message && <p id="message-error" className="text-sm text-red-400 mt-1" role="alert">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] px-6 py-3.5 font-semibold text-[var(--bg-primary)] transition hover:bg-[#e0b570] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Enviar mensagem <Send size={18} aria-hidden="true" />
            </button>

            <div className="text-center pt-2">
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">ou fale direto no</p>
              <a
                href="https://wa.me/55?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20V7M"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>

            <p
              className="text-center text-sm text-[var(--text-secondary)]"
              aria-live="polite"
            >
              {feedbackState === 'ready'
                ? 'Abrindo seu aplicativo de email com os dados preenchidos.'
                : `Se preferir, envie direto para ${CONTACT_EMAIL}.`}
            </p>
          </form>
        </LiquidGlass>
      </motion.div>
    </Section>
  )
}
