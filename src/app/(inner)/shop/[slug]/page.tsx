import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import ProductPage from '@/views/ProductPage/ProductPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} — PALS`,
    description: product.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  return <ProductPage slug={slug} />;
}
