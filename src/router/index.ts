import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
import PhbHomeView from '../views/PhbHomeView.vue'
import QualifyView from '../views/QualifyView.vue'
import BookingView from '../views/BookingView.vue'
import ConfirmedView from '../views/ConfirmedView.vue'
import NotQualifiedView from '../views/NotQualifiedView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import LegalNoticeView from '../views/LegalNoticeView.vue'
import ShaHomeView from '../views/ShaHomeView.vue'

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
    canonical: string
    ogTitle: string
    ogDescription: string
    ogUrl: string
  }
}

const BASE = 'https://evr.powerhousebiotech.com'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, behavior: 'instant' }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PhbHomeView,
      meta: {
        title: 'PowerHouse Biotech | Evaluación de Viabilidad Regenerativa™',
        description: 'Somos la primera Health Decision Platform enfocada en Medicina Regenerativa. Descubre hoy si tu cuerpo está listo para repararse.',
        canonical: `${BASE}/`,
        ogTitle: 'PowerHouse Biotech | ¿Puede tu cuerpo mejorar?',
        ogDescription: '+15 años, +100,000 casos analizados. Evaluación honesta antes de cualquier tratamiento.',
        ogUrl: `${BASE}/`,
      } satisfies RouteMeta,
    },
    {
      path: '/cualificar',
      name: 'qualify',
      component: QualifyView,
      meta: {
        title: 'Evaluación Inicial | PowerHouse Biotech',
        description: 'Responde 3 preguntas para saber si eres candidato a la Evaluación de Viabilidad Regenerativa™.',
        canonical: `${BASE}/cualificar`,
        ogTitle: 'Evaluación Inicial | PowerHouse Biotech',
        ogDescription: 'Responde 3 preguntas y descubre si tu cuerpo puede regenerarse.',
        ogUrl: `${BASE}/cualificar`,
      } satisfies RouteMeta,
    },
    {
      path: '/agendar',
      name: 'booking',
      component: BookingView,
      meta: {
        title: 'Agenda tu Consulta | PowerHouse Biotech',
        description: 'Selecciona tu horario para la Evaluación de Viabilidad Regenerativa™.',
        canonical: `${BASE}/agendar`,
        ogTitle: 'Agenda tu Consulta | PowerHouse Biotech',
        ogDescription: 'Elige el día y hora para tu consulta de evaluación con el equipo de PowerHouse Biotech.',
        ogUrl: `${BASE}/agendar`,
      } satisfies RouteMeta,
    },
    {
      path: '/evaluacion-confirmada',
      name: 'confirmed',
      component: ConfirmedView,
      meta: {
        title: 'Consulta Confirmada | PowerHouse Biotech',
        description: 'Tu consulta de Evaluación de Viabilidad Regenerativa™ está confirmada.',
        canonical: `${BASE}/evaluacion-confirmada`,
        ogTitle: 'Consulta Confirmada | PowerHouse Biotech',
        ogDescription: 'Tu consulta está confirmada. Prepárate para descubrir si tu cuerpo puede regenerarse.',
        ogUrl: `${BASE}/evaluacion-confirmada`,
      } satisfies RouteMeta,
    },
    {
      path: '/no-califica',
      name: 'not-qualified',
      component: NotQualifiedView,
      meta: {
        title: 'No Califica | PowerHouse Biotech',
        description: 'En este momento no eres candidato para la Evaluación de Viabilidad Regenerativa™.',
        canonical: `${BASE}/no-califica`,
        ogTitle: 'Resultado de Evaluación | PowerHouse Biotech',
        ogDescription: 'Tu perfil actual requiere una preparación diferente.',
        ogUrl: `${BASE}/no-califica`,
      } satisfies RouteMeta,
    },
    {
      path: '/politicas-privacidad',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
      meta: {
        title: 'Política de Privacidad | PowerHouse Biotech',
        description: 'Política de privacidad de PowerHouse Biotech.',
        canonical: `${BASE}/politicas-privacidad`,
        ogTitle: 'Política de Privacidad | PowerHouse Biotech',
        ogDescription: 'Política de privacidad de PowerHouse Biotech.',
        ogUrl: `${BASE}/politicas-privacidad`,
      } satisfies RouteMeta,
    },
    {
      path: '/sha',
      name: 'sha-home',
      component: ShaHomeView,
      meta: {
        title: 'SHA — Masters of Longevity',
        description: 'Science-based programs for measurable health transformation.',
        canonical: `${BASE}/sha`,
        ogTitle: 'SHA — Masters of Longevity',
        ogDescription: 'Defining the Next Frontier of Health Optimization.',
        ogUrl: `${BASE}/sha`,
      } satisfies RouteMeta,
    },
    {
      path: '/aviso-legal',
      name: 'legal-notice',
      component: LegalNoticeView,
      meta: {
        title: 'Aviso Legal | PowerHouse Biotech',
        description: 'Aviso legal de PowerHouse Biotech.',
        canonical: `${BASE}/aviso-legal`,
        ogTitle: 'Aviso Legal | PowerHouse Biotech',
        ogDescription: 'Aviso legal de PowerHouse Biotech.',
        ogUrl: `${BASE}/aviso-legal`,
      } satisfies RouteMeta,
    },
    {
      path: '/diabetes-regenerativa',
      name: 'diabetes-regenerativa',
      component: () => import('../views/DiabetesView.vue'),
      meta: {
        title: 'Diabetes y Medicina Regenerativa | PowerHouse Biotech',
        description: 'Medicina Regenerativa con criterio, experiencia y protocolo integral para el manejo de la diabetes.',
        canonical: `${BASE}/diabetes-regenerativa`,
        ogTitle: 'Diabetes: Resuelve de raíz con Medicina Regenerativa',
        ogDescription: 'Descubre el protocolo integral de medicina regenerativa para diabetes. Más de 15,000 pacientes atendidos.',
        ogUrl: `${BASE}/diabetes-regenerativa`,
      } satisfies RouteMeta,
    },
    {
      path: '/comunidad',
      name: 'whatsapp-community',
      component: () => import('../views/WhatsappView.vue'),
      meta: {
        title: 'Comunidad de WhatsApp | PowerHouse Biotech',
        description: 'Únete a nuestra comunidad exclusiva de longevidad y medicina regenerativa de precisión.',
        canonical: `${BASE}/comunidad`,
        ogTitle: 'Comunidad de WhatsApp | PowerHouse Biotech',
        ogDescription: 'Accede a artículos de valor, casos de estudio clínicos y sesiones de preguntas y respuestas en nuestra comunidad exclusiva.',
        ogUrl: `${BASE}/comunidad`,
      } satisfies RouteMeta,
    },
  ],
})

// ── Guards de navegación ───────────────────────────────────────────────────────
router.beforeEach((to) => {
  if ((to.name === 'booking' || to.name === 'confirmed') && !localStorage.getItem('phb_qualified_at')) {
    if (!localStorage.getItem('phb_contact')) return { name: 'home' }
    return { name: 'qualify' }
  }
})

// ── SEO dinámico por ruta ──────────────────────────────────────────────────────
const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el) }
  el.content = content
}

const setOgMeta = (property: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el) }
  el.content = content
}

const setCanonical = (href: string) => {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el) }
  el.href = href
}

router.afterEach((to) => {
  const meta = to.meta
  document.title = meta.title ?? 'PowerHouse Biotech'
  setMeta('description', meta.description ?? '')
  setOgMeta('og:title', meta.ogTitle ?? meta.title ?? '')
  setOgMeta('og:description', meta.ogDescription ?? meta.description ?? '')
  setOgMeta('og:url', meta.ogUrl ?? '')
  setOgMeta('twitter:title', meta.ogTitle ?? meta.title ?? '')
  setOgMeta('twitter:description', meta.ogDescription ?? meta.description ?? '')
  setCanonical(meta.canonical ?? '')
})

export default router
