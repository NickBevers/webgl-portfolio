import React, { FC } from "react"
import styles from './GridSection.module.css'
import GridItem from "../gridItem/GridItem"
import Image from "next/image"
import type { ReactElement } from "react"

export interface AboutType {
  id: string
  topLeft?: ReactElement
  mainContent?: ReactElement
  showPlus: boolean
  bottomRight?: ReactElement | string
  link?: string
}

const aboutData: AboutType[] = [
  {
    id: "whatsapp",
    topLeft: <a href="https://wa.me/32456829405" target="_blank" rel="noopener noreferrer"><Image src='/images/icons/Whatsapp.svg' alt="whatsapp icon" width={50} height={50} className={styles.icon} /></a>,
    showPlus: false,
    bottomRight: <p>Get in touch <br /> with me!</p>,
    link: "https://wa.me/32456829405"
  },
  {
    id: 'empty1',
    showPlus: false,
  },
  {
    id: 'webDev',
    topLeft: <p>1</p>,
    showPlus: false,
    bottomRight: <p>Web <br /> development</p>
  },
  {
    id: 'brownLogo1',
    mainContent: <Image src='/images/logo/brown-200.svg' alt="brown-logo" fill className={styles.mainImage} />,
    showPlus: false,
  },
  {
    id: 'sageLogo',
    mainContent: <Image src='/images/logo/sage-200.svg' alt="brown-logo" fill className={styles.mainImage} />,
    showPlus: true,
  },
  {
    id: 'accessibility',
    topLeft: <p>2</p>,
    showPlus: true,
    bottomRight: <p>User <br /> Accessibility</p>
  },
  {
    id: 'empty2',
    showPlus: false,
  },
  {
    id: 'empty3',
    showPlus: false,
  },
  {
    id: 'webDesign',
    topLeft: <p>3</p>,
    showPlus: true,
    bottomRight: <p>Web design</p>
  },
  {
    id: 'empty4',
    showPlus: false,
  },
  {
    id: 'brownLogo2',
    mainContent: <Image src='/images/logo/brown-200.svg' alt="brown-logo" fill className={styles.mainImage} />,
    showPlus: true,
  },
  {
    id: 'customers',
    topLeft: <p>4</p>,
    showPlus: false,
    bottomRight: <p>Making <br /> customers happy</p>
  },
]

const GridSection = () => {
  return (
    <section className={styles.gridContainer}>
      {aboutData.map((item: AboutType, index: number) => (
        <GridItem item={item} key={index} data-temp='hi' data-id={item.id} />
      ))}
    </section>
  );
}

export default GridSection