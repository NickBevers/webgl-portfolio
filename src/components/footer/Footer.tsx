import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* CONTACT INFO */}
        <div className={styles.column}>
          <h3>Contact info</h3>
          <div className={styles.text}>
            <p>hello@nickbevers.dev</p>
            <p>+32 456 82 94 05</p>
          </div>
        </div>

        {/* SOCIALS */}
        <div className={styles.column}>
          <h3>Contact info</h3>
          <div className={styles.text}>
            <a href="https://www.linkedin.com/in/nick-bevers/" target='_blank' rel='noopener noreferrer'>Linkedin</a>
            <a href="https://www.awwwards.com/NickBevers/" target='_blank' rel='noopener noreferrer'>Awwwards</a>
          </div>
        </div>

        {/* BUSINESS INFO */}
        <div className={styles.column}>
          <h3>Contact info</h3>
          <div className={styles.text}>
            <p>Nick Bevers</p>
            <p>VAT: BE1019.819.891</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer