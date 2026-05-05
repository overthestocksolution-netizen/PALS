'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { brands } from '@/data/palsProducts';
import { toast } from 'react-toastify';
import styles from './page.module.css';

const CATEGORIES = ['Men', 'Women', 'Accessories', 'Kids', 'Sports'];
const CONDITIONS = ['New with tags', 'Like new', 'Good', 'Fair'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size', '6', '7', '8', '9', '10', '11', '28', '30', '32', '34', '36'];
const COLORS = ['Black', 'White', 'Grey', 'Navy', 'Brown', 'Beige', 'Blue', 'Red', 'Green', 'Pink', 'Multi'];
const STYLES = ['Casual', 'Formal', 'Streetwear', 'Minimal', 'Vintage', 'Athleisure', 'Smart Casual'];

interface FormData {
  title: string;
  description: string;
  category: string;
  brand: string;
  condition: string;
  size: string;
  color: string;
  style: string;
  price: string;
  photos: File[];
}

export default function SellPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    brand: '',
    condition: '',
    size: '',
    color: '',
    style: '',
    price: '',
    photos: [],
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const update = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((value) => ({ ...value, [field]: e.target.value }));
    setErrors((value) => ({ ...value, [field]: '' }));
  };

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const combined = [...form.photos, ...files].slice(0, 8);
    setForm((value) => ({ ...value, photos: combined }));
    setPreviews(combined.map((file) => URL.createObjectURL(file)));
  };

  const removePhoto = (index: number) => {
    const nextPhotos = form.photos.filter((_, itemIndex) => itemIndex !== index);
    const nextPreviews = previews.filter((_, itemIndex) => itemIndex !== index);
    setForm((value) => ({ ...value, photos: nextPhotos }));
    setPreviews(nextPreviews);
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.title) nextErrors.title = 'Title is required';
    if (!form.category) nextErrors.category = 'Select a category';
    if (!form.condition) nextErrors.condition = 'Select condition';
    if (!form.price || Number.isNaN(+form.price) || +form.price <= 0) nextErrors.price = 'Enter a valid price';
    if (form.photos.length === 0) nextErrors.photos = 'Add at least one photo';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success('Your item has been listed');
    router.push('/profile/me');
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>SELL ON PALS</p>
          <h1 className={styles.title}>List your item with a cleaner, more premium presentation.</h1>
          <p className={styles.lead}>
            Add sharp photos, clear details, and pricing that feels considered. The layout is built
            to make your listing look trustworthy from the first glance.
          </p>
        </div>

        <div className={styles.heroAside}>
          <div className={styles.heroImageWrap}>
            <img
              src="/assets/Pals imgs/charlesdeluvio-_4K7BwaHUGc-unsplash.jpg"
              alt="Sell on PALS"
              className={styles.heroImage}
            />
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Photo limit</span>
              <strong className={styles.statValue}>8 images</strong>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Estimated fee</span>
              <strong className={styles.statValue}>10%</strong>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <div className={styles.layout}>
          <section className={styles.photoPanel}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionEyebrow}>Photos</p>
                <h2 className={styles.sectionTitle}>Build a polished gallery</h2>
              </div>
              <p className={styles.sectionText}>Add up to 8 JPG, PNG, or WEBP images with clean framing.</p>
            </div>

            <div className={styles.photoGrid}>
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className={`${styles.photoSlot} ${previews[index] ? styles.photoFilled : ''}`}
                >
                  {previews[index] ? (
                    <>
                      <img src={previews[index]} alt={`Photo ${index + 1}`} className={styles.photoImage} />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className={styles.removePhoto}
                        aria-label={`Remove photo ${index + 1}`}
                      >
                        x
                      </button>
                    </>
                  ) : index === previews.length ? (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className={styles.addPhoto}
                      aria-label="Add photo"
                    >
                      <span className={styles.addPhotoIcon}>+</span>
                      <span className={styles.addPhotoText}>Add image</span>
                    </button>
                  ) : (
                    <span className={styles.emptyDot}>.</span>
                  )}
                </div>
              ))}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handlePhotos}
              className={styles.hiddenInput}
              aria-label="Upload photos"
            />

            {errors.photos ? <p className={styles.errorText}>{errors.photos}</p> : null}

            <div className={styles.photoFooter}>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className={`btn-pals-outline ${styles.photoButton}`}
              >
                Add photos
              </button>
              <p className={styles.photoHint}>Front, back, label, and detail shots perform best.</p>
            </div>
          </section>

          <section className={styles.formPanel}>
            <div className={styles.formCard}>
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.sectionEyebrow}>Core details</p>
                  <h2 className={styles.sectionTitle}>Tell buyers what they need fast</h2>
                </div>
              </div>

              <div className={styles.fieldBlock}>
                <label htmlFor="title" className={styles.label}>Title *</label>
                <input
                  id="title"
                  type="text"
                  value={form.title}
                  onChange={update('title')}
                  placeholder="Add a sharp title"
                  className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                />
                {errors.title ? <p className={styles.errorText}>{errors.title}</p> : null}
              </div>

              <div className={styles.fieldBlock}>
                <label htmlFor="desc" className={styles.label}>Description</label>
                <textarea
                  id="desc"
                  value={form.description}
                  onChange={update('description')}
                  rows={5}
                  placeholder="Condition notes, fabric, fit, and any standout details"
                  className={`${styles.input} ${styles.textarea}`}
                />
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.fieldBlock}>
                  <label className={styles.label}>Category *</label>
                  <select
                    value={form.category}
                    onChange={update('category')}
                    className={`${styles.input} ${errors.category ? styles.inputError : ''}`}
                    aria-label="Category"
                  >
                    <option value="">Category</option>
                    {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                  </select>
                  {errors.category ? <p className={styles.errorText}>{errors.category}</p> : null}
                </div>

                <div className={styles.fieldBlock}>
                  <label className={styles.label}>Brand</label>
                  <select
                    value={form.brand}
                    onChange={update('brand')}
                    className={styles.input}
                    aria-label="Brand"
                  >
                    <option value="">Brand</option>
                    {brands.map((brand) => <option key={brand}>{brand}</option>)}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className={styles.fieldBlock}>
                  <label className={styles.label}>Condition *</label>
                  <select
                    value={form.condition}
                    onChange={update('condition')}
                    className={`${styles.input} ${errors.condition ? styles.inputError : ''}`}
                    aria-label="Condition"
                  >
                    <option value="">Condition</option>
                    {CONDITIONS.map((condition) => <option key={condition}>{condition}</option>)}
                  </select>
                  {errors.condition ? <p className={styles.errorText}>{errors.condition}</p> : null}
                </div>

                <div className={styles.fieldBlock}>
                  <label className={styles.label}>Size</label>
                  <select value={form.size} onChange={update('size')} className={styles.input} aria-label="Size">
                    <option value="">Size</option>
                    {SIZES.map((size) => <option key={size}>{size}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.formCard}>
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.sectionEyebrow}>Refinements</p>
                  <h2 className={styles.sectionTitle}>Add styling context</h2>
                </div>
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.fieldBlock}>
                  <label className={styles.label}>Color</label>
                  <select value={form.color} onChange={update('color')} className={styles.input} aria-label="Color">
                    <option value="">Color</option>
                    {COLORS.map((color) => <option key={color}>{color}</option>)}
                  </select>
                </div>

                <div className={styles.fieldBlock}>
                  <label className={styles.label}>Style</label>
                  <select value={form.style} onChange={update('style')} className={styles.input} aria-label="Style">
                    <option value="">Style</option>
                    {STYLES.map((style) => <option key={style}>{style}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.formCard}>
              <div className={styles.priceRow}>
                <div className={styles.priceField}>
                  <label htmlFor="price" className={styles.label}>Item price *</label>
                  <div className={`${styles.priceInputWrap} ${errors.price ? styles.priceInputWrapError : ''}`}>
                    <span className={styles.currency}>Rs.</span>
                    <input
                      id="price"
                      type="number"
                      min="1"
                      value={form.price}
                      onChange={update('price')}
                      placeholder="2500"
                      className={styles.priceInput}
                    />
                  </div>
                  {errors.price ? <p className={styles.errorText}>{errors.price}</p> : null}
                </div>

                <div className={styles.payoutCard}>
                  <span className={styles.statLabel}>Estimated payout</span>
                  <strong className={styles.payoutValue}>
                    Rs.{form.price && !errors.price ? Math.round(+form.price * 0.9).toLocaleString() : '0'}
                  </strong>
                  <p className={styles.payoutText}>After PALS fee of 10%.</p>
                </div>
              </div>
            </div>

            <div className={styles.submitWrap}>
              <button
                type="submit"
                disabled={submitting}
                className={`btn-pals-primary ${styles.submitButton} ${submitting ? styles.submitButtonBusy : ''}`}
              >
                {submitting ? 'Listing...' : 'List my item'}
              </button>
              <p className={styles.termsText}>
                By listing, you agree to PALS seller guidelines and terms of service.
              </p>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
}
