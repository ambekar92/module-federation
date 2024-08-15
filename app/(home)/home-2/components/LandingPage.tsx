import { Benefits } from './Benefits'
import { OurProgram } from './OurProgram'
import { TopLinks } from './TopLinks'

export const LandingPage = () => {
  return (
    <>
      <div
        className="width-full maxw-full"
        style={{
          backgroundColor: '#1a4480',
          marginTop: '-8px',
          height: '250px',
        }}
      >
        <div className="padding-left-5 padding-y-2">
          <h1 style={{ color: 'white', fontWeight: '700' }}>
            Unified Certification Platform
          </h1>
          <div
            className="padding-bottom-2"
            style={{
              font: 'Source Sans 3',
              fontWeight: '100',
              fontSize: '22px',
              color: 'white',
              marginTop: '-18px',
            }}
          >
            Your one-stop destination for all SBA certification requirements.
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
    </>
  )
}

export default LandingPage
