const BASE_URL = 'https://api.pipedrive.com/v1'
const TOKEN = import.meta.env.VITE_PIPEDRIVE_API_TOKEN

// Pipeline "Contactos" (ID 1), etapa "Prospecto" (ID 1)
const PIPELINE_ID = 1
const STAGE_ID = 1

export interface PipedriveLeadData {
  firstName: string
  lastName: string
  email: string
  phone: string
  source: string
}

async function createPerson(name: string, email: string, phone: string): Promise<number | null> {
  try {
    const res = await fetch(`${BASE_URL}/persons?api_token=${TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email: [{ value: email, primary: true }],
        phone: [{ value: phone, primary: true }],
      }),
    })
    const data = await res.json()
    if (!data.success) { console.error('[Pipedrive] createPerson failed:', data); return null }
    return data.data.id as number
  } catch (err) {
    console.error('[Pipedrive] createPerson error:', err)
    return null
  }
}

async function createDeal(title: string, personId: number): Promise<number | null> {
  try {
    const res = await fetch(`${BASE_URL}/deals?api_token=${TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        person_id: personId,
        pipeline_id: PIPELINE_ID,
        stage_id: STAGE_ID,
      }),
    })
    const data = await res.json()
    if (!data.success) { console.error('[Pipedrive] createDeal failed:', data); return null }
    return data.data.id as number
  } catch (err) {
    console.error('[Pipedrive] createDeal error:', err)
    return null
  }
}

export async function createDealNote(dealId: number, content: string): Promise<number | null> {
  try {
    const res = await fetch(`${BASE_URL}/notes?api_token=${TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deal_id: dealId, content }),
    })
    const data = await res.json()
    if (!data.success) { console.error('[Pipedrive] createDealNote failed:', data); return null }
    return data.data.id as number
  } catch (err) {
    console.error('[Pipedrive] createDealNote error:', err)
    return null
  }
}

export async function updateDealNote(noteId: number, content: string): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/notes/${noteId}?api_token=${TOKEN}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
    const data = await res.json()
    if (!data.success) console.error('[Pipedrive] updateDealNote failed:', data)
  } catch (err) {
    console.error('[Pipedrive] updateDealNote error:', err)
  }
}

export async function pushLeadToPipedrive(lead: PipedriveLeadData): Promise<{ dealId: number } | null> {
  try {
    const fullName = `${lead.firstName} ${lead.lastName}`.trim()
    const title = `${lead.firstName} ${lead.lastName} | ${lead.source}`
    const personId = await createPerson(fullName, lead.email, lead.phone)
    if (personId === null) return null
    const dealId = await createDeal(title, personId)
    if (dealId === null) return null
    return { dealId }
  } catch (err) {
    console.error('[Pipedrive] pushLeadToPipedrive error:', err)
    return null
  }
}
