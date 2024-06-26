'use client'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Button } from '@trussworks/react-uswds';
import { useState } from 'react';

const Programs = ({programs}: {programs: any[]}) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div style={{ background: '#EFF6FB', padding: '1rem', margin: '1rem 0' }}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>Eiligible Programs</h3>
                    <Button onClick={() => setOpen(prev => !prev)} unstyled type='button'>{open ? 'Collapse All' : 'Expand All'}</Button>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                    {programs?.map((program, idx) => (
                                <Accordion sx={{placeSelf: 'flex-start', margin: '0'}} expanded={open}>
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
                                    </AccordionDetails>
                                </Accordion>
                    ))}
                    </div>
                </div>
  )
}

export default Programs