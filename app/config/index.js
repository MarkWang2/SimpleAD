import React from 'react';
import RootLayout from 'app/RootLayout';
import AdsConfigTable from './AdsConfigTable';
import './index.scss'

const Page = (props) => {
  return (
    <RootLayout { ...props } >
      <AdsConfigTable />
    </RootLayout>
  );
};

export default (props, railsContext) => () => Page({ ...props, railsContext });
