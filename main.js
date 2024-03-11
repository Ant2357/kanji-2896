/**
 * API を用いてひらがな文章を日本語変換(ひらがな + カタカナ + 漢字変換)する
 *
 * @param {string} text - ひらがな文章
 * @returns {Promise<string>} 日本語変換後の文章
 */
async function convertToJpHenkan(text) {
  try {
    const apiRes = await fetch(`http://www.google.com/transliterate?langpair=ja-Hira|ja&text=${encodeURI(text)}`);
    const jpHenkanKouhos = await apiRes.json();

    const resText = jpHenkanKouhos.reduce((acc, arr) => {
      return acc.replace(arr[0], arr[1][0]);
    }, text);

    return resText;
  } catch (_) {
    // 変換に失敗した場合は元の文章をそのまま返す
    return text;
  }
}


/**
 * ブログ本文の DOM からひらがな文章を取得し、
 * それを日本語(ひらがな + カタカナ + 漢字)変換して HTML に反映する
 */
async function main() {
  // ブログ本文の DOM
  const blogBodyDom = document.getElementById("entryBody");

  // ブログ本文のテキスト
  let blogBodyText;
  try {
    blogBodyText = blogBodyDom.textContent === null ? "" : blogBodyDom.textContent;
  } catch (_) {
    blogBodyText = "";
  }

  let blogBodyTexts = blogBodyText.split("\n");
  if (blogBodyTexts.length === 1) {
    blogBodyTexts = blogBodyText.split("。");
  }

  let updateHtml = blogBodyDom.innerHTML.slice();

  // ひらがな文章の各行ごとにループ
  for (const lineText of blogBodyTexts) {
    if (lineText.trim() === "") {
      continue;
    }

    try {
      updateHtml = updateHtml.replace(lineText, await convertToJpHenkan(lineText));
    } catch (_) {
      // 変換に失敗した場合はスキップ
      continue;
    }
  }

  // 変換後の HTML を反映
  blogBodyDom.innerHTML = updateHtml;
}
main();
