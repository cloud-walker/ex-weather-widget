import React from 'react'
import styled, {injectGlobal} from 'styled-components'
import {Toggle} from 'react-powerplug'

injectGlobal`
  body {
    margin: 0;
    background-color: rgb(78, 88, 95);
  }

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
`

// border-radius: 0.5rem;
// overflow: hidden;
const WidgetWrapper = styled.main`
  box-shadow: rgba(0, 0, 0, 0.3) 0 5px 30px;
  position: relative;
  width: 30vw;
  perspective: 1000px;
  transform-style: preserve-3d;
  transform: ${p => (p.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  transition: 0.3s transform;

  & > * {
    backface-visibility: hidden;
  }
`

const WidgetFront = styled.div`
  background: red;
  position: relative;
`

const WidgetBack = styled.div`
  background: green;
  transform: rotateY(180deg);
  position: absolute;
  top: 0;
  left: 0;
`

const FrontContent = styled.div`
  background: rgb(241, 248, 249);
`

const FrontFooter = styled.footer`
  background: rgb(45, 50, 52);
`

class Root extends React.Component {
  render() {
    return (
      <Toggle initial={false}>
        {({on, toggle}) => (
          <WidgetWrapper onClick={toggle} flipped={on}>
            <WidgetFront>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo
              fugit voluptas a earum doloremque, expedita praesentium distinctio
              delectus aspernatur natus nihil, quasi iste, libero quos eaque.
              Porro corrupti, beatae non.
            </WidgetFront>
            <WidgetBack>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Temporibus aliquid nihil voluptates repudiandae nulla, rerum, in
              maxime reprehenderit. Corporis animi, laboriosam vel ipsum libero!
              Repudiandae quibusdam delectus voluptatum itaque sed.
            </WidgetBack>
          </WidgetWrapper>
        )}
      </Toggle>
    )
  }
}

export default Root
