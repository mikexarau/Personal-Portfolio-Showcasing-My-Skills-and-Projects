import React from 'react'
import { config, useSpring } from 'react-spring'
import Layout from '../components/layout'
import { AnimatedBox } from '../elements'
import SEO from '../components/SEO'
import { FaReact } from 'react-icons/fa';
import { FaCss3Alt } from 'react-icons/fa';
import { FaGit } from 'react-icons/fa';
import { FaEthereum } from 'react-icons/fa';
import { FaHtml5 } from 'react-icons/fa';
import { FaSass } from 'react-icons/fa';
import { FaBootstrap } from 'react-icons/fa';
import { FaWordpress } from 'react-icons/fa';

const About = () => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout color='rgb(0, 12, 26)'>
      <SEO title="About | mxg" desc="Hi. I'm Miquel Xarau! You can visit my website or my other Gatsby projects." />
      <AnimatedBox style={pageAnimation} py={[6, 6, 6, 8]} px={[6, 6, 8, 6, 8, 13]}>
        <h1>Hi. I'm MiquelXarau!</h1>
        <p>
          You can visit my <a href="https://www.mxglab.com">website</a> or my other{' '}
          <a href="/">Pojects</a>.
        </p>
        <div><h4>Skills</h4>
        <p>+ UX/UI Designer </p>
        <p>+ Frontend developer </p>
        <p>+ Blockchain developer </p>
        <h4>Tecnologies</h4> 
        <FaReact /><FaHtml5 /><FaSass /><FaCss3Alt /><FaGit /><FaEthereum />
        <FaBootstrap /><FaWordpress /><FaGit /><FaEthereum />
        </div>
      </AnimatedBox>
    </Layout>
  )
}

export default About
