# 🚀 **Guía de Deploy en Netlify**
*Portfolio Miquel Xarau - Configuración de Producción*

## **📋 Requisitos Completados ✅**

- ✅ **Código en GitHub:** https://github.com/mikexarau/Personal-Portfolio-Showcasing-My-Skills-and-Projects
- ✅ **Auditoría de Seguridad:** Completada (ver `AUDIT_REPORT_2025.md`)
- ✅ **Build funcional:** `npm run build` exitoso
- ✅ **Configuraciones de Netlify:** netlify.toml, _headers, _redirects

---

## **🌐 Configuración de Netlify**

### **Paso 1: Acceder a Netlify**
1. Ve a https://app.netlify.com/
2. Inicia sesión con tu cuenta
3. Click en "Add new site" → "Import an existing project"

### **Paso 2: Conectar Repositorio GitHub**
1. Selecciona "Deploy with GitHub"
2. Autoriza Netlify para acceder a tus repositorios
3. Busca y selecciona: `mikexarau/Personal-Portfolio-Showcasing-My-Skills-and-Projects`

### **Paso 3: Configuración de Build**
**IMPORTANTE:** Usar exactamente estas configuraciones:

```
Repository: mikexarau/Personal-Portfolio-Showcasing-My-Skills-and-Projects
Branch to deploy: master
Build command: npm run build
Publish directory: public
```

### **Paso 4: Variables de Entorno (Opcional)**
Si planeas usar Google Analytics, añade:
```
GATSBY_JPEG_ENCODER = MOZJPEG
NODE_VERSION = 18
```

### **Paso 5: Configurar Dominio Custom**
1. En Site settings → Domain management
2. Add custom domain: `miquelxarau.netlify.app`
3. Verify domain ownership
4. Enable HTTPS (automático con Let's Encrypt)

---

## **⚙️ Configuraciones Avanzadas**

### **Headers de Seguridad** ✅
- Configurado en `_headers`
- CSP, HSTS, X-Frame-Options implementados
- Cache control optimizado

### **Redirects** ✅  
- HTTPS forzado
- Protección contra rutas maliciosas
- SPA routing configurado

### **Performance** ✅
- Compresión automática habilitada
- CDN Edge Network
- Cache optimization (1 año para assets)

---

## **🔧 Comandos CLI (Alternativo)**

Si prefieres usar Netlify CLI:

```bash
# 1. Login en Netlify
netlify login

# 2. Enlazar sitio existente
netlify link --id YOUR_SITE_ID

# 3. Deploy manual
netlify deploy --prod --dir=public
```

---

## **📊 Verificaciones Post-Deploy**

### **🔒 Seguridad**
- [ ] **SSL Labs Test:** https://www.ssllabs.com/ssltest/
- [ ] **Security Headers:** https://securityheaders.com/
- [ ] **CSP Evaluator:** https://csp-evaluator.withgoogle.com/

### **⚡ Performance**
- [ ] **Lighthouse:** Ejecutar en Chrome DevTools
- [ ] **GTmetrix:** https://gtmetrix.com/
- [ ] **WebPageTest:** https://www.webpagetest.org/

### **🌐 Funcionalidad**
- [ ] **Navegación:** Todas las páginas cargan
- [ ] **Responsive:** Mobile/tablet/desktop
- [ ] **Videos:** Reproducen correctamente
- [ ] **Formularios:** Si hay contacto funciona

---

## **🎯 Objetivos de Performance**

| Métrica | Objetivo | Herramienta |
|---------|----------|-------------|
| Lighthouse Performance | >90 | Chrome DevTools |
| First Contentful Paint | <1.5s | Lighthouse |
| Largest Contentful Paint | <2.5s | Web Vitals |
| Cumulative Layout Shift | <0.1 | Web Vitals |
| SSL Labs Grade | A+ | SSL Labs |
| Security Headers | A | SecurityHeaders.com |

---

## **🚨 Troubleshooting**

### **Build Fails**
- Verificar `node_modules` no esté en Git
- Check Node version (usar 18)
- Ver logs de build en Netlify dashboard

### **Deploy 404s**
- Verificar `_redirects` está en root
- SPA routing configurado correctamente
- Publish directory es `public`

### **Missing Assets**
- Verificar `static/` folder estructura
- Check image paths relativos
- CDN cache refresh (puede tardar minutos)

---

## **📈 Dominio Final**

Una vez configurado correctamente:

**🌐 Portfolio Live:** https://miquelxarau.netlify.app/

### **URLs Principales:**
- **Home:** https://miquelxarau.netlify.app/
- **About:** https://miquelxarau.netlify.app/about/
- **Trabajos:** https://miquelxarau.netlify.app/trabajos/
- **Blog:** https://miquelxarau.netlify.app/blog/
- **Contact:** https://miquelxarau.netlify.app/contact/

---

## **✅ Checklist de Deployment**

- [ ] Repositorio GitHub actualizado con último código
- [ ] Build local exitoso (`npm run build`)
- [ ] Netlify site configurado desde GitHub repo
- [ ] Domain custom configurado
- [ ] HTTPS habilitado
- [ ] Headers de seguridad funcionando
- [ ] Tests de performance realizados
- [ ] Verificación en múltiples dispositivos

---

**¡Tu portfolio está listo para producción con configuraciones enterprise-grade! 🎉**

*Si encuentras algún problema, verifica primero los logs de build en el dashboard de Netlify.* 