/**
 * D1+D2+D7 — pointer-parallax aurora blobs + perspective holo floor.
 * Positioned above the WebGL canvas (z-1) and below content (z-10).
 * All motion is pure CSS driven by --px/--py vars (zero JS per frame).
 */
export default function AuroraLayers({ lowPower }: { lowPower: boolean }) {
  return (
    <div aria-hidden className={`aurora-field-8d ${lowPower ? 'is-low' : ''}`}>
      <div className="aurora-8d aurora-a" />
      <div className="aurora-8d aurora-b" />
      <div className="aurora-8d aurora-c" />
      <div className="holo-floor-8d" />
    </div>
  )
}
