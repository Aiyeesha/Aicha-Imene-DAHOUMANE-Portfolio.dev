import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

// 1) Client Supabase (service role recommandé pour seed)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 2) Exemple minimal : vous remplacerez `rows` par la transformation depuis vos données TS
const rows = [
  {
    slug: "ltp-apex-backend-prototype",
    locale: "fr",
    title: "CRM Salesforce de suivi des livraisons — conception & livrables (LTP)",
    summary: "Blueprint Salesforce : modèle, sécurité, import, intégration transporteurs.",
    content: "Contenu long…",
    tech_stack: ["Salesforce", "Architecture", "Security"],
    repo_url: null,
    live_url: null,
  },
  {
    slug: "ltp-apex-backend-prototype",
    locale: "en",
    title: "Delivery tracking CRM design (LTP)",
    summary: "Salesforce blueprint: data model, security, import strategy, 3-carrier integration.",
    content: "Long content…",
    tech_stack: ["Salesforce", "Architecture", "Security"],
    repo_url: null,
    live_url: null,
  }
]

// 3) Upsert (évite les doublons si vous relancez le script)
const { data, error } = await supabase
  .from('projects')
  .upsert(rows, { onConflict: 'slug,locale' }) // nécessite une contrainte unique (voir étape C3)

if (error) {
  console.error('Seed failed:', error)
  process.exit(1)
}

console.log('Seed ok:', data?.length ?? 0, 'rows')