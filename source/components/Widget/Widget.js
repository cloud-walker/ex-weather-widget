import React from 'react'
import styled from 'styled-components'
import {Toggle} from 'react-powerplug'

// box-shadow: rgba(0, 0, 0, 0.3) 0 5px 30px;
const WidgetWrapper = styled.main`
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
  height: 300px;
`

const WidgetBack = styled.div`
  transform: rotateY(180deg);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const WidgetMap = styled.iframe`
  width: 100%;
  height: 100%;
`

export class Widget extends React.Component {
  render() {
    return (
      <Toggle initial={true}>
        {({on, toggle}) => (
          <WidgetWrapper flipped={on} onClick={toggle}>
            <WidgetFront>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id autem
              tenetur, iure iusto molestiae magnam quae, illum saepe iste dicta,
              est enim quam perspiciatis vel tempora! Molestias aspernatur
              quisquam et!
            </WidgetFront>
            <WidgetBack>
              <WidgetMap
                frameBorder="0"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB7l8eS5GhYmJcU7_o2KQwP0cpiXwvtUy4&q=Space+Needle,Seattle+WA"
              />
            </WidgetBack>
          </WidgetWrapper>
        )}
      </Toggle>
    )
  }
}
