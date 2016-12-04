import { RssmeClientPage } from './app.po';

describe('rssme-client App', function() {
  let page: RssmeClientPage;

  beforeEach(() => {
    page = new RssmeClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
