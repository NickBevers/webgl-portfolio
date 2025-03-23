import ShockWaveSphere from '../sphereWave/SphereWave'
import styles from './ContactSection.module.css'


const ContactSection = () => {
  return (
    <div className={styles.contactContainer}>
      {/* Left side - Text & Form */}
      <div>
        Test
      </div>

      {/* Right side - Osscilating wave shape */}
      <div className={styles.waveOrbContainer}>
        <ShockWaveSphere />
      </div>
    </div>
  )
}

export default ContactSection