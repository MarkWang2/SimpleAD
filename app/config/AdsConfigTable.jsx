import React, { useState } from 'react';
import Table from '@active/react-ui/Table';
import TableHeader from '@active/react-ui/TableHeader';
import TableRow from '@active/react-ui/TableRow';
import TableHeaderCell from '@active/react-ui/TableHeaderCell';
import TableCell from '@active/react-ui/TableCell';
import slotsConfig from 'common/components/Ad/slotsConfig';
import '@active/react-ui/css/react-ui.css';
import Radio from '@active/react-ui/Radio';
import RadioGroup from '@active/react-ui/RadioGroup';

const tableBody = () => {
  const [ value, setValue ] = useState('a3');
  return (
    <tbody>
      <RadioGroup value={value} onChange={e => setValue(e.target.value)} name="usage-sm" horizontal
                defaultValue="a3">
        <Radio size="sm" value="a3">Old Pages</Radio>
        <Radio size="sm" value="a4">New Pages</Radio>
      </RadioGroup>

      { (value === 'a3' ? ACTIVE.ad.slotsConfig : slotsConfig).map((slot) => {
        return (<TableRow>
          <TableCell>{slot.id}</TableCell>
          {slot.sizes.map((deviceSizes) => {
            const deviceSizesTxt = deviceSizes.map((size) => {
              let sizeTxt = 'fluid';
              if (size !== 'fluid') {
                sizeTxt = size.join('x');
              }
              return sizeTxt;
            });

            return <TableCell>{deviceSizesTxt.join(' ,')}</TableCell>;
          })}
          <TableCell>{slot.position}</TableCell>
          <TableCell>{slot.refreshInterval}</TableCell>
        </TableRow>);
      })}
    </tbody>
  );
};

const AdsConfigTable = () => {
  return (
    <div>
      <Table striped>
        <colgroup>
          <col style={{ width: '20%' }}/>
          <col style={{ width: '20%' }}/>
          <col style={{ width: '20%' }}/>
          <col style={{ width: '20%' }}/>
          <col style={{ width: '20%' }}/>
          <col style={{ width: '20%' }}/>
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Mobile</TableHeaderCell>
            <TableHeaderCell>Tablet</TableHeaderCell>
            <TableHeaderCell>Desktop</TableHeaderCell>
            <TableHeaderCell>Position</TableHeaderCell>
            <TableHeaderCell>RefreshInterval</TableHeaderCell>
          </TableRow>
        </TableHeader>
        {tableBody()}
      </Table>
    </div>
  );
};

export default AdsConfigTable;
