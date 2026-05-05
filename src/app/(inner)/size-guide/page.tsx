import React from 'react';
import styles from './page.module.css';

const MENS = [
  { size: 'XS', chest: '34–35', waist: '28–29', hip: '34–35' },
  { size: 'S',  chest: '36–37', waist: '30–31', hip: '36–37' },
  { size: 'M',  chest: '38–39', waist: '32–33', hip: '38–39' },
  { size: 'L',  chest: '40–41', waist: '34–35', hip: '40–41' },
  { size: 'XL', chest: '42–43', waist: '36–37', hip: '42–43' },
  { size: 'XXL',chest: '44–46', waist: '38–40', hip: '44–46' },
];

const WOMENS = [
  { size: 'XS', chest: '31–32', waist: '23–24', hip: '33–34' },
  { size: 'S',  chest: '33–34', waist: '25–26', hip: '35–36' },
  { size: 'M',  chest: '35–36', waist: '27–28', hip: '37–38' },
  { size: 'L',  chest: '37–39', waist: '29–31', hip: '39–41' },
  { size: 'XL', chest: '40–42', waist: '32–34', hip: '42–44' },
  { size: 'XXL',chest: '43–45', waist: '35–37', hip: '45–47' },
];

const SHOES = [
  { pk: '38', uk: '5',   eu: '38', us: '6.5'  },
  { pk: '39', uk: '6',   eu: '39', us: '7.5'  },
  { pk: '40', uk: '7',   eu: '40', us: '8'    },
  { pk: '41', uk: '8',   eu: '41', us: '9'    },
  { pk: '42', uk: '9',   eu: '42', us: '10'   },
  { pk: '43', uk: '10',  eu: '43', us: '11'   },
  { pk: '44', uk: '11',  eu: '44', us: '12'   },
];

export default function SizeGuidePage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Sizing</p>
        <h1 className={styles.title}>Size<em> Guide</em></h1>
        <p className={styles.subtitle}>All measurements are in inches unless stated. When in doubt, size up.</p>
      </div>

      <div className={styles.content}>
        <section className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Men&apos;s Clothing</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>Size</th><th>Chest</th><th>Waist</th><th>Hip</th></tr>
              </thead>
              <tbody>
                {MENS.map((r) => (
                  <tr key={r.size}><td>{r.size}</td><td>{r.chest}</td><td>{r.waist}</td><td>{r.hip}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Women&apos;s Clothing</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>Size</th><th>Chest</th><th>Waist</th><th>Hip</th></tr>
              </thead>
              <tbody>
                {WOMENS.map((r) => (
                  <tr key={r.size}><td>{r.size}</td><td>{r.chest}</td><td>{r.waist}</td><td>{r.hip}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Footwear</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>PK</th><th>UK</th><th>EU</th><th>US</th></tr>
              </thead>
              <tbody>
                {SHOES.map((r) => (
                  <tr key={r.pk}><td>{r.pk}</td><td>{r.uk}</td><td>{r.eu}</td><td>{r.us}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className={styles.tip}>
          <p className={styles.tipTitle}>How to measure yourself</p>
          <p className={styles.tipBody}>
            Use a soft measuring tape and measure over light clothing.
            Chest: measure around the fullest part of the chest.
            Waist: measure around the narrowest part of the torso.
            Hip: measure around the fullest part of the hips.
          </p>
        </div>
      </div>
    </div>
  );
}
