import styled from 'styled-components'
import { Link } from 'gatsby'

const GridItem = styled(Link)`
  position: relative;
  > div {
    // position: absolute !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // box-shadow: -0rem 0.8rem 1rem #0017301f;
    box-shadow: 0 2px 20px 0 rgba(0,0,0,0.05);
    transition: box-shadow .3s ease-out, transform .3s ease-out, opacity .2s ease-out;
    transition-delay: .1s;
    border-radius: 4px;
    transform: translateZ(0)
    background-color: #fff;
    overflow: hidden;
    height: 100%;
    background-position: center 26%;
  }
  > div img {
    transition: transform ease 0.2s !important;
    margin: 0
    display:block;
    width: 100%;
    height: auto;
}
  }
  > span {
    z-index: 10;
    position: absolute;   
    font-weight: 700;    
    opacity:0;
    // transition: 0.2s ease 0s !important;
    bottom: 0;
    right: 0; 
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    color: #4ad7d1;
    position: absolute;
    top: 64%;
    left: 0%;
    width: 0%;
    height: 27.5%;
    transform: translateZ(0);
    text-align: left;
    font-size: ${props => props.theme.fontSizes[2]}; 
    padding: ${props => props.theme.space[0]};
    padding-top:6%;
    padding-left:6%;
    background: linear-gradient(-45deg, rgba(255,255,255,0), rgba(255,255,255,1));
    transition: opacity 0.3s ease all !important;
    transform: opacity;
    transform-delay: .1s;
  
  
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    font-size: ${props => props.theme.fontSizes[0]};
    padding: ${props => props.theme.space[5]};

    }
    

    
  }
  &:hover {
    > div img {
      // display:none;
      transform: scale(1.6);
      background: rgb(63,64,72);
      mix-blend-mode: luminosity;
      background-blend-mode: overlay;
      
      
      
      

      
    }
    > div {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      // box-shadow: 0.6rem 0.8rem #4ad7d1;
      
      opacity: 0.9;
      transition: .4s ease;
      background: #001730 linear-gradient(45deg, rgba(255,255,255,0), rgba(255,255,255,0.1));
      // margin: 1em 1em 0em 1em;
      // box-shadow: 5px 0px 42px #00173005;
      box-shadow: rgba(45,45,45,0.05) 0px 2px 2px, rgba(49,49,49,0.05) 0px 4px 4px, rgba(42,42,42,0.05) 0px 8px 8px, rgba(32,32,32,0.05) 0px 16px 16px, rgba(49,49,49,0.05) 0px 32px 32px, rgba(35,35,35,0.05) 0px 64px 64px;
      transform: translate(0, -6px);
    
    }
    > span {
      opacity:0.9;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      color: #4ad7d1;
  position: absolute;
  top: 64%;
  left: 0%;
  width: 94%;
  height: 27.5%;
  text-align: left;
  font-size: ${props => props.theme.fontSizes[2]}; 
  padding: ${props => props.theme.space[0]};
  padding-top:6%;
  padding-left:6%;
  background: #001730 linear-gradient(45deg, rgba(255,255,255,0), rgba(255,255,255,0.2));
  transition: 0.4s ease all !important;
  transform: translate(0, -6px);
  @media (max-width: ${props => props.theme.breakpoints[5]}) {
    font-size: ${props => props.theme.fontSizes[0]};
    padding: ${props => props.theme.space[5]};

    }
  }
`

export default GridItem
