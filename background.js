
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.url === undefined
      || tab.url.indexOf('https://ameblo.jp/2896-blog') === -1
      || changeInfo.status !== "complete"){
    return;
  }

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(500);

  chrome.storage.local.get("isConvertKanji", (result) => {
    // storage が空なら、isConvertKanji を true にする(初回起動時想定)
    if (Object.keys(result).length === 0) {
      chrome.storage.local.set({isConvertKanji: true});
      result.isConvertKanji = true;
    }

    // 変換OFF の設定の時は何もしない
    if (!result.isConvertKanji) {
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['./main.js'],
    });
  });
});
