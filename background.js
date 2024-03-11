
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.url === undefined
      || tab.url.indexOf('https://ameblo.jp/2896-blog') === -1
      || changeInfo.status !== "complete"){
    return;
  }

  // TODO: 将来的にはこの暫定的な実装を削除する
  console.log("時間を置いてつば九郎開始");
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(500);

  console.log('Run つば九郎');

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['./main.js'],
  });
});
