import { Header } from '@trussworks/react-uswds'
import dynamic from 'next/dynamic'
import { SBA_LOGO_SQUARE_WHITE_URL } from '../constants/icons'
import ErrorBoundary from './ErrorBoundary'

const ClientSideNavigation = dynamic(() => import('./ClientSideNavigation').then(mod => mod.ClientSideNavigation), {
  ssr: false,
})

export interface StyleSetting {
  bg: string
  textColor: string
  logo: string
  hoverColor: string
}

const styleSettings = {
  hoverColor: '',
  bg: '#002e6d',
  textColor: 'text-white',
  logo: SBA_LOGO_SQUARE_WHITE_URL,
}

export const UnauthenticatedNavigation: React.FC = () => {
  return (
    <Header
      style={{backgroundColor: styleSettings.bg}}
      className={'border-base-light padding-botom-1 flex-fill display-flex flex-row flex-justify-end'}
      basic
    >
      <ErrorBoundary>
        <ClientSideNavigation />
      </ErrorBoundary>
    </Header>
  )
}
