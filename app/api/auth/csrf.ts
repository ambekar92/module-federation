import { type NextApiRequest, type NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

// not being imported / used anywhere?
export default async function csrf(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const session = await getSession({ req })
  if (session !== null && session.csrfToken !== null) {
    res.json({ csrfToken: session.csrfToken })
  } else {
    res.status(404).json({ error: 'CSRF token not found' })
  }
}
