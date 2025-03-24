import React, { FC } from "react"
import styles from './GridSection.module.css'
import GridItem from "../gridItem/GridItem"
import Image from "next/image"
import type { ReactElement } from "react"

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

const GridSection = () => {
  return (
    <section className={styles.gridContainer}>
      {aboutData.map((item: AboutType, index: number) => (
        <GridItem item={item} key={index} />
      ))}
    </section>
  );
}

export default GridSection