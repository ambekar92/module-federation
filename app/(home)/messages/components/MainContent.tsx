'use client'
import {
  Button,
  ButtonGroup,
  Grid,
  TextInput
} from '@trussworks/react-uswds'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { firstRow, secondRow } from '../utils/constants'

function MainContent() {
  const [value, setValue] = useState('')
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
  ]
  const module = {
    toolbar: toolbarOptions,
  }

  return (
    <>
      <div className={'padding-top-0'}>
        {/* <Grid row className='border-bottom border-base-lighter'>
          <Grid
            desktop={{ col: 12 }}
            mobile={{ col: 8 }}
            className="margin-y-205 margin-left-2"
          >
            <div>
              {firstRow.map((item) => (
                <Button
                  type='button'
                  unstyled
                  className={'display-flex flex-align-center text-black text-no-underline hover:text-no-underline margin-right-2 float-left'}
                  key={item.id}
                >
                  {item.icon}
                  <span className={'padding-left-05'}>{item.title}</span>
                </Button>
              ))}
            </div>
          </Grid>
        </Grid>

        {secondRow.map((item) => (
          <>
            <Grid row className='display-flex flex-align-center border-bottom border-base-lighter'>
              <span className="margin-right-0 margin-left-2">
                {item.title}
              </span>
              <TextInput
                className='padding-right-10 margin-right-auto margin-top-0 border-0'
                placeholder={item.placeholder}
                id="input-type-text"
                name="input-type-text"
                type="text"
              />

              <Button type='button' unstyled className="padding-right-3 text-black">
                {item.icon}
              </Button>
            </Grid>

          </>
        ))}

        <div>
          <div className="padding-top-2">
            <div>
              <ReactQuill
                value={value}
                placeholder="Add a message"
                onChange={(value) => setValue(value)}
                modules={module}
                theme="snow"
              />
            </div>
            <ButtonGroup className="w padding-top-3 display-flex flex-justify-end">
              <button className="usa-button">Send</button>
            </ButtonGroup>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default MainContent;
