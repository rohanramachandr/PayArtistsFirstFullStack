import React, { useState } from 'react';
import Video from '../../videos/synthCity2.mov';
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight } from './HeroElements';
import { Button } from '../ButtonElements';

const HeroSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);

  };

  return (
    <HeroContainer id='home'>
        <HeroBg>
            <VideoBg autoPlay loop muted src={Video} type='video/mp4' />


        </HeroBg>
        <HeroContent>
            <HeroH1>Empowering Artists Across The Globe</HeroH1>
            <HeroP>
                Sign up for a new account today and recieve your first upload free
            </HeroP>
            <HeroBtnWrapper>
              <Button to="signup" onMouseEnter={onHover} onMouseLeave={onHover} primary="true" dark="true"   smooth={true} duration={500} spy={true} exact='true' offset={-80}>
                Get started {hover ? <ArrowForward /> : <ArrowRight />}
              </Button>
            </HeroBtnWrapper>
        </HeroContent>

      
    </HeroContainer>
  )
}

export default HeroSection
