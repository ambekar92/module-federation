import { GridContainer } from '@trussworks/react-uswds'
import {
  SBA_LOGO_ONE_URL
} from '@/app/constants/image'
import NaicsSearch from './NaicsSearch'
import SIAQuestionSections from './SIAQuestionSections'
import Styles from './ShoudIApplyForm.module.scss'

const ShouldIApplyForm = () => {
  return (
    <GridContainer containerSize='widescreen'>
      <header className={`${Styles.header}`}>
        <img className="height-8 margin-bottom-1" alt='SBA Logo Icon' src={SBA_LOGO_ONE_URL} />
      </header>

      <h1 className='font-sans-3xl'>Should I Apply?</h1>

      <h2 className='margin-bottom-1 margin-top-7'>Match: Do you what sell the government buys?</h2>
      <hr className={`${Styles.line} ${Styles.gray}`}></hr>
      <NaicsSearch />

      <SIAQuestionSections />
    </GridContainer>
  )
}
export default ShouldIApplyForm
