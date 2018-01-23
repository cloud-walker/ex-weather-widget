import React from 'react'
import styled, {injectGlobal} from 'styled-components'

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

const WidgetWrapper = styled.main`
  background: white;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0 5px 30px;
  transform-style: preserve-3d;
  overflow: hidden;
  perspective: 1000px;
  width: 400px;
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
      <WidgetWrapper>
        <FrontContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
          dolorem aspernatur cum, doloremque commodi sit, accusantium
          praesentium quisquam neque voluptatem, delectus aut architecto
          provident distinctio sunt. Blanditiis vitae corporis omnis.
        </FrontContent>
        <FrontFooter>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim et
          laudantium, tenetur temporibus magnam laborum illum odit vero quod
          quam non eveniet, nemo aliquid pariatur culpa, alias rerum repellendus
          exercitationem?
        </FrontFooter>
      </WidgetWrapper>
    )
  }
}

export default Root
