'use client'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Button } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Program = {
  title: string;
  subtitle: string;
  url: string;
  description: string;
}

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [openProgramIdxs, setOpenProgramIdxs] = useState<number[]>([]);

  useEffect(() => {
    getPrograms().then((programs) => {
      setPrograms(programs);
    });
  }, []);

  return (
    <div style={{ background: '#EFF6FB', padding: '1rem', margin: '1rem 0' }}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h3>Eligible Programs</h3>
        <Button onClick={() => {
          openProgramIdxs.length === programs.length ? setOpenProgramIdxs([]) :
            setOpenProgramIdxs(new Array(programs.length).fill(0).map((p, idx)=> idx))
        }} unstyled type='button'>
          {openProgramIdxs.length === programs.length ? 'Collapse All' : 'Expand All'}</Button>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
        {programs?.map((program, idx) => (
          <Accordion sx={{placeSelf: 'flex-start', margin: '0'}} expanded={openProgramIdxs.includes(idx)} key={idx}
            onClick={() => openProgramIdxs.includes(idx) ? setOpenProgramIdxs(curr => curr.filter(i => i !== idx)) : setOpenProgramIdxs(curr => [...curr, idx])}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"

            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>{program.title}</p>

                <p><strong>{program.subtitle}</strong></p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {program.description}
              {/* <div style={{marginTop: '5rem'}}>For further details and step-by-step guidance please visit <Link onClick={e => e.stopPropagation()} href={program.url}>here</Link>.</div> */}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  )
}

export default Programs

async function getPrograms(): Promise<any[]> {
  // uncomment and use correct endpoint when api is ready
  // const response = await fetch('/api/programs');
  // const programs = await response.json();

  // temporary mock data
  const programs = await new Promise<any[]>((resolve) => setTimeout(() => resolve([
    {
      title: '8(a)',
      subtitle: '8(a) Business Development Program',
      url: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3213361153/8+a+Initial+Application+Guide',
      description: 'The 8(a) Business Development Program is a business assistance program for small disadvantaged businesses. The 8(a) Program offers a broad scope of assistance to firms that are owned and controlled at least 51% by socially and economically disadvantaged individuals.',
    },
    {
      title: 'HUBZone',
      subtitle: 'Historically Underutilized Business Zone Program',
      url: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3236528130/HUBZone+Initial+Application+Guide',
      description: 'The HUBZone program helps small businesses in urban and rural communities gain preferential access to federal procurement opportunities. These preferences go to small businesses that obtain HUBZone certification in part by employing staff who live in a HUBZone.',
    },
    {
      title: 'WOSB',
      subtitle: 'Woman-Owned',
      url: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3236529422/Women-Owned+Initial+Application+Guide',
      description: 'The WOSB Federal Contract Program was implemented in February 2011 with the goal of expanding the number of industries where WOSB were able to compete for business with the federal government.',
    },
    {
      title: 'SDVOSB',
      subtitle: 'Service-Disabled Veteran-Owned Small Business Program',
      url: 'https://sbaone.atlassian.net/wiki/spaces/UCPUKB/pages/3236528776/Veteran-Owned+Initial+Application+Guide',
      description: 'The Veterans Benefits, Health Care, and Information Technology Act of 2006 (Public Law 109-461) provides the U.S. Department of Veterans Affairs (VA) with unique authority for Service-Disabled Veteran-Owned Small Business (SDVOSB) and Veteran-Owned Small Business (VOSB) set-aside and sole source contracts.',
    }
  ]), 1000))

  return programs;

}
