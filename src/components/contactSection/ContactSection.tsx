import ContactForm from '../contactForm/ContactForm'
import ShockWaveSphere from '../sphereWave/SphereWave'
import styles from './ContactSection.module.css'


const ContactSection = () => {
  return (
    <section className={styles.contactContainer}>
      {/* Left side - Text & Form */}
      <div className={styles.formContainer}>
        {/* Header */}
        <p className={styles.header}>Shape <span className={styles.catch}>your</span><br /> next big wave</p>

        {/* Form */}
        <ContactForm />
      </div>

      {/* Right side - Osscilating wave shape */}
      <div className={styles.waveOrbContainer}>
        <ShockWaveSphere />
      </div>
    </section>
  )
}

export default ContactSection