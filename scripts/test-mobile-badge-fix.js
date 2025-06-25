#!/usr/bin/env node

/**
 * Script de prueba para verificar la solución del z-index del Work Badge en mobile
 * Verifica que los badges estén siempre visibles por encima de videos y overlays
 */

const puppeteer = require('puppeteer')

async function testMobileBadgeFix() {
  console.log('🔍 INICIANDO TEST DEL MOBILE BADGE FIX...')
  
  let browser
  try {
    browser = await puppeteer.launch({
      headless: false, // Mostrar para debug visual
      defaultViewport: null
    })
    
    const page = await browser.newPage()
    
    // Simular dispositivo móvil
    await page.setViewport({
      width: 375,
      height: 667,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2
    })
    
    console.log('📱 Navegando a la página principal en viewport móvil...')
    await page.goto('https://miquelxarau.netlify.app', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    })
    
    // Esperar a que se cargue el carrusel
    console.log('⏳ Esperando a que se cargue el carrusel...')
    await page.waitForSelector('.work-badge', { timeout: 10000 })
    
    // Obtener información de todos los badges
    const badgeInfo = await page.evaluate(() => {
      const badges = document.querySelectorAll('.work-badge')
      return Array.from(badges).map((badge, index) => {
        const rect = badge.getBoundingClientRect()
        const computedStyle = window.getComputedStyle(badge)
        const parentCard = badge.closest('[class*="CarouselCard"]')
        const parentRect = parentCard ? parentCard.getBoundingClientRect() : null
        
        // Buscar videos en la misma card
        const videos = parentCard ? Array.from(parentCard.querySelectorAll('video')) : []
        const videoZIndexes = videos.map(video => {
          const videoStyle = window.getComputedStyle(video)
          return parseInt(videoStyle.zIndex) || 'auto'
        })
        
        return {
          index: index,
          text: badge.textContent,
          visible: rect.width > 0 && rect.height > 0,
          position: {
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
            width: rect.width,
            height: rect.height
          },
          zIndex: computedStyle.zIndex,
          position_css: computedStyle.position,
          transform: computedStyle.transform,
          isolation: computedStyle.isolation,
          willChange: computedStyle.willChange,
          contain: computedStyle.contain,
          isAboveViewport: rect.top >= 0,
          parentCardPosition: parentRect ? {
            top: parentRect.top,
            left: parentRect.left,
            width: parentRect.width,
            height: parentRect.height
          } : null,
          videoZIndexes: videoZIndexes,
          hasVideosInCard: videos.length > 0
        }
      })
    })
    
    console.log('\n📊 RESULTADOS DEL TEST DE BADGES:')
    console.log('=' .repeat(50))
    
    let allBadgesVisible = true
    let totalBadges = badgeInfo.length
    let visibleBadges = 0
    
    badgeInfo.forEach((badge, i) => {
      console.log(`\n🏷️  Badge ${i + 1}:`)
      console.log(`   Texto: "${badge.text}"`)
      console.log(`   Visible: ${badge.visible ? '✅ SÍ' : '❌ NO'}`)
      console.log(`   Z-Index: ${badge.zIndex}`)
      console.log(`   Position: ${badge.position_css}`)
      console.log(`   Transform: ${badge.transform}`)
      console.log(`   Isolation: ${badge.isolation}`)
      console.log(`   Will-change: ${badge.willChange}`)
      console.log(`   Contain: ${badge.contain}`)
      console.log(`   Dimensiones: ${badge.position.width}x${badge.position.height}`)
      console.log(`   Coordenadas: top(${badge.position.top}), right(${badge.position.right})`)
      console.log(`   Videos en card: ${badge.hasVideosInCard ? badge.videoZIndexes.join(', ') : 'ninguno'}`)
      
      if (badge.visible) {
        visibleBadges++
      } else {
        allBadgesVisible = false
      }
    })
    
    console.log('\n' + '='.repeat(50))
    console.log(`📈 RESUMEN: ${visibleBadges}/${totalBadges} badges visibles`)
    
    if (allBadgesVisible) {
      console.log('🎉 ¡ÉXITO! Todos los badges están visibles en mobile')
    } else {
      console.log('❌ FALLO: Algunos badges no están visibles')
    }
    
    // Test específico de hover en mobile (simular touch)
    console.log('\n🔍 Probando interacción táctil...')
    const firstCard = await page.$('[class*="CarouselCard"]')
    if (firstCard) {
      await firstCard.tap()
      await page.waitForTimeout(1000)
      
      const badgeAfterTap = await page.evaluate(() => {
        const firstBadge = document.querySelector('.work-badge')
        if (firstBadge) {
          const rect = firstBadge.getBoundingClientRect()
          const style = window.getComputedStyle(firstBadge)
          return {
            visible: rect.width > 0 && rect.height > 0,
            zIndex: style.zIndex,
            transform: style.transform
          }
        }
        return null
      })
      
      if (badgeAfterTap) {
        console.log(`   Badge después de tap: visible=${badgeAfterTap.visible}, z-index=${badgeAfterTap.zIndex}`)
      }
    }
    
    // Scroll para probar más badges
    console.log('\n📜 Probando scroll horizontal...')
    await page.evaluate(() => {
      const carousel = document.querySelector('[class*="CarouselTrack"]')
      if (carousel) {
        carousel.scrollLeft += 300
      }
    })
    
    await page.waitForTimeout(2000)
    
    const badgesAfterScroll = await page.evaluate(() => {
      const badges = document.querySelectorAll('.work-badge')
      let visibleCount = 0
      badges.forEach(badge => {
        const rect = badge.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) visibleCount++
      })
      return { total: badges.length, visible: visibleCount }
    })
    
    console.log(`   Badges después de scroll: ${badgesAfterScroll.visible}/${badgesAfterScroll.total} visibles`)
    
    console.log('\n✅ Test completado. Cerrando navegador en 5 segundos...')
    await page.waitForTimeout(5000)
    
  } catch (error) {
    console.error('❌ Error durante el test:', error.message)
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

// Ejecutar el test
testMobileBadgeFix().then(() => {
  console.log('🏁 Test finalizado')
  process.exit(0)
}).catch(error => {
  console.error('💥 Error crítico:', error)
  process.exit(1)
}) 