import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

/**
 * Composable that creates a "sticky scroll-pinning" experience.
 *
 * HOW IT WORKS:
 * The middle content sections (Problem, Data, Solution, Testimonials, Proof,
 * Authority, Method) each become sticky panels that fill the viewport.
 * As the user scrolls, each panel pins in place and the NEXT section
 * scrolls up OVER it, creating the illusion that content transitions
 * "in the same place" — Blue World Voyages style.
 *
 * Technically this is achieved with:
 * - A wrapper div with enough scrollable height (spacer)
 * - Each pinned section uses `position: sticky; top: <navbar_height>`
 * - Sections stack via z-index layering
 * - Content fades/animates as it enters the viewport via IntersectionObserver
 *
 * IMPLEMENTATION NOTE: Uses pure CSS `position: sticky` + z-index stacking
 * rather than GSAP ScrollTrigger (paid plugin). This is more performant and
 * doesn't require additional dependencies.
 */
export function useScrollAnimations() {
  const observers: IntersectionObserver[] = []
  const cleanupFns: (() => void)[] = []

  // ── Utility: observe elements entering viewport ─────────────────────────────
  function observeElements(
    selector: string,
    callback: (el: Element, index: number) => void,
    options: IntersectionObserverInit = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  ) {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(elements).indexOf(entry.target)
          callback(entry.target, idx)
          observer.unobserve(entry.target)
        }
      })
    }, options)

    elements.forEach((el) => observer.observe(el))
    observers.push(observer)
  }

  // ── CORE: Convert middle sections into sticky pinned panels ─────────────────
  function initStickyPanels() {
    // Skip on mobile — effect requires enough horizontal space
    if (window.innerWidth < 768) return

    const stickySelectors = [
      '.problem',
      '.data',
      '.solution',
      '.testimonials',
      '.proof',
      '.authority',
      '.method',
    ]

    const navbarHeight = 65 // approximate sticky navbar pixel height

    stickySelectors.forEach((sel, i) => {
      const el = document.querySelector(sel) as HTMLElement
      if (!el) return

      // Make each section sticky and full-viewport
      el.style.position = 'sticky'
      el.style.top = `${navbarHeight}px`
      el.style.zIndex = `${10 + i}` // each successive section stacks higher
      el.style.minHeight = `calc(100vh - ${navbarHeight}px)`
      el.style.display = 'flex'
      el.style.flexDirection = 'column'
      el.style.justifyContent = 'center'

      // Add subtle shadow to top edge so panels feel like stacking cards
      el.style.boxShadow = '0 -8px 40px rgba(0, 10, 40, 0.08)'
    })

    // The parent `.landing` needs to allow this stacking behavior
    const landing = document.querySelector('.landing') as HTMLElement
    if (landing) {
      landing.style.position = 'relative'
    }
  }

  // ── Effect: Hero entrance animation ─────────────────────────────────────────
  function initHeroEntrance() {
    const badge = document.querySelector('.hero__badge')
    const title = document.querySelector('.hero__title')
    const sub = document.querySelector('.hero__sub')
    const intro = document.querySelector('.hero__intro')
    const ctaGroup = document.querySelector('.hero__cta-group')
    const visual = document.querySelector('.hero__visual')
    const floats = document.querySelectorAll('.hero__float')

    const heroEls = [badge, title, sub, intro, ctaGroup].filter(Boolean)
    gsap.set(heroEls, { opacity: 0, y: 30 })
    if (visual) gsap.set(visual, { opacity: 0, x: 60, scale: 0.95 })
    gsap.set(floats, { opacity: 0, scale: 0.8 })

    const tl = gsap.timeline({ delay: 0.3 })

    heroEls.forEach((el, i) => {
      tl.to(el!, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, i * 0.12)
    })

    if (visual) {
      tl.to(visual, { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }, 0.2)
    }

    tl.to(floats, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)' }, 0.8)
  }

  // ── Effect: Hero biomarker bar fill animation ───────────────────────────────
  function initBarAnimation() {
    const bars = document.querySelectorAll('.hero__visual-bar-fill')
    if (!bars.length) return

    bars.forEach((bar) => {
      const targetWidth = (bar as HTMLElement).style.width
      gsap.set(bar, { width: '0%' })

      setTimeout(() => {
        gsap.to(bar, { width: targetWidth, duration: 1.2, ease: 'power2.out' })
      }, 800)
    })
  }

  // ── Effect: Content reveals inside each sticky panel ────────────────────────
  function initContentReveals() {
    // Section labels slide in from left
    const labels = document.querySelectorAll('.section-label')
    gsap.set(labels, { opacity: 0, x: -30 })
    labels.forEach((el) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
              obs.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.5 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    // Section titles fade up
    const titles = document.querySelectorAll('.section-title, .authority__title')
    gsap.set(titles, { opacity: 0, y: 30 })
    titles.forEach((el) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: 'power3.out' })
              obs.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    // Subtitles fade up
    const subs = document.querySelectorAll('.section-sub, .authority__sub')
    gsap.set(subs, { opacity: 0, y: 20 })
    subs.forEach((el) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power3.out' })
              obs.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
  }

  // ── Effect: Staggered card reveals ──────────────────────────────────────────
  function initCardStagger() {
    const cardGroups = [
      { parent: '.problem__cards', child: '.problem__card' },
      { parent: '.testimonials__grid', child: '.testimonials__card' },
      { parent: '.proof__cases', child: '.proof__case' },
      { parent: '.method__steps', child: '.method__step' },
      { parent: '.data__grid', child: '.data__item' },
      { parent: '.authority__stats', child: '.authority__stat' },
      { parent: '.authority__credentials', child: '.authority__credential' },
      { parent: '.conditions-strip__items', child: '.conditions-strip__item' },
    ]

    cardGroups.forEach(({ parent, child }) => {
      const container = document.querySelector(parent)
      if (!container) return

      const children = container.querySelectorAll(child)
      if (!children.length) return

      gsap.set(children, { opacity: 0, y: 35, scale: 0.97 })

      observeElements(parent, () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
        })
      })
    })
  }

  // ── Effect: Solution section split reveal ───────────────────────────────────
  function initSplitReveals() {
    // Solution: left from left, right from right
    const solLeft = document.querySelector('.solution__left')
    const solRight = document.querySelector('.solution__right')
    if (solLeft) gsap.set(solLeft, { opacity: 0, x: -40 })
    if (solRight) gsap.set(solRight, { opacity: 0, x: 40 })

    observeElements('.solution__inner', () => {
      if (solLeft) gsap.to(solLeft, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' })
      if (solRight) gsap.to(solRight, { opacity: 1, x: 0, duration: 0.9, delay: 0.15, ease: 'power3.out' })
    })

    // Authority: content from left, visual from right
    const authContent = document.querySelector('.authority__content')
    const authVisual = document.querySelector('.authority__visual')
    if (authContent) gsap.set(authContent, { opacity: 0, x: -40 })
    if (authVisual) gsap.set(authVisual, { opacity: 0, x: 40 })

    observeElements('.authority__container', () => {
      if (authContent) gsap.to(authContent, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' })
      if (authVisual) gsap.to(authVisual, { opacity: 1, x: 0, duration: 0.9, delay: 0.15, ease: 'power3.out' })
    })
  }

  // ── Effect: Trust strip values ──────────────────────────────────────────────
  function initTrustStripCounters() {
    const values = document.querySelectorAll('.trust-strip__value')
    if (!values.length) return

    gsap.set(values, { opacity: 0, y: 20 })

    observeElements('.trust-strip', () => {
      gsap.to(values, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' })
    })
  }

  // ── Effect: Problem truth block ─────────────────────────────────────────────
  function initProblemTruthReveal() {
    const truth = document.querySelector('.problem__truth')
    if (!truth) return
    gsap.set(truth, { opacity: 0, y: 30 })
    observeElements('.problem__truth', () => {
      gsap.to(truth, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    })
  }

  // ── Effect: Method flow items stagger ───────────────────────────────────────
  function initMethodFlowReveal() {
    const items = document.querySelectorAll('.method__flow-wrap')
    if (!items.length) return
    gsap.set(items, { opacity: 0, y: 20 })
    observeElements('.method__flow', () => {
      gsap.to(items, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' })
    })
  }

  // ── Effect: Close section dramatic entrance ─────────────────────────────────
  function initCloseReveal() {
    const title = document.querySelector('.close-section__title')
    const waste = document.querySelectorAll('.close-section__waste-item')
    const model = document.querySelector('.close-section__model')
    const ctas = document.querySelector('.close-section__ctas')

    if (title) gsap.set(title, { opacity: 0, y: 40, scale: 0.97 })
    gsap.set(waste, { opacity: 0, x: -20 })
    if (model) gsap.set(model, { opacity: 0, y: 30 })
    if (ctas) gsap.set(ctas, { opacity: 0, y: 20 })

    observeElements('.close-section', () => {
      const tl = gsap.timeline()
      if (title) tl.to(title, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' })
      tl.to(waste, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, '-=0.4')
      if (model) tl.to(model, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      if (ctas) tl.to(ctas, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    })
  }

  // ── Effect: Inline CTA banner reveals ───────────────────────────────────────
  function initInlineCtaReveals() {
    const ctaBanners = document.querySelectorAll('.inline-cta')
    if (!ctaBanners.length) return

    gsap.set(ctaBanners, { opacity: 0, y: 30, scale: 0.96 })

    ctaBanners.forEach((el) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
              })
              obs.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
  }

  // ── Effect: Proof diff badge ────────────────────────────────────────────────
  function initProofDiffReveal() {
    const diff = document.querySelector('.proof__diff')
    if (!diff) return
    gsap.set(diff, { opacity: 0, scale: 0.9 })
    observeElements('.proof__diff', () => {
      gsap.to(diff, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)' })
    })
  }

  // ── Effect: Parallax-style glow movement on scroll ──────────────────────────
  function initParallaxGlows() {
    const purpleGlow = document.querySelector('.hero__glow--purple') as HTMLElement
    const cyanGlow = document.querySelector('.hero__glow--cyan') as HTMLElement
    if (!purpleGlow && !cyanGlow) return

    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        if (purpleGlow) {
          purpleGlow.style.transform = `translateX(-50%) translateY(${scrollY * 0.15}px)`
        }
        if (cyanGlow) {
          cyanGlow.style.transform = `translateY(${scrollY * -0.1}px)`
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    cleanupFns.push(() => window.removeEventListener('scroll', handleScroll))
  }

  // ── Effect: Navbar auto-shrink on scroll ────────────────────────────────────
  function initNavbarShrink() {
    const navbar = document.querySelector('.navbar') as HTMLElement
    if (!navbar) return

    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (window.scrollY > 80) {
          navbar.classList.add('navbar--scrolled')
        } else {
          navbar.classList.remove('navbar--scrolled')
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    cleanupFns.push(() => window.removeEventListener('scroll', handleScroll))
  }

  // ── Initialize all ──────────────────────────────────────────────────────────
  onMounted(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    requestAnimationFrame(() => {
      // Always init sticky panels (layout effect, not animation)
      initStickyPanels()
      initNavbarShrink()

      if (!prefersReducedMotion) {
        initHeroEntrance()
        initBarAnimation()
        initTrustStripCounters()
        initContentReveals()
        initCardStagger()
        initSplitReveals()
        initProblemTruthReveal()
        initMethodFlowReveal()
        initCloseReveal()
        initInlineCtaReveals()
        initProofDiffReveal()
        initParallaxGlows()
      }
    })
  })

  // ── Cleanup ─────────────────────────────────────────────────────────────────
  onUnmounted(() => {
    observers.forEach((obs) => obs.disconnect())
    cleanupFns.forEach((fn) => fn())
    gsap.killTweensOf('*')
  })
}
