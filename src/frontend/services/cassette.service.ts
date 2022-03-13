import { CassetteInterface } from '@shared/models/cassette'

export async function getCassettes(): Promise<CassetteInterface[]>  {
  const host = process.env.BASE_URL || ''

  const res = await fetch(`${host}/api/cassette`)
  const data = await res.json()
  const cassettes: CassetteInterface[] = data.message.items

  return cassettes
}
