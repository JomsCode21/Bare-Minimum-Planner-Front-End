import logo from '../assets/Logo+tagline.png';
import LandingPageButton from '@/components/Buttons';

function LandingPage() {
  return (
    <div className='bg-[#4A90E2] h-screen flex flex-col items-center justify-center'>
      <img src= {logo} alt="Bare Minimum Planner Logo" className=''/>

      <LandingPageButton />
    </div>

  )
}

export default LandingPage
