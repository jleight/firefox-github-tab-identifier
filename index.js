const identifiers = [
  { regex: /github\.com\/jleight/i, identifier: 'JL' },
  { regex: /github\.com\/bettermynd/i, identifier: 'BM' },
  { regex: /github\.com/i }
];

const setTitle = (tab) => {
  const identifier = identifiers.find((i) => i.regex.test(tab.url));
  if (!identifier) {
    return;
  }
  browser.tabs.executeScript(tab.id, {
    code: identifier.identifier
      ? `document.title = document.title.replace(/(?::[^:]+: )?(.+)/, ':${identifier.identifier}: $1');`
      : `document.title = document.title.replace(/^:[^:]+:/, '');`
  });
};

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  setTitle(tab);
});

const allTabs = browser.tabs.query({}).then((tabs) => {
  tabs.forEach(setTitle);
});
