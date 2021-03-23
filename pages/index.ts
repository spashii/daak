export interface IPage {
  templatePath: string;
  htmlPath: string;
  getData: () => {
    meta: {
      title: string;
      description?: string;
    };
  };
}

import home from './home';
export default [home];
