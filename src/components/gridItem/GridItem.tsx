'use client'
import Image from "next/image"
import styles from './GridItem.module.css'
import { AboutType } from "../gridSection/GridSection";
import { FC } from "react";

interface GridItemProps {
  item: AboutType
}

const PlusIcon = (
  <div className={styles.plusIcon}>
    <Image src='/images/icons/plus.svg' alt="plus icon" fill />
  </div>
);

const GridItem: FC<GridItemProps> = ({ item, ...props }) => {
  const openLink = (link: string) => window.open(link, '_blank')

  return (
    <div className={styles.gridItem} {...props}>
      {/* If hover is enabled -> use textureplane */}
      {/* <TexturePlane textureUrl1="/images/temp.jpg" textureUrl2="/images/temp2.jpg" displacementUrl="/images/displacement.jpg" /> */}

      {item.link ? (
        <div onClick={() => openLink(item.link as string)} style={{ width: '100%', height: '100%', cursor: 'pointer' }}>
          {/* Plus sign */}
          {item.showPlus && PlusIcon}

          {/* Top left content */}
          {item.topLeft && <div className={styles.topLeft}>{item.topLeft}</div>}

          {/* Bottom right content */}
          {item.bottomRight && <div className={styles.bottomRight}>{item.bottomRight}</div>}

          {/* Main content */}
          {item.mainContent && <div className={styles.mainContent}>{item.mainContent}</div>}
        </div>
      ) : (
        <>
          {/* Plus sign */}
          {item.showPlus && PlusIcon}

          {/* Top left content */}
          {item.topLeft && <div className={styles.topLeft}>{item.topLeft}</div>}

          {/* Bottom right content */}
          {item.bottomRight && <div className={styles.bottomRight}>{item.bottomRight}</div>}

          {/* Main content */}
          {item.mainContent && <div className={styles.mainContent}>{item.mainContent}</div>}
        </>
      )}
    </div>
  )
}


export default GridItem
