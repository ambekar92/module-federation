import { type NextApiRequest, type NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const secret = process.env.SECRET

export default async function handleCSRF(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<boolean> {
  const token = await getToken({ req, secret })

  if (token === null) {
    res.status(403).json({ error: 'Invalid CSRF token' })
    return false
  }

  return true
}
