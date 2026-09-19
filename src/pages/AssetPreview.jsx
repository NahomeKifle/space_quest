import ModelPreview from '../components/preview/ModelPreview'
import {
  heroShips,
  planets,
  ships,
  stationParts,
} from '../components/preview/modelCatalog'
import styles from './AssetPreview.module.css'

function headingId(title) {
  return `${title.toLowerCase().replace(/\s+/g, '-')}-heading`
}

function PreviewSection({ title, items }) {
  const id = headingId(title)
  return (
    <section className={styles.section} aria-labelledby={id}>
      <h2 id={id} className={styles.sectionTitle}>
        {title}
      </h2>
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.url}>
            <ModelPreview url={item.url} filename={item.filename} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function AssetPreview() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Temporary</p>
        <h1>Asset preview</h1>
        <p>
          Internal inspection of candidate GLTF models. This page is not linked
          in the main navigation and is not part of the Home scene.
        </p>
      </header>

      <PreviewSection title="HERO SHIPS" items={heroShips} />
      <PreviewSection title="SHIPS" items={ships} />
      <PreviewSection title="PLANETS" items={planets} />
      <PreviewSection title="STATION PARTS" items={stationParts} />
    </div>
  )
}

export default AssetPreview
