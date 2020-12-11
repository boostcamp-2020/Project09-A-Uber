import React from 'react';
import { Global, css } from '@emotion/core';
import reset from 'emotion-reset';

const GlobalStyle = () => (
  <Global
    styles={css`
      ${reset}

      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

      * {
        box-sizing: border-box;
      }

      body {
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 14px;
        height: 100%;
      }

      html {
        height: 100%;
      }

      #root-wrapper {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #root {
        width: 100%;
        height: 100%;
        max-width: 375px;
        max-height: 812px;
        border: 1px solid black;
      }
    `}
  />
);

export default GlobalStyle;
