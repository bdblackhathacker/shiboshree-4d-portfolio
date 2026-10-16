import { motion } from 'framer-motion'

export default function SectionHeading({
  index,
  kicker,
  title,
  accent,
  desc
}: {
  index: string
  kicker: string
  title: string
  accent?: string
  desc?: string
}) {
  return (
    <div className="mb-12 md:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-start gap-5 md:gap-8"
      >
        <span className="num mt-0.5 text-5xl leading-none md:mt-1 md:text-7xl">{index}</span>
        <div className="min-w-0">
          <p className="kicker">{kicker}</p>
          <h2 className="mt-3 font-display text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.02em] md:text-6xl">
            {title}
            {accent && (
              <>
                {' '}
                <span className="font-serifit font-normal italic gold-text">{accent}</span>
              </>
            )}
          </h2>
        </div>
      </motion.div>
      {desc && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted md:pl-[6.4rem]"
        >
          {desc}
        </motion.p>
      )}
    </div>
  )
}
