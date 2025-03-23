import ShockWaveSphere from '../sphereWave/SphereWave'
import styles from './ContactSection.module.css'


const ContactSection = () => {
  return (
    <div className={styles.contactContainer}>
      {/* Left side - Text & Form */}
      <div className={styles.form}>
        {/* Header */}
        <p className={styles.header}>Shape <span className={styles.catch}>your</span><br /> next big wave</p>

        {/* Form */}
      </div>

      {/* Right side - Osscilating wave shape */}
      <div className={styles.waveOrbContainer}>
        <ShockWaveSphere />
      </div>
    </div>
  )
}

export default ContactSection