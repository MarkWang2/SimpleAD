import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import slotsConfig from 'common/components/Ad/slotsConfig';
import AdsConfigTable from './AdsConfigTable';

global.ACTIVE = {
  ad: {
    slotsConfig: [ ...slotsConfig ],
  },
};
describe('AdsConfigTable component', () => {
  it('renders table with correct headers and default radio option', () => {
    const { getByText, getByLabelText } = render(<AdsConfigTable />);
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Mobile')).toBeInTheDocument();
    expect(getByText('Tablet')).toBeInTheDocument();
    expect(getByText('Desktop')).toBeInTheDocument();
    expect(getByText('Position')).toBeInTheDocument();
    expect(getByText('RefreshInterval')).toBeInTheDocument();
    const oldPagesRadio = getByLabelText('Old Pages');
    const newPagesRadio = getByLabelText('New Pages');
    expect(oldPagesRadio).toBeInTheDocument();
    expect(newPagesRadio).toBeInTheDocument();
    expect(oldPagesRadio).toBeChecked();
    expect(newPagesRadio).not.toBeChecked();
  });

  it('updates table content when radio option is changed', () => {
    const { getByLabelText } = render(<AdsConfigTable />);
    fireEvent.click(getByLabelText('New Pages'));
    const oldPagesRadio = getByLabelText('Old Pages');
    const newPagesRadio = getByLabelText('New Pages');
    expect(oldPagesRadio).toBeInTheDocument();
    expect(newPagesRadio).toBeInTheDocument();
    expect(oldPagesRadio).not.toBeChecked();
    expect(newPagesRadio).toBeChecked();
  });
});
