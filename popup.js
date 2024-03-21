
function onButtonClick() {
  chrome.storage.local.set({isConvertKanji: true});
  alert("日本語変換を ON にしました。\n以降はひらがな文章を変換します。");
}

function offButtonClick() {
  chrome.storage.local.set({isConvertKanji: false});
  alert("日本語変換を OFF にしました。\n以降はひらがな文章を変換しません。");
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("onHenkanBtn").addEventListener("click", onButtonClick);
  document.getElementById("offHenkanBtn").addEventListener("click", offButtonClick);
});
