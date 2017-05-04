import { AppUdemyPage } from './app.po';

describe('app-udemy App', () => {
  let page: AppUdemyPage;

  beforeEach(() => {
    page = new AppUdemyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
