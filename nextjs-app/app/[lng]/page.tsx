import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages, fallbackLng } from '../i18n/settings'
import { useTranslation } from '../i18n'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import './global.css'

export default async function Page({
  params: { lng },
}: {
  params: {
    lng: string
  }
}) {
  if (languages.indexOf(lng) < 0) {lng = fallbackLng}
  const { t } = await useTranslation(lng)

  return (
    <>
      <Header heading={t('h1')} />
      <hr style={{ marginTop: 20, width: '90%' }} />
      <div>
        <Link href={`/${lng}/second-page`}>
          <button type="button">{t('to-second-page')}</button>
        </Link>
        <Link href={`/${lng}/client-page`}>
          <button type="button">{t('to-client-page')}</button>
        </Link>
      </div>
      <Footer lng={lng} />
    </>
  )
}
