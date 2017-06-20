import { IconChooserPage } from './app.po';

describe('icon-chooser App', () => {
  let page: IconChooserPage;

  beforeEach(() => {
    page = new IconChooserPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
