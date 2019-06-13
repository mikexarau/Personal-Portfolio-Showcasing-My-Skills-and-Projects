import { css } from 'styled-components'

const reset = css`

// #___gatsby > div > div > main > div > a:nth-child(1) > span:nth-child(4) {
//   left: 75%;
//   width: 19%;
//   background: #ff0000c2;
//   color: white;
//   display: inline-flex;
// }
nav {
  margin-top: 5%;
}

a.navlink.navlink {
    margin-left: -24px;
    line-height: 2.5rem;
    width: 100px;
    height: 50px;
    text-align: center;
  // background: #feffff4f;
    margin-right: 30px;
}
a.navlink-active.navlink {
  margin-left: -24px;
  line-height: 2.5rem;
  width: 100px;
  height: 50px;
  text-align: center;
  background: #feffff4f;
  margin-right: 30px;
}
a.navlink.navlink:hover{
  background: #fe4a496b;
 
}
a.navlink.navlink svg {
  font-size: 1.4rem;
  vertical-align: -webkit-baseline-middle;
}
a.navlink.navlink svg:hover {
  font-size: 1.5rem;

}
@media (max-width: 1000px){
  a.navlink-active.navlink {
    width: 50px;
    height: 50px;
}
#___gatsby > div > div > aside > div {
  margin: -1.5rem;
}
#___gatsby > div > div > aside > div > div {
  width: 4.4rem;
  margin-left: 0.5rem;
  margin-top: 0.2rem;
}
a.navlink.navlink {
 margin-left: 0;
 margin-right: 0;
}

} 
@media (max-width: 650px){
  a.navlink-active.navlink {
    width: 50px;
    height: 50px;
}
#___gatsby > div > div > aside > div {
  margin: -1rem;
}
#___gatsby > div > div > aside > div > div {
  width: 4.4rem;
  margin-left: 0.5rem;
  margin-top: 0.2rem;
}

}   


#___gatsby > div > div > aside > div > nav > a:nth-child(1) > svg:nth-child(2) {
  display: none;
}
#___gatsby > div > div > aside > div > nav > a:nth-child(2) > svg:nth-child(1) {
  display: none;
}
#___gatsby > div > div > aside > div > nav > a.navlink-active.navlink > svg:nth-child(2) {
  // display: none;
}

.fromdate {
    background: #fe4a49e0;
    color: white;
    text-align: center;
    right: 0;
    position: absolute;
    padding: 7px;
 

}
.card {
  position: relative;
    bottom: 0;
    
    background: white;
    z-index: 99;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}
.card-header {
  // padding: 30px 15px 20px 15px;
  background:#e5e7e961;
  padding: 10%;
}
.card-header:hover {
  background:#e5e7e961;
}
.card:hover {
  
}

.card p {
  font-size: 16px;
  // margin-top: 6px;
  // color: #001730;
  margin-top: 10px;
  line-height: 1.3em;
}
.card h5 {
  margin:0px;
  color:#4ad7d1;
}
.card-footer {
  color: #5e6c7c;
  width: 100%;
  height: 50px;
  border-top: 1px solid #e5e7e9;
  box-sizing: border-box;
  padding: 1rem;
  background: #e5e7e9bd !important;
}
.card-footer > p {
  margin-top: -3px;
}
.icon {

}

#___gatsby > div > div > main > div > a > div > picture > img {
  object-fit: inherit !important;
}

div#gatsby-plugin-page-progress {
  background-color: rgb(0, 12, 26, 0.5) !important;
  // height:6px;
}

// a.grid-item__GridItem-dkpsJX.klpgVK {
//   box-shadow: 0.1rem 0.3rem 1rem #00173033;
// }

#___gatsby > div > div > main > div > a:nth-child(5) > div > picture {
  width: 150%;
}

// #___gatsby > div > div > main > div > a:nth-child(5) > div {
//   padding-bottom: 15.2219%;
// }


// div#gatsby-plugin-page-progress {
//   background-color: rgba(154, 154, 154, 1) !important;
//   height:10px !important;
// }
#___gatsby > div > div > main > div.elements__Box-cOJFaO.project__Content-kNqxAg.kxrPHc > div {
  grid-gap: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: transparent;
  grid-row-gap: inherit;
  @media screen and (max-width: 650px) {
    grid-template-columns: 1fr;
  }
} 

#___gatsby > div > div > main > div.elements__Box-cOJFaO.project__Content-kNqxAg.hjmco > div > div:nth-child(1) {
  height: 36%;
}
#___gatsby > div > div > main > div.elements__Box-cOJFaO.project__Content-kNqxAg.cnaxfk > div > div:nth-child(1) {
  height: 36%;
}
#___gatsby > div > div > main > div.elements__Box-cOJFaO.project__Content-kNqxAg.cnaxfk > div {
  grid-gap: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: transparent;
  grid-row-gap: inherit;
  @media screen and (max-width: 650px) {
    grid-template-columns: 1fr;
  }
}
#___gatsby > div > div > main > div.elements__Box-cOJFaO.project__Content-kNqxAg.hjmco > div {
  grid-gap: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: transparent;
  grid-row-gap: inherit;
  @media screen and (max-width: 650px) {
    grid-template-columns: 1fr;
  }
}
#___gatsby > div > div > main > div.elements__Box-sc-1dburgb-0.project__Content-sc-46qbt-1.ekNVpF > div{
  grid-gap: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: transparent;
  grid-row-gap: inherit;
  @media screen and (max-width: 650px) {
    grid-template-columns: 1fr;
  }
}
#___gatsby > div > div > main > div.elements__Box-sc-1dburgb-0.project__Content-sc-46qbt-1.kIsAuw > div{
  grid-gap: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: transparent;
  grid-row-gap: inherit;
  @media screen and (max-width: 650px) {
    grid-template-columns: 1fr;
  }
}

#___gatsby > div > div > main > div.elements__Box-cOJFaO.project__Content-kNqxAg.BRdya > div {
  grid-gap: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: transparent;
  grid-row-gap: inherit;
  @media screen and (max-width: 650px) {
    grid-template-columns: 1fr;
  }
}

#___gatsby > div > div > main > div.elements__Box-cOJFaO.project__Content-kNqxAg.kCtjnT > div {
  grid-gap: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: transparent;
  grid-row-gap: inherit;
  @media screen and (max-width: 650px) {
    grid-template-columns: 1fr;
  }
}
#___gatsby > div > div > main > div.elements__Box-sc-1dburgb-0.project__Content-sc-46qbt-1.kgdAvm > div {
  grid-gap: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: transparent;
  grid-row-gap: inherit;
  @media screen and (max-width: 650px) {
    grid-template-columns: 1fr;
  }
}



#___gatsby > div > div > main > div > a > span:nth-child(3) {
 
  font-size: 18px;
  text-align:left;
  color: white;
  position: absolute;
  bottom: 0%;
  top:73%;
  width: 91.3%;
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
  // margin:5px;
  background: #e5e7e9;

}
svg.social-svg , .social-icon {
  border-radius: 0 !important;
  // margin:-1px;

}
a.social-icon {
  border-radius: 0 !important;

}
g.social-svg-mask:hover{
 
  fill: #fe4a49 !important;
}
g.social-svg-mask {
  // fill: #7f8b97 !important; 

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
