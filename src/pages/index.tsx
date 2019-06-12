import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring'
import Layout from '../components/layout'
import GridItem from '../components/grid-item'
import SEO from '../components/SEO'
import { ChildImageSharp } from '../types'
import { FaReact } from 'react-icons/fa';


type PageProps = {
  data: {
    projects: {
      edges: {
        node: {
          title: string
          title_detail: string
          from: string
          category: string
          slug: string
          cover: ChildImageSharp
        }
      }[]
    }
  }
}

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  // grid-auto-rows: 50%;
  background: transparent;
  margin: 4%;
  margin-bottom: 6%;
  grid-gap: 2em;

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    grid-template-columns: repeat(2, 1fr);
    // grid-auto-rows: 50%;
    
  }
  @media screen and (max-width: 650px) {
    grid-template-columns: 1fr;
    
    margin: 5%;
  }
`

const Projects: React.FunctionComponent<PageProps> = ({ data: { projects } }) => {
    const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout color="#001730">
      <SEO title="Projects | mxg" />
      <Area style={pageAnimation}>
        {projects.edges.map(({ node: project }) => (
          <GridItem key={project.slug} to={project.slug} aria-label={`View project "${project.title}"`}>
            <Img fluid={project.cover.childImageSharp.fluid} />
            <div class="card">
            <div class="fromdate">{project.from}
                    </div>
                <div class="card-header">
                    <div>
                      <h5>{project.title}</h5>
                      <p>{project.title_detail}</p>
                    </div>
                </div>
                <div class="card-footer">
                  <p>{project.category}</p>
                </div>
            </div>
          </GridItem>
        ))}
      </Area>
    </Layout>
  )
}

export default Projects

export const query = graphql`
  query ProjectsQuery {
    projects: allProjectsYaml {
      edges {
        node {
          title
          title_detail
          from
          category
          slug
          cover {
            childImageSharp {
              fluid(quality: 95, maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`