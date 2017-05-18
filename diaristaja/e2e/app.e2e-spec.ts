import { DiaristajaPage } from './app.po';

describe('diaristaja App', () => {
  let page: DiaristajaPage;

  beforeEach(() => {
    page = new DiaristajaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
