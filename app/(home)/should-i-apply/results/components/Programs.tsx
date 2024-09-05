'use client'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Button } from '@trussworks/react-uswds';
import { useState } from 'react';
import { Program } from '../types';

const Programs = ({programs}: {programs: Program[]}) => {
  const [openProgramIdxs, setOpenProgramIdxs] = useState<number[]>([]);

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


