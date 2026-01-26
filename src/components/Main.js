import Aboutme from './Aboutme'
import Experience from './Experience'
import Landing from './Landing'
import Skills from './Skills'
import Projects from './Projects'
import Design from './Design'
import Footer from './Footer'
import Testimonial from './Testimonial'

const Main = () => {
  return (
    <main>
      <Landing/>
      <Aboutme />
      <Testimonial />
      <Experience/>
      <Skills/>
      <Projects/>
      <Design/>
      <Footer/>
    </main>
  )
}

export default Main