const identifiers = [
  { regex: /github\.com\/jleight/i, identifier: 'JL' },
  { regex: /github\.com\/bettermynd/i, identifier: 'BM' }
];

const setTitle = (tab) => {
  identifiers.forEach((identifier) => {
    if (identifier.regex.test(tab.url)) {
      browser.tabs.executeScript(tab.id, {
        code: `document.title = document.title.replace(/(?::[^:]+: )?(.+)/, ':${identifier.identifier}: $1');`,
      });
    }
  });
};

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  setTitle(tab);
});

const allTabs = browser.tabs.query({}).then((tabs) => {
  tabs.forEach(setTitle);
});
