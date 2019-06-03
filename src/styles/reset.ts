import { css } from 'styled-components'

const reset = css`


#gatsby-plugin-page-progress {
  width: 45%;
    position: fixed;
    height: 6px;
    background-color: rgba(154, 154, 154, 0.5);
    top: 0;
    left: 0;
    transition: width 0.25s;
}

#___gatsby > div > div > main > div.elements__Box-cOJFaO.project__Content-kNqxAg.kCtjnT > div {
  grid-gap: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: transparent;
  grid-row-gap: inherit;
}
#___gatsby > div > div > main > div.elements__Box-sc-1dburgb-0.project__Content-sc-46qbt-1.kgdAvm > div {
  grid-gap: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: transparent;
  grid-row-gap: inherit;
}



#___gatsby > div > div > main > div > a > span:nth-child(3) {
 
  font-size: 18px;
  text-align:left;
  color: white;
  position: absolute;
  bottom: 0%;
  top:73%;
  width: 94%;
  padding-left:6%;
  -webkit-transform: translate(0%, 0%);
  -ms-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  font-size: ${props => props.theme.fontSizes[0.5]}; 
 background:transparent;
  
  z-index:99;
  @media (max-width: ${props => props.theme.breakpoints[3]}) {
    font-size: ${props => props.theme.fontSizes[0]};
    
  }
}
a.svg {
  border-radius: 0 !important;

}
.social-container {
  margin:5px;

}
svg.social-svg , .social-icon {
  border-radius: 0 !important;
  margin:-1px;

}
a.social-icon {
  border-radius: 0 !important;

}
g.social-svg-mask:hover{
 
  fill:#fe4a49 !important;
}
g.social-svg-mask {
  fill: #e5e7e9 !important;
  box-shadow: 5rem 0rem 5rem red !important; 

}
g.social-svg-icon.path {
  
}

  button,
  input,;
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    margin: 0;
  }
  button,
  input {
    overflow: visible;
  }
  button,
  select {
    text-transform: none;
  }
  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }
  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }
  progress {
    vertical-align: baseline;
  }
  textarea {
    overflow: auto;
  }
  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }
  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }
  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }
  a {
    background-color: transparent;
  }
  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }
  b,
  strong {
    font-weight: bolder;
  }
  code,
  kbd,
  samp {
    font-family: monospace, monospace;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  figure {
    margin: 0 0 1rem 0;
  }
  img {
    vertical-align: middle;
    border-style: none;
  }
  [role='button'] {
    cursor: pointer;
  }
  a,
  area,
  button,
  [role='button'],
  input,
  label,
  select,
  summary,
  textarea {
    touch-action: manipulation;
  }
`

export default reset
