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

      html,
      #root {
        height: 100%;
      }
    `}
  />
);

export default GlobalStyle;
