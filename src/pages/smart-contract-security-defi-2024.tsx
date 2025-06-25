import React, { useState, useEffect } from 'react'
import Layout2025 from '../components/layout-2025'
import SEO from '../components/SEO'
import { useTheme2025 } from '../utils/theme-context-2025'
import {
  ArticleContainer,
  ActionBar,
  ArticleHeader,
  TableOfContents,
  ArticleContent,
  InfoBox,
  ToolsGrid
} from '../components/blog-components'
import { 
  FaShieldAlt,
  FaArrowLeft,
  FaFileAlt,
  FaShare,
  FaClock,
  FaUser,
  FaEye
} from 'react-icons/fa'
import { SiEthereum } from 'react-icons/si'

const SmartContractSecurityArticle: React.FC = () => {
  const { theme } = useTheme2025()

  return (
    <Layout2025>
      <SEO 
        title="Smart Contract Security en DeFi 2024: Patrones Avanzados y Auditoría - Miquel Xarau"
        desc="Descubre patrones avanzados de seguridad para smart contracts en DeFi, vulnerabilidades comunes y mejores prácticas de auditoría en 2024."
      />
      
      <ArticleContainer $theme={theme}>
        <ActionBar $theme={theme}>
          <a href="/blog" className="back-link">
            <FaArrowLeft />
            Volver al Blog
          </a>
          <div className="actions">
            <button 
              className="action-btn"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Smart Contract Security en DeFi 2024',
                    text: 'Patrones avanzados de seguridad para smart contracts y mejores prácticas de auditoría',
                    url: window.location.href
                  });
                } else {
                  const url = encodeURIComponent(window.location.href);
                  const text = encodeURIComponent('Smart Contract Security en DeFi 2024');
                  
                  const shareOptions = [
                    { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
                    { name: 'Twitter/X', url: `https://twitter.com/intent/tweet?text=${text}&url=${url}` },
                    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${url}` }
                  ];
                  
                  const choice = prompt('Compartir en:\n1. LinkedIn\n2. Twitter/X\n3. Facebook\n\nEscribe el número:');
                  if (choice && shareOptions[parseInt(choice) - 1]) {
                    window.open(shareOptions[parseInt(choice) - 1].url, '_blank');
                  }
                }
              }}
            >
              <FaShare />
              Compartir
            </button>
          </div>
        </ActionBar>

        <ArticleHeader $theme={theme}>
          <div className="category-badge blockchain">
            <SiEthereum />
            Smart Contracts & DeFi Security
          </div>
          
          <h1>Smart Contract Security en DeFi 2024: Patrones Avanzados y Auditoría</h1>
          
          <div className="article-meta">
            <div className="meta-item">
              <FaClock />
              12 min de lectura
            </div>
            <div className="meta-item">
              <FaUser />
              Miquel Xarau
            </div>
            <div className="meta-item">
              <FaEye />
              28 de Enero, 2025
            </div>
          </div>
          
          <p className="article-excerpt">
            Una guía completa sobre patrones avanzados de seguridad para smart contracts en DeFi, 
            análisis de vulnerabilidades comunes y metodologías de auditoría profesional para 
            proteger protocolos financieros descentralizados.
          </p>
        </ArticleHeader>

          <TableOfContents $theme={theme}>
            <h3>
              <FaFileAlt />
              Tabla de Contenidos
            </h3>
            <ul>
              <li><a href="#introduccion">Introducción a la Seguridad DeFi</a></li>
              <li><a href="#fundamentos">Fundamentos de Seguridad</a></li>
              <li><a href="#patrones">Patrones Avanzados de Seguridad</a></li>
              <li><a href="#vulnerabilidades">Vulnerabilidades Comunes</a></li>
              <li><a href="#auditoria">Auditoría y Testing</a></li>
              <li><a href="#herramientas">Herramientas Esenciales</a></li>
              <li><a href="#casos">Casos de Estudio</a></li>
              <li><a href="#futuro">El Futuro de la Seguridad DeFi</a></li>
            </ul>
          </TableOfContents>

          <ArticleContent $theme={theme}>
            <section id="introduccion">
              <h2>Introducción a la Seguridad en Smart Contracts DeFi</h2>
              
              <p>
                La seguridad en protocolos DeFi (Finanzas Descentralizadas) presenta desafíos únicos 
                que van más allá de la seguridad tradicional de smart contracts. Con más de $200 mil 
                millones en valor total bloqueado (TVL) y pérdidas por hacks superiores a $3 mil 
                millones en 2024, la implementación de patrones de seguridad robustos es crítica.
              </p>

              <InfoBox $theme={theme} $variant="warning">
                <strong>Estadísticas Alarmantes 2024:</strong> Los ataques a protocolos DeFi 
                representan el 78% de todas las pérdidas en el ecosistema blockchain, con un 
                incremento del 45% respecto al año anterior.
              </InfoBox>

              <p>
                La complejidad inherente de los protocolos DeFi, que incluye interacciones entre 
                múltiples contratos, oráculos de precio y mecanismos de gobierno, crea superficies 
                de ataque extensas que requieren un enfoque holístico de seguridad.
              </p>

              <h3>Retos Únicos en DeFi</h3>
              <ul>
                <li><strong>Composabilidad:</strong> Los protocolos DeFi se integran entre sí, 
                creando dependencias complejas</li>
                <li><strong>Liquidez:</strong> Los ataques pueden drenar fondos instantáneamente</li>
                <li><strong>Governance:</strong> Los mecanismos de gobierno descentralizado pueden 
                ser comprometidos</li>
                <li><strong>Oracle Dependency:</strong> La dependencia de datos externos introduce 
                vectores de ataque únicos</li>
              </ul>
            </section>

            <section id="fundamentos">
              <h2>Fundamentos de Seguridad en Smart Contracts</h2>
              
              <p>
                Los fundamentos de seguridad en smart contracts van más allá de las buenas prácticas 
                de programación. Requieren un entendimiento profundo de la EVM, patrones de ataque 
                conocidos y técnicas de mitigación específicas.
              </p>

              <InfoBox $theme={theme} $variant="info">
                <strong>Principio de Menor Privilegio:</strong> Cada función y usuario debe tener 
                solo los permisos mínimos necesarios. Esto reduce significativamente la superficie 
                de ataque.
              </InfoBox>

              <h3>1. Checks-Effects-Interactions</h3>
              <p>
                Este patrón fundamental previene ataques de reentrancia ordenando las operaciones 
                en tres fases: verificaciones, efectos en el estado interno, e interacciones externas.
              </p>

              <pre><code>{`// Patrón Checks-Effects-Interactions
function withdraw(uint256 amount) external nonReentrant {
    // 1. Checks
    require(balances[msg.sender] >= amount, "Insufficient balance");
    require(amount > 0, "Amount must be positive");
    
    // 2. Effects
    balances[msg.sender] -= amount;
    
    // 3. Interactions
    payable(msg.sender).transfer(amount);
}`}</code></pre>

              <h3>2. Circuit Breakers</h3>
              <p>
                Los circuit breakers permiten pausar operaciones críticas cuando se detectan 
                comportamientos anómalos, proporcionando tiempo para investigar y responder a 
                posibles ataques.
              </p>

              <h3>3. Rate Limiting</h3>
              <p>
                Implementa límites de velocidad para prevenir ataques de draining masivo y 
                comportamientos maliciosos automatizados.
              </p>
            </section>

            <section id="patrones">
              <h2>Patrones Avanzados de Seguridad</h2>
              
              <p>
                Los patrones avanzados de seguridad abordan escenarios complejos específicos de DeFi, 
                incluyendo manejo de oráculos, protección contra MEV y gestión de liquidez.
              </p>

              <h3>1. TWAP (Time-Weighted Average Price) Oracle</h3>
              <InfoBox $theme={theme} $variant="tip">
                <strong>Best Practice:</strong> Utiliza TWAP para suavizar la volatilidad de precios 
                y prevenir manipulaciones de mercado a corto plazo.
              </InfoBox>

              <p>
                Los oráculos TWAP proporcionan precios promediados en el tiempo, haciéndolos más 
                resistentes a ataques de manipulación flash.
              </p>

              <h3>2. Pull Over Push Payments</h3>
              <p>
                En lugar de enviar fondos automáticamente (push), permite que los usuarios retiren 
                sus fondos (pull). Esto previene fallas en cascada y ataques DoS.
              </p>

              <h3>3. Multisig con Timelock</h3>
              <p>
                Combina multisignature wallets con timelock controllers para operaciones administrativas 
                críticas, proporcionando tanto seguridad distribuida como transparencia temporal.
              </p>
            </section>

            <section id="vulnerabilidades">
              <h2>Vulnerabilidades Comunes en DeFi</h2>
              
              <InfoBox $theme={theme} $variant="warning">
                <strong>Estadística Crítica:</strong> El 67% de los ataques en DeFi explotan 
                vulnerabilidades de lógica de negocio, no fallas técnicas del código.
              </InfoBox>

              <h3>1. Ataques de Reentrancia</h3>
              <p>
                Siguen siendo la vulnerabilidad más explotada. Los atacantes pueden llamar 
                recursivamente a funciones antes de que se complete la ejecución original.
              </p>

              <h3>2. Oracle Manipulation</h3>
              <p>
                Los atacantes manipulan precios de oráculos para obtener ventajas injustas en 
                liquidaciones, préstamos o intercambios.
              </p>

              <h3>3. Flash Loan Attacks</h3>
              <p>
                Utilizan préstamos flash para explorar arbitrajes complejos y inconsistencias 
                entre protocolos en una sola transacción.
              </p>

              <h3>4. Governance Attacks</h3>
              <p>
                Los atacantes pueden comprometer mecanismos de gobierno para modificar parámetros 
                críticos del protocolo en su beneficio.
              </p>
            </section>

            <section id="auditoria">
              <h2>Auditoría y Testing</h2>
              
              <p>
                Una auditoría completa de smart contracts DeFi debe incluir múltiples metodologías 
                complementarias para identificar vulnerabilidades en diferentes capas.
              </p>

              <InfoBox $theme={theme} $variant="info">
                <strong>Metodología de Auditoría:</strong> Combina análisis estático, testing 
                dinámico, fuzzing y revisión manual para una cobertura completa.
              </InfoBox>

              <h3>1. Análisis Estático</h3>
              <p>
                Herramientas como Slither, MythX y Semgrep pueden identificar patrones conocidos 
                de vulnerabilidades automáticamente.
              </p>

              <h3>2. Property-Based Testing</h3>
              <p>
                Define invariantes del protocolo y utiliza herramientas como Echidna para 
                encontrar inputs que las violen.
              </p>

              <h3>3. Formal Verification</h3>
              <p>
                Para contratos críticos, la verificación formal matemática puede probar 
                correctness absoluta de propiedades específicas.
              </p>
            </section>

            <section id="herramientas">
              <h2>Herramientas Esenciales</h2>
              
              <ToolsGrid $theme={theme}>
                <div className="tool-card">
                  <div className="tool-icon">🔍</div>
                  <h4>Slither</h4>
                  <p>Framework de análisis estático para Solidity. Detecta más de 70 tipos 
                  de vulnerabilidades automáticamente.</p>
                </div>

                <div className="tool-card">
                  <div className="tool-icon">⚡</div>
                  <h4>Foundry</h4>
                  <p>Toolkit moderno para desarrollo y testing de smart contracts con soporte 
                  para fuzzing avanzado.</p>
                </div>

                <div className="tool-card">
                  <div className="tool-icon">🧪</div>
                  <h4>Echidna</h4>
                  <p>Fuzzer especializado en property-based testing para encontrar violaciones 
                  de invariantes.</p>
                </div>

                <div className="tool-card">
                  <div className="tool-icon">🔒</div>
                  <h4>MythX</h4>
                  <p>Plataforma de análisis de seguridad que combina múltiples técnicas de 
                  detección de vulnerabilidades.</p>
                </div>
              </ToolsGrid>
            </section>

            <section id="casos">
              <h2>Casos de Estudio</h2>
              
              <h3>Caso 1: The DAO Hack (2016)</h3>
              <p>
                El hack más famoso de la historia de Ethereum. Un ataque de reentrancia drenó 
                3.6 millones de ETH, llevando a un hard fork de la blockchain.
              </p>

              <InfoBox $theme={theme} $variant="warning">
                <strong>Lección Aprendida:</strong> La importancia del patrón checks-effects-interactions 
                y la implementación de circuit breakers.
              </InfoBox>

              <h3>Caso 2: bZx Flash Loan Attacks (2020)</h3>
              <p>
                Serie de ataques que utilizaron flash loans para manipular oráculos de precio 
                y obtener ganancias ilícitas de más de $1 millón.
              </p>

              <h3>Caso 3: Euler Finance Hack (2023)</h3>
              <p>
                Un ataque de $197 millones que explotó una vulnerabilidad en la lógica de 
                liquidación del protocolo.
              </p>
            </section>

            <section id="futuro">
              <h2>El Futuro de la Seguridad en DeFi</h2>
              
              <p>
                La seguridad en DeFi evoluciona constantemente. Las tendencias emergentes incluyen 
                IA para detección de amenazas, verificación formal automatizada y nuevos paradigmas 
                de consensus para aplicaciones financieras.
              </p>

              <InfoBox $theme={theme} $variant="success">
                <strong>Innovaciones 2024-2025:</strong> Expectativas de herramientas de auditoría 
                asistidas por IA, oráculos más robustos y mejores frameworks de testing.
              </InfoBox>

              <h3>Tendencias Emergentes</h3>
              <ul>
                <li><strong>AI-Assisted Auditing:</strong> Machine learning para detección de patrones</li>
                <li><strong>Zero-Knowledge Security:</strong> Protocolos que preservan privacidad</li>
                <li><strong>Cross-Chain Security:</strong> Protección en entornos multi-blockchain</li>
                <li><strong>Quantum-Resistant Cryptography:</strong> Preparación para la era post-cuántica</li>
              </ul>

              <p>
                El futuro de DeFi depende de nuestra capacidad para innovar en seguridad al mismo 
                ritmo que innovamos en funcionalidad. Solo así podremos construir un sistema 
                financiero verdaderamente descentralizado y confiable.
              </p>
            </section>
          </ArticleContent>
        </ArticleContainer>
    </Layout2025>
  )
}

export default SmartContractSecurityArticle 