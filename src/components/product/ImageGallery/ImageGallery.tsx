'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainWrap}>
        <Image
          src={images[selected]}
          alt={`${productName} — image ${selected + 1}`}
          fill
          priority
          sizes="55vw"
          className={styles.mainImage}
        />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((src, i) => (
            <button
              key={src}
              className={`${styles.thumbBtn} ${i === selected ? styles.thumbActive : ''}`}
              onClick={() => setSelected(i)}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className={styles.thumbImage}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
