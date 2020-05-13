const transformTagLists = (files) => {
  const byTag = groupByTags(files);
  const pages = createTagPages(byTag);

  if (pages.length > 0) {
    pages.push(createMainTagList(pages));
  }

  return pages;
};

const groupByTags = (files) => {
  const byTag = [];
  const untagged = [];

  for (const file of files) {
    const { tags } = file;

    if (!tags) {
      untagged.push(file);
    } else {
      for (const tag of tags) {
        if (!byTag[tag]) {
          byTag[tag] = [];
        }

        byTag[tag].push(file);
      }
    }
  }

  if (untagged.length > 0) {
    byTag.untagged = untagged;
  }

  return byTag;
};

const createTagPages = (byTag) => {
  const pages = [];

  for (const [tag, tagFiles] of Object.entries(byTag)) {
    pages.push({
      filename: `tags/${tag}.html`,
      files: tagFiles,
      metadata: { tag },
      template: "tag.html",
    });
  }

  return pages;
};

const createMainTagList = (pages) => {
  const files = pages.map(({ filename }) => ({
    filename,
    title: filename.replace(/(^tags\/|\.html$)/g, ""),
  }));

  return {
    filename: "tags.html",
    files: files.sort(sortByTitle),
    template: "tags.html",
  };
};

const sortByTitle = (a, b) => {
  let direction = -1;

  if (a.title > b.title) {
    direction = 1;
  }

  return direction;
};

module.exports = transformTagLists;
