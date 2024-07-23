
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BASE_UTL = `https://sbaone.atlassian.net/wiki/rest/api/content/`

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const searchParam = new URLSearchParams(url.searchParams);
  const id = searchParam.get('id');
  try {
    const response = await axios.get(BASE_UTL+id+'?expand=body.view', {
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.UCP_ATLASSIAN_USERNAME + ':' + process.env.UCP_ATLASSIAN_API_KEY).toString('base64')}).toString('base64')}`,
        'Accept': 'application/json',
      },
    });
    const content = response.data;
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Error getting data from Confluence' });
  }
};