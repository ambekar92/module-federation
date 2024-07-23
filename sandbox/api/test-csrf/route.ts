import { NextRequest } from 'next/server'
import handleCSRF from '../../../api/auth/utils/handleCsrf'
import { NextApiRequest, NextApiResponse } from 'next/types'

async function handler(req: NextApiRequest | any, res: NextApiResponse | any) {
  const isValidCSRF = await handleCSRF(req, res)
  if (isValidCSRF) {
    (res).status(200).json({ message: 'CSRF token is valid' })
  }
}

export { handler as GET, handler as POST }
