const fs = require("fs");
const path = require("path");

const build = () => {
  const root = process.cwd();
  const outputDir = path.join(root, "dist");
  const blogDir = path.join(outputDir, "blog");
  const srcDir = path.join(root, "src");
  const talcDir = path.join(root, "blog-html");

  copyDir(srcDir, outputDir);
  copyDir(talcDir, blogDir);
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
};

const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

if (!module.parent) {
  build();
}
