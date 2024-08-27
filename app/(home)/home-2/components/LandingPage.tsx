import { Benefits } from './Benefits'
import { OurProgram } from './OurProgram'
import { TopLinks } from './TopLinks'

export const LandingPage = () => {
  return (
    <div className='margin-top-1 position-relative'>
      <div
        className="width-full maxw-full"
        style={{
          backgroundColor: '#002e6d',
          marginTop: '-8px',
          height: '250px',
        }}
      >
        <div className="padding-left-5 padding-y-2">
          <h1 style={{ color: 'white', fontWeight: '700' }}>
						MySBA Certification Portal
          </h1>
          <div
            className="padding-bottom-2 padding-top-1"
            style={{
              font: 'Source Sans 3',
              fontWeight: '100',
              fontSize: '22px',
              color: 'white',
              marginTop: '-18px',
            }}
          >
            If you see someone without a smile, give them one of yours!
          </div>
        </div>
      </div>
      <div style={{ marginTop: '-90px' }}>
        <TopLinks />
      </div>
      <div>
        <Benefits />
      </div>
      <div>
        <OurProgram />
      </div>
    </div>
  )
}

export default LandingPage
