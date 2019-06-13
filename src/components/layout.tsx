import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { readableColor } from 'polished'
import 'typeface-work-sans'
import { Box, Flex } from '../elements'
import theme from '../../config/theme'
import reset from '../styles/reset'
import Logo from './logo'
import { SocialIcon } from 'react-social-icons'
import { FaConnectdevelop } from 'react-icons/fa';
import { FaTh } from 'react-icons/fa';

const GlobalStyles = createGlobalStyle`
  *::before,
  *::after {
    box-sizing: border-box;
  }
  ::selection {
    color: white;
    background-color: rgb(254, 74, 73);
  }
  html {
    box-sizing: border-box;
    border: 0;
    margin: 0;
    
    h1, h2, h3, h4, h5, h6 {
      font-weight: ${theme.fontWeights.bold};
    }
    
    h1 {
      font-size: ${theme.fontSizes[5]};
    }
    h2 {
      font-size: ${theme.fontSizes[4]};
    }
    h3 {
      font-size: ${theme.fontSizes[3]};
    }
    h4 {
      font-size: ${theme.fontSizes[2]};
    }
    h5 {
      font-size: ${theme.fontSizes[1]};
    }
    h6 {
      font-size: ${theme.fontSizes[0]};
    }
    
    @media (max-width: 600px) {
      font-size: 16px;
      
      h1 {
        font-size: ${theme.fontSizes[4]};
      }
      h2 {
        font-size: ${theme.fontSizes[3]};
      }
      h3 {
        font-size: ${theme.fontSizes[2]};
      }
      h4 {
        font-size: ${theme.fontSizes[1]};
      }
      h5 {
        font-size: ${theme.fontSizes[0]};
        
      }
      h6 {
        font-size: ${theme.fontSizes[0]};
      }
    }
  }
  body {
    border: 0;
    margin: 0;
    padding: 0;
    color: black;
    font-family: 'Work Sans', '-apple-system', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    background:#0017301a;
    font-size: 18px;
  }
  a {
    transition: all 0.3s ease-in-out;
    color: black;
    text-decoration: none;
    &:hover,
    &:focus {
      // color: ${theme.colors.secondary};
    }
  }
  ${reset}
`

const isPartiallyActive = ({ isPartiallyCurrent }: { isPartiallyCurrent: boolean }) =>
  isPartiallyCurrent ? { className: 'navlink-active navlink' } : { className: 'navlink' }

const PartialNavLink = ({ children, ...rest }: { children: React.ReactNode }) => (
  <Link getProps={isPartiallyActive} {...rest}>
    {children}
  </Link>
)

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => props.theme.sidebarWidth.big} 1fr;
  @media (max-width: ${props => props.theme.breakpoints[4]}) {
    grid-template-columns: ${props => props.theme.sidebarWidth.normal} 1fr;
  }

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    grid-template-columns: 1fr;
  } 
`

const SideBarInner = styled(Box)<{ bg: string }>`
  position: fixed;
  height: 100%;
  width: ${props => props.theme.sidebarWidth.big};
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  background: ${props => props.bg} linear-gradient(45deg, rgba(255,255,255,0), rgba(255,255,255,0.4));
  box-shadow: 0.1rem 0rem 1rem #00173033;
  // opacity: 0.9;
  
  @media (max-width: ${props => props.theme.breakpoints[4]}) {
    width: ${props => props.theme.sidebarWidth.normal};
  }

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    position: relative;
    width: 100%;
  }
  svg {
    fill: ${props => readableColor(`${props.bg}`)};
    border-radius: 0%;
  }

  g.social-svg-mask > path {
    fill: ${props => readableColor(`${props.bg}`)};
    border-radius: 0%;
  }
  
`

const Nav = styled(Flex)<{ color: string }>`
  a {
    text-decoration: none;
    color: ${props => readableColor(`${props.color}`)};
    font-size: ${props => props.theme.fontSizes[0]};
    line-height: 1.5;
    &:hover,
    &:focus,
    &.navlink-active {
      color: ${props => props.theme.colors.primary};
      
    }
    

    @media (max-width: ${props => props.theme.breakpoints[2]}) {
      font-size: ${props => props.theme.fontSizes[2]};
      margin-left: ${props => props.theme.space[4]};
    }

    @media (max-width: ${props => props.theme.breakpoints[1]}) {
      font-size: ${props => props.theme.fontSizes[1]};
      margin-left: ${props => props.theme.space[3]};
    }

    @media (max-width: ${props => props.theme.breakpoints[0]}) {
      font-size: ${props => props.theme.fontSizes[0]};
      margin-left: ${props => props.theme.space[2]};
    }
  }
`

const Main = styled.main`
  @media (min-width: calc(${props => props.theme.breakpoints[2]} + 1px)) {
    grid-column-start: 2;
  }
`

const Footer = styled.footer<{ color: string }>`
  position: fixed;
  width: ${props => props.theme.sidebarWidth.big};
  font-size: ${props => props.theme.fontSizes[0]};
  bottom: 0;

  background: ${props => props.color};

  color: ${props => readableColor(`${props.color}`, `${props.theme.colors.grey}`, '#c3c3c3')};

  a {
    color: ${props => readableColor(`${props.color}`)};
    text-decoration: none;
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints[4]}) {
    width: ${props => props.theme.sidebarWidth.normal};
  }

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    position: relative;
    width: 100%;
  }
`

type LayoutProps = { children: React.ReactNode } & typeof defaultProps

const defaultProps = {
  color: 'whitesmoke',
}

interface QueryResult {
  navigation: {
    edges: {
      node: {
        name: string
        link: string
        icon: string
        icon2: string
      }
    }[]
  }
}

const Layout = ({ children, color }: LayoutProps) => {
  const data: QueryResult = useStaticQuery(query)

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Wrapper>
          <SideBarInner bg={color} as="aside" p={[4, 4, 6]}>
            <Flex
              flexWrap="nowrap"
              flexDirection={['row', 'row', 'row', 'column']}
              alignItems={['center', 'center', 'center', 'flex-start']}
              justifyContent="space-between"
            >
              <Box width={['3rem', '4rem', '5rem', '6rem']}>
                <Link to="/" aria-label="MiquelXarau, Back to Home">
                  <Logo />
                </Link>
              </Box>
              <Nav
                color={color}
                mt={[0, 0, 0, 10]}
                as="nav"
                flexWrap="nowrap"
                flexDirection={['row', 'row', 'row', 'column']}
                alignItems="flex-start"
              >
              
                {data.navigation.edges.map(({ node: item }) => (
                  <PartialNavLink to={item.link} key={item.name}>
                  <FaTh/> <FaConnectdevelop/>
                  </PartialNavLink>
                ))}
                
              </Nav>
            </Flex>
          </SideBarInner>
          <Main>{children}</Main>
          <Footer color={color}>
          <SocialIcon url="https://linkedin.com/in/miquelxarau" target="_blank" />
          <SocialIcon url="https://github.com/mikexarau" target="_blank" />
          <SocialIcon url="https://www.behance.net/miquelxarau" target="_blank" />
          <SocialIcon url="https://twitter.com/mikixarau" target="_blank" />

            <Box p={[4, 4, 5]} fontSize={0}>
              by <a href="https://www.mxglab.com/en">Miquel Xarau</a>.<br />
              <a href="https://github.com/mikexarau/portfolio" target="_blank"></a>
            </Box>
          </Footer>
        </Wrapper>
      </>
    </ThemeProvider>
  )
}

export default Layout

Layout.defaultProps = defaultProps

const query = graphql`
  query LayoutQuery {
    navigation: allNavigationYaml {
      edges {
        node {
          name
          link 
          icon
          icon2      
        }
      }
    }
  }
`
