import GridSection from "@/components/gridSection/GridSection";
import styles from "./page.module.css";
import OrganicGrowthPlane from "@/components/organicGrowth/OrganicGrowthPlane";
import type { ReactElement } from "react";
import Image from "next/image";
import TexturePlane from "@/components/textureplane/TexturePlane";
import ContactSection from "@/components/contactSection/ContactSection";

export interface AboutType {
  topLeft?: ReactElement
  mainContent?: ReactElement
  showPlus: boolean
  bottomRight?: ReactElement | string
  link?: string
}

const aboutData: AboutType[] = [
  {
    topLeft: <a href="https://wa.me/32456829405" target="_blank" rel="noopener noreferrer"><Image src='/images/icons/Whatsapp.svg' alt="whatsapp icon" width={50} height={50} /></a>,
    showPlus: false,
    bottomRight: <p>Get in touch <br /> with me!</p>,
    link: "https://wa.me/32456829405"
  },
  {
    showPlus: false,
  },
  {
    topLeft: <p>1</p>,
    showPlus: false,
    bottomRight: <p>Web <br /> development</p>
  },
  {
    mainContent: <Image src='/images/logo/brown-200.svg' alt="brown-logo" fill className={styles.mainImage} />,
    showPlus: false,
  },
  {
    mainContent: <Image src='/images/logo/sage-200.svg' alt="brown-logo" fill className={styles.mainImage} />,
    showPlus: true,
  },
  {
    topLeft: <p>2</p>,
    showPlus: true,
    bottomRight: <p>User <br /> Accessibility</p>
  },
  {
    showPlus: false,
  },
  {
    showPlus: false,
  },
  {
    topLeft: <p>3</p>,
    showPlus: true,
    bottomRight: <p>Web design</p>
  },
  {
    showPlus: false,
  },
  {
    mainContent: <Image src='/images/logo/brown-200.svg' alt="brown-logo" fill className={styles.mainImage} />,
    showPlus: true,
  },
  {
    topLeft: <p>4</p>,
    showPlus: false,
    bottomRight: <p>Making <br /> customers happy</p>
  },
]

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero section using an organically growing plane */}
      <OrganicGrowthPlane />

      {/* Grid about services / interests */}
      <GridSection items={aboutData} />

      {/* Contact section */}
      <ContactSection />

      {/* Footer */}
      {/* <Footer /> */}
    </main>
  );
}
