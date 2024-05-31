import React from 'react';
import { html } from 'js-beautify';
import { renderWithProviders } from 'common/utils/ut';
import Ad from './Ad';

jest.mock('common/hooks/useActivePage', () => jest.fn());

class Im {
  static addService = () => {
    return this;
  };

  static setTargeting = () => {
    return this;
  };

  static setCollapseEmptyDiv = () => {
    return this;
  };

  static addSize = (device, size) => {
    googletag.slot.size = { device, size };
    return this;
  };

  static build = () => {
    return this;
  };

  static defineSizeMapping = () => {
    return this;
  };

  static disableInitialLoad = () => {
    return this;
  };

  static enableSingleRequest = () => {
    return this;
  };

  static enableLazyLoad = () => {
    return this;
  };

  static refresh = () => {
    return this;
  };
}
googletag.cmd.push = (method) => {
  method();
};
googletag.defineSlot = (adUnit, defaultRequestSize, position) => {
  googletag.slot = {
    adUnit, defaultRequestSize, position, size: '',
  };
  return Im;
};
googletag.defineOutOfPageSlot = (adUnit, defaultRequestSize, position) => {
  googletag.slot = {
    adUnit, defaultRequestSize, position, size: '',
  };
  return Im;
};

googletag.enableServices = () => {
  return Im;
};

googletag.pubads = () => {
  return Im;
};

googletag.sizeMapping = () => {
  return Im;
};

googletag.display = () => {
  return Im;
};

googletag.slot = {};

global.pbjs = {
  que: [],
};

pbjs.que.push = (method) => {
  method();
};
pbjs.aliasBidder = () => {

};

describe('<Ad />', () => {
  it('should render the ad with correct attr when set id and position', () => {
    const { container } = renderWithProviders(<Ad id='lead2' position="lead2" />, {
      preloadedState: {
        ad: { pageUnit: 'test' },
      },
    });
    expect(googletag.slot).toEqual({
      adUnit: '/21719121593/ACT/test',
      defaultRequestSize: '330x250',
      position: 'lead2',
      size: {
        device: [ 1024, 0 ],
        size: [
          [ 728, 90 ],
          [ 970, 90 ],
        ],
      },
    });
    expect(html(container.outerHTML)).toMatchSnapshot();
  });

  it('should render the ad with correct attr when is oop ad', () => {
    const { container } = renderWithProviders(<Ad isOOP id='OOP1' position="OOP1" />, {
      preloadedState: {
        ad: { pageUnit: 'test' },
      },
    });
    expect(googletag.slot).toEqual({
      adUnit: '/21719121593/ACT/test',
      defaultRequestSize: 'OOP1',
      size: '',
    });
    expect(html(container.outerHTML)).toMatchSnapshot();
  });
});