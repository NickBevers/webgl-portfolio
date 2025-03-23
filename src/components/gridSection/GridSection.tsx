import React, { FC } from "react"
import styles from './GridSection.module.css'
import { AboutType } from "@/app/page"
import GridItem from "../gridItem/GridItem"

type GridProps = {
  items: AboutType[]
}

const GridSection: FC<GridProps> = ({
  items
}) => {
  return (
    <section className={styles.gridContainer}>
      {items.map((item: AboutType, index: number) => (
        <GridItem item={item} key={index} />
      ))}
    </section>
  );
}

export default GridSection