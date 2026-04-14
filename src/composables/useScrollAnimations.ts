import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

/**
 * Composable that initializes scroll-triggered animations across the landing page.
 * Uses GSAP ScrollTrigger for reveal, parallax, counter, and stagger effects.
 *
 * IMPORTANT: We manually implement IntersectionObserver-based triggers
 * instead of GSAP ScrollTrigger plugin to avoid the paid plugin dependency.
 */
export function useScrollAnimations() {
  const observers: IntersectionObserver[] = []
  const animations: gsap.core.Tween[] = []

  // ── Utility: observe elements entering viewport ─────────────────────────────
  function observeElements(
    selector: string,
    callback: (el: Element, index: number) => void,
    options: IntersectionObserverInit = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
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

  // ── Effect: Fade-up reveal for sections ─────────────────────────────────────
  function initSectionReveals() {
    const sectionSelectors = [
      '.problem',
      '.data',
      '.solution',
      '.testimonials',
      '.proof',
      '.authority',
      '.method',
      '.close-section',
    ]

    sectionSelectors.forEach((sel) => {
      const el = document.querySelector(sel)
      if (!el) return

      gsap.set(el, { opacity: 0, y: 60 })

      observeElements(sel, (target) => {
        const tween = gsap.to(target, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
        })
        animations.push(tween)
      })
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

      gsap.set(children, { opacity: 0, y: 40, scale: 0.96 })

      observeElements(parent, () => {
        const tween = gsap.to(children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
        })
        animations.push(tween)
      })
    })
  }

  // ── Effect: Section label + title slide-in ──────────────────────────────────
  function initTitleReveals() {
    const labels = document.querySelectorAll('.section-label')
    const titles = document.querySelectorAll('.section-title')
    const subs = document.querySelectorAll('.section-sub')

    const allEls = [...Array.from(labels), ...Array.from(titles), ...Array.from(subs)]

    gsap.set(labels, { opacity: 0, x: -30 })
    gsap.set(titles, { opacity: 0, y: 30 })
    gsap.set(subs, { opacity: 0, y: 20 })

    allEls.forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const tween = gsap.to(entry.target, {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: el.classList.contains('section-label') ? 0 : 0.15,
              })
              animations.push(tween)
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })
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

    // Animate on mount (hero is always visible on load)
    const tl = gsap.timeline({ delay: 0.3 })

    heroEls.forEach((el, i) => {
      tl.to(
        el!,
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        i * 0.12
      )
    })

    if (visual) {
      tl.to(
        visual,
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' },
        0.2
      )
    }

    tl.to(
      floats,
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)' },
      0.8
    )
  }

  // ── Effect: Trust strip counter animation ───────────────────────────────────
  function initTrustStripCounters() {
    const values = document.querySelectorAll('.trust-strip__value')
    if (!values.length) return

    gsap.set(values, { opacity: 0, y: 20 })

    observeElements('.trust-strip', () => {
      const tween = gsap.to(values, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      })
      animations.push(tween)
    })
  }

  // ── Effect: Hero biomarker bar fill animation ───────────────────────────────
  function initBarAnimation() {
    const bars = document.querySelectorAll('.hero__visual-bar-fill')
    if (!bars.length) return

    bars.forEach((bar) => {
      const targetWidth = (bar as HTMLElement).style.width
      gsap.set(bar, { width: '0%' })

      setTimeout(() => {
        const tween = gsap.to(bar, {
          width: targetWidth,
          duration: 1.2,
          ease: 'power2.out',
        })
        animations.push(tween)
      }, 800)
    })
  }

  // ── Effect: Solution section split reveal ───────────────────────────────────
  function initSolutionReveal() {
    const left = document.querySelector('.solution__left')
    const right = document.querySelector('.solution__right')

    if (left) gsap.set(left, { opacity: 0, x: -40 })
    if (right) gsap.set(right, { opacity: 0, x: 40 })

    observeElements('.solution__inner', () => {
      if (left) {
        const tween = gsap.to(left, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
        })
        animations.push(tween)
      }
      if (right) {
        const tween = gsap.to(right, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
        })
        animations.push(tween)
      }
    })
  }

  // ── Effect: Authority split reveal ──────────────────────────────────────────
  function initAuthorityReveal() {
    const content = document.querySelector('.authority__content')
    const visual = document.querySelector('.authority__visual')

    if (content) gsap.set(content, { opacity: 0, x: -40 })
    if (visual) gsap.set(visual, { opacity: 0, x: 40 })

    observeElements('.authority__container', () => {
      if (content) {
        const tween = gsap.to(content, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
        })
        animations.push(tween)
      }
      if (visual) {
        const tween = gsap.to(visual, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
        })
        animations.push(tween)
      }
    })
  }

  // ── Effect: Method flow items stagger ───────────────────────────────────────
  function initMethodFlowReveal() {
    const items = document.querySelectorAll('.method__flow-wrap')
    if (!items.length) return

    gsap.set(items, { opacity: 0, y: 20 })

    observeElements('.method__flow', () => {
      const tween = gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      })
      animations.push(tween)
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

  // ── Effect: Proof section diff badge ────────────────────────────────────────
  function initProofDiffReveal() {
    const diff = document.querySelector('.proof__diff')
    if (!diff) return

    gsap.set(diff, { opacity: 0, scale: 0.9 })

    observeElements('.proof__diff', () => {
      const tween = gsap.to(diff, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.5)',
      })
      animations.push(tween)
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

    // Cleanup stored for onUnmounted
    ;(window as any).__parallaxCleanup = () => {
      window.removeEventListener('scroll', handleScroll)
    }
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
    ;(window as any).__navbarCleanup = () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }

  // ── Effect: Smooth reveal for the "problem truth" block ─────────────────────
  function initProblemTruthReveal() {
    const truth = document.querySelector('.problem__truth')
    if (!truth) return

    gsap.set(truth, { opacity: 0, y: 30 })

    observeElements('.problem__truth', () => {
      const tween = gsap.to(truth, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      animations.push(tween)
    })
  }

  // ── Initialize all ──────────────────────────────────────────────────────────
  onMounted(() => {
    // Small delay to ensure DOM is painted
    requestAnimationFrame(() => {
      initHeroEntrance()
      initBarAnimation()
      initTrustStripCounters()
      initSectionReveals()
      initTitleReveals()
      initCardStagger()
      initSolutionReveal()
      initAuthorityReveal()
      initMethodFlowReveal()
      initCloseReveal()
      initProofDiffReveal()
      initProblemTruthReveal()
      initParallaxGlows()
      initNavbarShrink()
    })
  })

  // ── Cleanup ─────────────────────────────────────────────────────────────────
  onUnmounted(() => {
    observers.forEach((obs) => obs.disconnect())
    animations.forEach((anim) => anim.kill())

    if ((window as any).__parallaxCleanup) {
      ;(window as any).__parallaxCleanup()
      delete (window as any).__parallaxCleanup
    }
    if ((window as any).__navbarCleanup) {
      ;(window as any).__navbarCleanup()
      delete (window as any).__navbarCleanup
    }
  })
}
