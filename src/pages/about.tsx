import React from 'react'
import { config, useSpring } from 'react-spring'
import Layout from '../components/layout'
import { AnimatedBox } from '../elements'
import SEO from '../components/SEO'
import { FaReact } from 'react-icons/fa';
import { FaCss3Alt } from 'react-icons/fa';
import { DiGit } from 'react-icons/di';
import { FaEthereum } from 'react-icons/fa';
import { FaHtml5 } from 'react-icons/fa';
import { FaSass } from 'react-icons/fa';
import { FaBootstrap } from 'react-icons/fa';
import { FaWordpress } from 'react-icons/fa';
import { FaJsSquare } from 'react-icons/fa';
import { FaJava } from 'react-icons/fa';
import { DiNpm } from 'react-icons/di';
import { DiNodejsSmall } from 'react-icons/di';
import { DiPhotoshop } from 'react-icons/di';
import { DiIllustrator } from 'react-icons/di';
import { DiVisualstudio } from 'react-icons/di';
import { FaDocker } from 'react-icons/fa';
import { FaAdobe } from 'react-icons/fa';
import { DiPhp } from 'react-icons/di';

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
        <h1>Hi. I'm Miquel Xarau!</h1>
        <p>I'm creating noice web experiences for the next generation of consumer-facing companies.</p>
        <p>
          You can visit my <a href="https://www.mxglab.com">website</a> or my other{' '}
          <a href="/">Pojects</a>.
        </p>
        <div><h4>Skills</h4>
        <p>+ UX/UI Designer </p>
        <p>+ Frontend developer </p>
        <p>+ Blockchain developer </p>
        <h4>Tecnologies</h4> 
          <div class="">
            <h2><FaReact />  <FaHtml5 />  <FaSass />  <FaCss3Alt />  <DiGit />  <FaEthereum /></h2>
          </div>
          <div>
            <h2><FaBootstrap />  <FaWordpress />  <FaJsSquare />  <FaJava />  <DiNpm /> <DiNodejsSmall /></h2>
          </div>
          <div>
            <h2><FaAdobe />  <DiIllustrator />  <DiPhotoshop />  <DiVisualstudio />  <FaDocker />  <DiPhp /></h2>
          </div>
        </div>
      </AnimatedBox>
    </Layout>
  )
}

export default About
