import handleCSRF from '../auth/utils/handleCsrf'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isValidCSRF = await handleCSRF(req, res)
  if (isValidCSRF) {
    res.status(200).json({ message: 'CSRF token is valid' })
  }
}

export { handler as GET, handler as POST }
