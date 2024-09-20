import { Buffer } from 'buffer';
import type { NextApiResponse } from 'next';
import { XMLParser } from 'fast-xml-parser';
import { axiosInstance } from '@/app/services/axiosInstance';
import { OKTA_POST_LOGIN_ROUTE } from '@/app/constants/routes';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { encrypt } from '@/app/shared/utility/encryption';
import { v4 as uuidv4 } from 'uuid';

// Define the getCsrfToken function
async function getCsrfToken() {
  // Implement the logic to get the CSRF token
}

export async function POST(req: any, res: NextApiResponse) {
  if (req.method !== 'POST') {
    throw new Error('Invalid request method');
  }
  const formData = await req.formData();
  const samlResponse = formData.get('SAMLResponse');

  // decode saml, then do post-okta-login
  // check header origin and referrer to make sure it is coming from max gov
  if (samlResponse) {
    const email = extractEmailFromSAMLResponse(samlResponse);
    // Split the email by '@'
    const [name, domain] = (email ?? '').split('@');
    const postData = {
      user: {
        name: name.replace('.', ' '),
        email: email
      },
      expires: Date.now() + 1000 * 60 * 60 * 24 * 30,
      csrfToken: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      colloportus: process.env.COLLOPORTUS
    };
    const uuid = uuidv4();
    const userDetails = await axiosInstance.post(OKTA_POST_LOGIN_ROUTE, postData);
    cookies().set('uuid', uuid);
    cookies().set('email', email)
    // cookies().set('maxgov_auth_token', encrypt(JSON.stringify(userDetails.data)));
    // cookies().set('accesstoken', encrypt(userDetails.data.access));
    // cookies().set('firstPermission', encrypt(userDetails.data.permissions[0].slug));
    // if (userDetails.data.permissions.length > 1) {
    //   cookies().set('lastPermission', encrypt(userDetails.data.permissions[userDetails.data.permissions.length - 1].slug));
    // }
    console.log('cookeis', uuid)
    return NextResponse.redirect(new URL(`/protect/?states=${uuid}`, process.env.NEXT_PUBLIC_POST_REDIRECT_URL), 301);

  } else {
    return Response.error();
  }
}

const extractEmailFromSAMLResponse = (samlResponse: string) => {
  if (!samlResponse) {
    throw new Error('SAML response is empty or undefined');
  }

  try {
    const decodedSaml = Buffer.from(samlResponse, 'base64').toString('utf8');
    const emailIdxEnd =  decodedSaml.indexOf('</saml2:NameID');
    const email = decodedSaml.substring(0, emailIdxEnd).split('>').pop();
    return email
    //   const parser = new XMLParser({
    //     ignoreAttributes: false,
    //     attributeNamePrefix: "@_",
    //     removeNSPrefix: true,
    //   });

    //   const jsonObj = parser.parse(decodedSaml);

    //   if (!jsonObj || !jsonObj.Response || !jsonObj.Response.Assertion || !jsonObj.Response.Assertion.Subject) {
    //     throw new Error("Invalid SAML response format");
    //   }

    //   const nameID = jsonObj.Response.Assertion.Subject.NameID;

    //   if (nameID && nameID["@_Format"] === "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress") {
    //     return nameID["#text"];
    //   }

    //   return null;
  } catch (error: any) {
    console.error('Error parsing SAML response:', error.message);
    throw error;
  }
};
