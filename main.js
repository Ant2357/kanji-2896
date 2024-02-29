async function convertToJpHenkan(text) {
  try {
    const apiRes = await fetch(`http://www.google.com/transliterate?langpair=ja-Hira|ja&text=${encodeURI(text)}`);
    const jpHenkanKouhos = await apiRes.json();

    const resText = jpHenkanKouhos.reduce((acc, arr) => {
      return acc.replace(arr[0], arr[1][0]);
    }, text);

    return resText;
  } catch (_) {
    return text;
  }
}

async function main() {
  const blogBodyDom = document.getElementById("entryBody");
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
  for (const lineText of blogBodyTexts) {
    if (lineText.trim() === "") {
      continue;
    }

    try {
      updateHtml = updateHtml.replace(lineText, await convertToJpHenkan(lineText));
    } catch (_) {
      continue;
    }
  }

  blogBodyDom.innerHTML = updateHtml;
}
main();
