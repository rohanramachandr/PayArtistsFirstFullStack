import React from 'react';
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormButton,
  SpotifyIcon
} from './SigninElements';

import spotify from '../../images/Spotify_Icon_RGB_Green.png'

const SignIn = () => {
  return (
    <>
      <Container>
        <FormWrap>
          <Icon to='/'>ReleaseRadar</Icon>
          <FormContent>
            <Form>
              <FormH1>Sign in to your account</FormH1>

              <SpotifyIcon src={spotify}></SpotifyIcon>
         
             
              <FormButton href="/auth/spotify" primary="true" dark="true">Continue With Spotify</FormButton>
              
              
              {/* <a href="/auth/spotify">Sign In With Spotify</a> */}

            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
