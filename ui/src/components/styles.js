import { injectGlobal } from 'styled-components';

injectGlobal`
:root {
  --greyBlue: #718a99;
  --darkBlue: #3f51b5;
  --transparentDarkBlue: rgba(63, 81, 181, 0.57);
  --lightBlue: #c6dcf9;
  --paleBlue: #eff5fe;
  --black: #333;
  --white: #fdfdfd;
  --lightGrey: #ecf0f1;
  --shadow: rgba(209, 209, 209, 0.5);
  --gradientGold: #ffd26f;
  --gradientBlue: #3677ff;
  --paleGreen: rgb(164, 196, 131);
  --paleRed: rgb(200, 110, 115);
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  color: var(--black);
  background: var(--white);
}

/* Hack for the loader - Compiled LESS to be abstracted in a React component */

.loading-spinner {
  display: inline-block;
  position: relative;
  vertical-align: top;
}
.loading-spinner .spinner-ticks {
  position: relative;
  height: 32px;
  width: 32px;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(1) {
  transform: rotate(22.5deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(1):before {
  animation-delay: 0ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(2) {
  transform: rotate(45deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(2):before {
  animation-delay: -100ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(3) {
  transform: rotate(67.5deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(3):before {
  animation-delay: -200ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(4) {
  transform: rotate(90deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(4):before {
  animation-delay: -300ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(5) {
  transform: rotate(112.5deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(5):before {
  animation-delay: -400ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(6) {
  transform: rotate(135deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(6):before {
  animation-delay: -500ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(7) {
  transform: rotate(157.5deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(7):before {
  animation-delay: -600ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(8) {
  transform: rotate(180deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(8):before {
  animation-delay: -700ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(9) {
  transform: rotate(202.5deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(9):before {
  animation-delay: -800ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(10) {
  transform: rotate(225deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(10):before {
  animation-delay: -900ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(11) {
  transform: rotate(247.5deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(11):before {
  animation-delay: -1000ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(12) {
  transform: rotate(270deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(12):before {
  animation-delay: -1100ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(13) {
  transform: rotate(292.5deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(13):before {
  animation-delay: -1200ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(14) {
  transform: rotate(315deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(14):before {
  animation-delay: -1300ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(15) {
  transform: rotate(337.5deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(15):before {
  animation-delay: -1400ms;
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(16) {
  transform: rotate(360deg);
}
.loading-spinner .spinner-ticks .spinner-tick:nth-child(16):before {
  animation-delay: -1500ms;
}
.loading-spinner .spinner-ticks .spinner-tick {
  position: absolute;
  top: auto;
  right: 50%;
  bottom: auto;
  left: auto;
  width: 1px;
  height: 100%;
  transform-origin: center;
}
.loading-spinner .spinner-ticks .spinner-tick:before,
.loading-spinner .spinner-ticks .spinner-tick:after {
  position: absolute;
  top: 0;
  right: auto;
  bottom: auto;
  left: auto;
  width: 1px;
  height: 4px;
  content: '';
  display: block;
  background: rgba(255, 255, 255, 0.2);
}
.loading-spinner .spinner-ticks .spinner-tick:before {
  animation: glow-loading 1600ms infinite linear;
  opacity: 1;
  z-index: 1;
  background: var(--darkBlue);
}
.loading-spinner .spinner-wheel {
  animation: spin 1600ms infinite linear;
  position: absolute;
  top: 50%;
  right: 50%;
  bottom: auto;
  left: auto;
  width: auto;
  height: auto;
  z-index: 1;
  margin-top: -10px;
  margin-right: -10px;
  height: 20px;
  width: 20px;
  border: 1px solid transparent;
  border-top: 1px solid var(--darkBlue);
  border-right: 1px solid var(--darkBlue);
  border-radius: 3em;
}
.loading-spinner.secondary .spinner-tick:after {
  background: rgba(204, 204, 204, 0.2);
}
.loading-spinner.secondary .spinner-tick:before {
  background: #999;
}
.loading-spinner.secondary .spinner-wheel {
  border-top-color: #999;
  border-right-color: #999;
}
.loading-spinner.medium .spinner-ticks {
  height: 48px;
  width: 48px;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(1) {
  transform: rotate(15deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(1):before {
  animation-delay: 0ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(2) {
  transform: rotate(30deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(2):before {
  animation-delay: -66.66666667ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(3) {
  transform: rotate(45deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(3):before {
  animation-delay: -133.33333333ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(4) {
  transform: rotate(60deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(4):before {
  animation-delay: -200ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(5) {
  transform: rotate(75deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(5):before {
  animation-delay: -266.66666667ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(6) {
  transform: rotate(90deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(6):before {
  animation-delay: -333.33333333ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(7) {
  transform: rotate(105deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(7):before {
  animation-delay: -400ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(8) {
  transform: rotate(120deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(8):before {
  animation-delay: -466.66666667ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(9) {
  transform: rotate(135deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(9):before {
  animation-delay: -533.33333333ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(10) {
  transform: rotate(150deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(10):before {
  animation-delay: -600ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(11) {
  transform: rotate(165deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(11):before {
  animation-delay: -666.66666667ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(12) {
  transform: rotate(180deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(12):before {
  animation-delay: -733.33333333ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(13) {
  transform: rotate(195deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(13):before {
  animation-delay: -800ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(14) {
  transform: rotate(210deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(14):before {
  animation-delay: -866.66666667ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(15) {
  transform: rotate(225deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(15):before {
  animation-delay: -933.33333333ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(16) {
  transform: rotate(240deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(16):before {
  animation-delay: -1000ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(17) {
  transform: rotate(255deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(17):before {
  animation-delay: -1066.66666667ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(18) {
  transform: rotate(270deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(18):before {
  animation-delay: -1133.33333333ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(19) {
  transform: rotate(285deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(19):before {
  animation-delay: -1200ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(20) {
  transform: rotate(300deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(20):before {
  animation-delay: -1266.66666667ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(21) {
  transform: rotate(315deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(21):before {
  animation-delay: -1333.33333333ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(22) {
  transform: rotate(330deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(22):before {
  animation-delay: -1400ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(23) {
  transform: rotate(345deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(23):before {
  animation-delay: -1466.66666667ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(24) {
  transform: rotate(360deg);
}
.loading-spinner.medium .spinner-ticks .spinner-tick:nth-child(24):before {
  animation-delay: -1533.33333333ms;
}
.loading-spinner.medium .spinner-ticks .spinner-tick:before,
.loading-spinner.medium .spinner-ticks .spinner-tick:after {
  height: 4px;
}
.loading-spinner.medium .spinner-wheel {
  margin-top: -17px;
  margin-right: -17px;
  height: 34px;
  width: 34px;
}
.loading-spinner.large .spinner-ticks {
  height: 80px;
  width: 80px;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(1) {
  transform: rotate(11.25deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(1):before {
  animation-delay: 0ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(2) {
  transform: rotate(22.5deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(2):before {
  animation-delay: -50ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(3) {
  transform: rotate(33.75deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(3):before {
  animation-delay: -100ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(4) {
  transform: rotate(45deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(4):before {
  animation-delay: -150ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(5) {
  transform: rotate(56.25deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(5):before {
  animation-delay: -200ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(6) {
  transform: rotate(67.5deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(6):before {
  animation-delay: -250ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(7) {
  transform: rotate(78.75deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(7):before {
  animation-delay: -300ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(8) {
  transform: rotate(90deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(8):before {
  animation-delay: -350ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(9) {
  transform: rotate(101.25deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(9):before {
  animation-delay: -400ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(10) {
  transform: rotate(112.5deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(10):before {
  animation-delay: -450ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(11) {
  transform: rotate(123.75deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(11):before {
  animation-delay: -500ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(12) {
  transform: rotate(135deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(12):before {
  animation-delay: -550ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(13) {
  transform: rotate(146.25deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(13):before {
  animation-delay: -600ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(14) {
  transform: rotate(157.5deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(14):before {
  animation-delay: -650ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(15) {
  transform: rotate(168.75deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(15):before {
  animation-delay: -700ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(16) {
  transform: rotate(180deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(16):before {
  animation-delay: -750ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(17) {
  transform: rotate(191.25deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(17):before {
  animation-delay: -800ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(18) {
  transform: rotate(202.5deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(18):before {
  animation-delay: -850ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(19) {
  transform: rotate(213.75deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(19):before {
  animation-delay: -900ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(20) {
  transform: rotate(225deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(20):before {
  animation-delay: -950ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(21) {
  transform: rotate(236.25deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(21):before {
  animation-delay: -1000ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(22) {
  transform: rotate(247.5deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(22):before {
  animation-delay: -1050ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(23) {
  transform: rotate(258.75deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(23):before {
  animation-delay: -1100ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(24) {
  transform: rotate(270deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(24):before {
  animation-delay: -1150ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(25) {
  transform: rotate(281.25deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(25):before {
  animation-delay: -1200ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(26) {
  transform: rotate(292.5deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(26):before {
  animation-delay: -1250ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(27) {
  transform: rotate(303.75deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(27):before {
  animation-delay: -1300ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(28) {
  transform: rotate(315deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(28):before {
  animation-delay: -1350ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(29) {
  transform: rotate(326.25deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(29):before {
  animation-delay: -1400ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(30) {
  transform: rotate(337.5deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(30):before {
  animation-delay: -1450ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(31) {
  transform: rotate(348.75deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(31):before {
  animation-delay: -1500ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(32) {
  transform: rotate(360deg);
}
.loading-spinner.large .spinner-ticks .spinner-tick:nth-child(32):before {
  animation-delay: -1550ms;
}
.loading-spinner.large .spinner-ticks .spinner-tick:before,
.loading-spinner.large .spinner-ticks .spinner-tick:after {
  height: 6px;
}
.loading-spinner.large .spinner-wheel {
  margin-top: -31px;
  margin-right: -31px;
  height: 62px;
  width: 62px;
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
    -moz-transform: rotate(359deg);
    -o-transform: rotate(359deg);
    -ms-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
    -moz-transform: rotate(359deg);
    -o-transform: rotate(359deg);
    -ms-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
@-webkit-keyframes glow-loading {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes glow-loading {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
`;
