import { IPage } from '.';
import { getHtmlPath, getTemplatePath } from '../src';

const page: IPage = {
  templatePath: getTemplatePath('home.ejs'),
  htmlPath: getHtmlPath('index.html'),
  getData: () => ({
    meta: {
      title: 'Home',
    },
    text: 'helo',
  }),
};

export default page;
