
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.url === undefined
      || tab.url.indexOf('https://ameblo.jp/2896-blog') === -1
      || changeInfo.status !== "complete"){
    return;
  }

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(500);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['./main.js'],
  });
});
