import React from 'react';
import {Global, css} from '@emotion/react'

const GlobalStyle = () => {
    return (
        <Global
            styles={css`
              ::-webkit-scrollbar {
                width: 5px;
              }

              ::-webkit-scrollbar-track {
                background: #c2c2c2;
              }

              ::-webkit-scrollbar-thumb {
                background: #8484b0;
              }

              ::-webkit-scrollbar-thumb:hover {
                background: #0000c0;
              }
              
              input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
                transition-delay: 3600s;
              }

              .MuiListItemSecondaryAction-root {
                top: 2px !important;
                right: 42px!important;
              }

              .list-item-checkbox {
                position: absolute!important;
                z-index: 2;
                bottom: 4px;
                right: 14px;
              }
              
              .MuiListItem-root {
                cursor: pointer;
              }
              
              
              label {
                display: flex;
                font-size: 12px;
                font-weight: 600;
                margin-bottom: 3px;
                padding-left: 4px;
                opacity: .8;
                
              }
            `}
        />
    );
};

export default GlobalStyle;