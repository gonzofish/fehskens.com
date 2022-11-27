const CleanCSS = require("clean-css");
const fs = require("fs");
const path = require("path");
const terser = require("terser");

const build = () => {
  const root = process.cwd();
  const outputDir = path.join(root, "dist");
  const blogDir = path.join(outputDir, "blog");
  const srcDir = path.join(root, "src");
  const talcDir = path.join(root, "blog-html");

  copyDir(srcDir, outputDir);
  copyDir(talcDir, blogDir);

  minifyJS(path.join(outputDir, "scripts"));
  minifyCSS(path.join(outputDir, "styles"));
};

const copyDir = (src, dest) => {
  createDir(dest);

  if (checkIsDir(src)) {
    const files = fs.readdirSync(src);

    for (const file of files) {
      const sourcePath = path.join(src, file);
      const destPath = path.join(dest, file);

      if (checkIsDir(sourcePath)) {
        copyDir(sourcePath, destPath);
      } else {
        copyFile(sourcePath, destPath);
      }
    }
  }
};

const checkIsDir = (dir) => fs.lstatSync(dir).isDirectory();

const copyFile = (source, dest) => {
  const contents = fs.readFileSync(source, { encoding: "utf8" });

  fs.writeFileSync(dest, contents, { encoding: "utf8" });
  console.log('> Copied from "%s" to "%s"', source, dest);
};

const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const minifyJS = (dir) => {
  const code = fs.readFileSync(path.join(dir, "index.js"), {
    encoding: "utf8",
  });
  const result = terser.minify(code);

  fs.writeFileSync(path.join(dir, "index.js"), result.code, {
    encoding: "utf8",
  });
};

const minifyCSS = async (dir) => {
  const cleaner = new CleanCSS({ returnPromise: true });
  const code = fs.readFileSync(path.join(dir, "main.css"), {
    encoding: "utf8",
  });

  try {
    const { styles } = await cleaner.minify(code);

    fs.writeFileSync(path.join(dir, "main.css"), styles, { encoding: "utf8" });
  } catch (e) {
    console.error(e);
  }
};

const readCode = (dir, ext) => {
  const files = fs.readdirSync(dir);
  const code = {};

  for (const file of files) {
    if (path.extname(file) === ext) {
      const filepath = path.join(dir, file);

      code[filepath] = fs.readFileSync(filepath, {
        encoding: "utf8",
      });
    }
  }

  return code;
};

if (!module.parent) {
  build();
}
