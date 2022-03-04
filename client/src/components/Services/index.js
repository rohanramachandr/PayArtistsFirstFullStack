import React from 'react';
import Icon1 from '../../images/svg-freedom.svg';
import Icon2 from '../../images/svg-control.svg';
import Icon3 from '../../images/svg-security.svg';
import {ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP} from './ServicesElements';

const Services = () => {

  return (
    <>
      <ServicesContainer id="services">
          <ServicesH1>Our Services</ServicesH1>
          <ServicesWrapper>
              <ServicesCard>
                  <ServicesIcon src={Icon1}/>
                  <ServicesH2>Complete Freedom</ServicesH2>
                  <ServicesP>Set your price for your music</ServicesP>
              </ServicesCard>
              <ServicesCard>
                  <ServicesIcon src={Icon2}/>
                  <ServicesH2>Full Control</ServicesH2>
                  <ServicesP>Withdraw your music and earnings at any time</ServicesP>
              </ServicesCard>
              <ServicesCard>
                  <ServicesIcon src={Icon3}/>
                  <ServicesH2>Security</ServicesH2>
                  <ServicesP>Protect your music from copyright</ServicesP>
              </ServicesCard>
          </ServicesWrapper>
      </ServicesContainer>
    </>
  )
}

export default Services
