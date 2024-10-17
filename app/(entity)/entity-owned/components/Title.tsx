'use client'
import { faClose, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Icon, Link } from '@trussworks/react-uswds'
import styles from './EntityOwned.module.scss'

const Title = () => {
  return (
    <>
      <div className={styles.title}>
        <div>
          <div className={styles.arrow}>
            <Icon.ArrowBack />
            <Link href='/'>Back</Link>
          </div>
          <h1>Entity-Owned</h1>
        </div>
        <div className={styles.icons}>
          <div className={styles.icon}>

            <FontAwesomeIcon icon={faFloppyDisk} /> <span>Save</span>
          </div>
          <div className={styles.icon}>

            <FontAwesomeIcon icon={faClose} /> <span>Close</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Title
