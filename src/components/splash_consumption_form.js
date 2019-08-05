import styled from 'styled-components'
import defaultImg from '../images/breakfast.jpg'

const SplashConsumptionDiv = styled.div`
background-image: url(${defaultImg});
min-height: 100vh;
background-size: cover;
background-position: center;
z-index: -1;
overflow: hidden;
`

export default SplashConsumptionDiv