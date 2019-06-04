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
    box-shadow: -0rem 0.8rem 1rem #0017301f;
  }
  > div img {
    transition: 0.2s ease 0s !important;
    margin: 0
    display:block;
    width: 100%;
    height: auto;
  }
  > span {
    z-index: 10;
    color: white;
    position: absolute;   
    text-align: left;
    background: red;
    font-weight: 700;
    font-size: ${props => props.theme.fontSizes[0.5]};
    padding: ${props => props.theme.space[3]};
    opacity:0;
    // transition: 0.2s ease 0s !important;
    bottom: 0;
    right: 0;
    

    @media (max-width: ${props => props.theme.breakpoints[3]}) {
      font-size: ${props => props.theme.fontSizes[2]};
      padding: ${props => props.theme.space[5]};
    }
  }
  &:hover {
    > div img {
      // display:none;
      
      
      

      
    }
    > div {
      position: absolute;
      top: -2%;
      bottom: 0;
      left: 0;
      right: 0;
      box-shadow: 0.6rem 0.8rem #4ad7d1;
      
      opacity: 0.9;
      transition: .4s ease;
      background: #FE4A49;
      // margin: 1em 1em 0em 1em;
      // box-shadow: 5px 0px 42px #00173005;
    }
    > span {
      opacity:1;
      color: #4ad7d1;
  position: absolute;
  top: 60%;
  left: 0%;
  width: 94%;
  height: 31.5%;
  -webkit-transform: translate(0%, 0%);
  -ms-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  text-align: left;
  font-size: ${props => props.theme.fontSizes[2]}; 
  padding: ${props => props.theme.space[0]};
  padding-top:6%;
  padding-left:6%;
  background: #001730;
  transition: 0.2s ease 0s !important;
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    font-size: ${props => props.theme.fontSizes[0]};
    padding: ${props => props.theme.space[5]};

    }
  }
`

export default GridItem
