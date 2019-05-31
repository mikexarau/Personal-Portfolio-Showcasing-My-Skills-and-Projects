import styled from 'styled-components'
import { Link } from 'gatsby'

const GridItem = styled(Link)`
  position: relative;
  > div {
    // position: absolute !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: -1.3%;
  }
  > div img {
    transition: 0.2s ease 0s !important;
    margin: 3%;
    display:block;
    width: 100%;
    height: auto;
  }
  > span {
    z-index: 10;
    color: white;
    position: absolute;   
    text-align: center;
    // background: rgba(0,0,0,0.5);
    font-weight: 700;
    font-size: ${props => props.theme.fontSizes[0.5]};
    padding: ${props => props.theme.space[3]};
    opacity:0;
    

    @media (max-width: ${props => props.theme.breakpoints[3]}) {
      font-size: ${props => props.theme.fontSizes[2]};
      padding: ${props => props.theme.space[5]};
    }
  }
  &:hover {
    > div img {
      display:none;
      transform: translate(0%,0%);

      
    }
    > div {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0.5%;
      right: 0;
      
      opacity: 0.9;
      transition: .4s ease;
      background: linear-gradient(to right top, #3fd5e0, #2ba9b7, #1a7f8e, #0a5765, #00333e);
      margin: 1em 1em 0em 1em;
    }
    > span {
      opacity:1;
      color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  // font-size: ${props => props.theme.fontSizes[0.5]}; 
  // padding: ${props => props.theme.space[3]};

    }
  }
`

export default GridItem
