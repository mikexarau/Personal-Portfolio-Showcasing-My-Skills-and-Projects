import React from 'react'
import { config, useSpring } from 'react-spring'
import Layout from '../components/layout'
import { AnimatedBox } from '../elements'
import SEO from '../components/SEO'
import Project from '../templates/project';


const About = () => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout color='#4ad7d1'>
      <SEO title="About | mxg" desc="Hi. I'm Miquel Xarau! You can visit my website or my other projects." />
      <AnimatedBox style={pageAnimation} py={[6, 6, 6, 8]} px={[6, 6, 8, 6, 8, 13]}>
        <h1>Hi. I'm Miquel Xarau!</h1>
        <p>
          You can visit my <a href="https://www.mxglab.com">website</a> or my other{' '}
          <a href="/">Pojects</a>.
        </p>
      </AnimatedBox>
  
    </Layout>
  )
}


export default About
