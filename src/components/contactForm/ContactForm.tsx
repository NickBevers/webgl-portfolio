'use client'
import styles from './ContactForm.module.css'

const ContactForm = () => {
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const emailBody = `
      Name: ${formValues.name}
      Email: ${formValues.email}
      Subject: ${formValues.subject}
      Message: ${formValues.message}
    `;

    fetch(`/api/plunk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formValues.name,
        email: formValues.email,
        subject: formValues.subject,
        message: formValues.message,
        emailBody
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .finally(() => {

      })
  }

  return (
    <form onSubmit={handleFormSubmit} className={styles.contactForm} >
      <div className={styles.formLine}>
        <input type="text" id="name" name="name" placeholder="Your Name" required />
        <input type="email" id="email" name="email" placeholder="Your Email" required />
      </div>

      <input type="text" id="subject" name="subject" placeholder="Subject" required />
      <textarea id="message" name="message" placeholder="Your Message" rows={4} required style={{ resize: 'none' }}></textarea>

      <button type="submit" className={styles.submitButton}>Generate a wave</button>
    </form >
  )
}

export default ContactForm