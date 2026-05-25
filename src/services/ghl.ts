const GHL_CONTACT_WEBHOOK = import.meta.env.VITE_GHL_CONTACT_WEBHOOK as string || 'https://services.leadconnectorhq.com/hooks/P62nq2IVqxaQbOrD3P1R/webhook-trigger/nybcYHygF1p9JVU8HnZx'
const GHL_QUALIFY_WEBHOOK = import.meta.env.VITE_GHL_QUALIFY_WEBHOOK as string || 'https://services.leadconnectorhq.com/hooks/P62nq2IVqxaQbOrD3P1R/webhook-trigger/0ltTEvdAXvgrRgBOiV6g'
const GHL_NOTE_WEBHOOK = import.meta.env.VITE_GHL_NOTE_WEBHOOK as string || 'https://services.leadconnectorhq.com/hooks/P62nq2IVqxaQbOrD3P1R/webhook-trigger/609543cf-e645-46d7-936c-99f3a0be49c2'

export interface GHLContactData {
  nombre: string
  apellido?: string
  email: string
  telefono: string
  source?: string
  nota?: string
  paso?: string
  tags?: string
  timestamp?: string
}

export interface GHLQualifyData {
  nombre: string
  email: string
  telefono: string
  approach: string
  sellerProfile: string
  califica: boolean
  nota: string
  paso?: string
  timestamp?: string
}

export interface GHLNoteData {
  nombre: string
  email: string
  telefono: string
  nota: string
  paso: string
  source?: string
  timestamp?: string
}

export async function sendContactToGHL(data: GHLContactData) {
  try {
    const res = await fetch(GHL_CONTACT_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: data.timestamp || new Date().toISOString(),
      }),
    })
    if (!res.ok) console.error('[GHL] sendContactToGHL failed:', res.status, await res.text())
    return true
  } catch (err) {
    console.error('[GHL] sendContactToGHL error:', err)
    return false
  }
}

export async function sendQualificationToGHL(data: GHLQualifyData) {
  try {
    const res = await fetch(GHL_QUALIFY_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: data.timestamp || new Date().toISOString(),
      }),
    })
    if (!res.ok) console.error('[GHL] sendQualificationToGHL failed:', res.status, await res.text())
    return true
  } catch (err) {
    console.error('[GHL] sendQualificationToGHL error:', err)
    return false
  }
}

export async function sendNoteToGHL(data: GHLNoteData) {
  try {
    const res = await fetch(GHL_NOTE_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: data.timestamp || new Date().toISOString(),
      }),
    })
    if (!res.ok) console.error('[GHL] sendNoteToGHL failed:', res.status, await res.text())
    return true
  } catch (err) {
    console.error('[GHL] sendNoteToGHL error:', err)
    return false
  }
}
