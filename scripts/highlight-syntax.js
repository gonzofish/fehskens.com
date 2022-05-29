const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const hljs = require("highlight.js/lib/core");
const css = require("highlight.js/lib/languages/css");
const js = require("highlight.js/lib/languages/javascript");
const scss = require("highlight.js/lib/languages/scss");
const xml = require("highlight.js/lib/languages/xml");

const highlightSyntax = async () => {
  registerLanguages();
  highlightFiles();
};

const registerLanguages = () => {
  hljs.registerLanguage("css", css);
  hljs.registerLanguage("js", js);
  hljs.registerLanguage("scss", scss);
  hljs.registerLanguage("xml", xml);
};

const highlightFiles = () => {
  const blogHtml = path.resolve(__dirname, "..", "blog-html");
  const files = fs.readdirSync(blogHtml);

  for (const file of files) {
    const filepath = path.join(blogHtml, file);

    if (!fs.statSync(filepath).isDirectory()) {
      fs.writeFileSync(filepath, highlightBlocks(filepath), {
        encoding: "utf8",
      });
    }
  }
};

const highlightBlocks = (filepath) => {
  const contents = fs.readFileSync(filepath, { encoding: "utf8" });
  const $ = cheerio.load(contents);
  const codes = $("pre code:not(.hljs)");

  codes.each((_index, element) => {
    const block = $(element);
    const highlighted = hljs.highlightAuto(block.text());
    const { class: className } = block.get(0).attribs;
    const language = getLanguageName(className);

    block.empty();
    block.addClass("hljs");
    block.append(cheerio.load(highlighted.value).html());


    if (language) {
      block.before(
        `<div class="language-name">${language}</div>`
      );
    }
  });

  return $.html();
};

const getLanguageName = (className = '') => {
  const language = className.match(/language-([^\s]+)/);

  if (!language) {
    return '';
  }

  switch (language[1]) {
    case 'css':
      return 'CSS';
    case 'haskell':
      return 'Haskell';
    case 'html':
      return 'HTML';
    case 'javascript':
    case 'js':
      return 'JavaScript';
    case 'scss':
      return 'SCSS';
    case 'shell':
      return 'Shell';
    default:
      return '';
  }
}

if (!module.parent) {
  highlightSyntax();
}

module.exports = highlightSyntax;
