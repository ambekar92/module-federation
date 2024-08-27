'use client'
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { Label, TextInput } from '@trussworks/react-uswds';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const drawerWidth = '80%';

const ConfluencePageContent = () => {
  const [id, setId] = useState<string>('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Confluence Page');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [promptToGetNewContent, setPromptToGetNewContent] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  async function handleGetContent() {
    try {
      const response = await axios.get(`/api/confluence?id=${id}`);
      if (response.data.error) {
        throw new Error(response.data.error)
      }
      setTitle(response.data?.title)
      const pageContent = response.data?.body?.view?.value;
      setContent(pageContent)
      setError(null)
    } catch (e: any) {
      setError(e.message);
      setContent('')
    } finally {
      setPromptToGetNewContent(false)
    }
  }

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open)
  };

  useEffect(() => {
    setPromptToGetNewContent(true)
  }, [id])

  return (
    <div>
      <div className='margin-bottom-3'>
        <Label htmlFor="id">Enter page id</Label>
        <TextInput value={id}
          onChange={e => setId(e.target.value)} type="text" id='id' name="id" />
      </div>
      <Button
        disabled={!id || !promptToGetNewContent} type='button' onClick={handleGetContent}>
        <span style={{ transition: 'opacity 500 ease', opacity: promptToGetNewContent ? 1 : 0.5 }}>Get Page Content</span>
      </Button>

      {!!content && <React.Fragment>
        <Button onClick={() => toggleDrawer(true)}>View Page Content</Button>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          anchor='right'
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
        >

          <Box sx={{ padding: '2rem' }}>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Box>
        </Drawer>
      </React.Fragment>}

      {error && <p style={{fontWeight: 'bold', color: 'red'}}>{error}</p>}

    </div>
  )
}

export default ConfluencePageContent
