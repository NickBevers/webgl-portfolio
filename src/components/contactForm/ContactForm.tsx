'use client'
import styles from './ContactForm.module.css'

const ContactForm = () => {
  const handleFormSubmit = () => {
    console.log('form submitted');
  }

  return (
    <form onSubmit={handleFormSubmit} className={styles.contactForm} >
      <div className={styles.formLine}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your Name" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Your Email" required />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" name="subject" placeholder="Subject" required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Your Message" rows={4} required></textarea>
      </div>

      <button type="submit" className={styles.submitButton}>Send Message</button>
    </form >
  )
}

export default ContactForm