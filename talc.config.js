const createTagPages = (files, template) => {
  const byTag = {};
  const output = [];
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
    tagFiles.untagged = untagged;
  }

  for (const [tag, tagFiles] of Object.entries(byTag)) {
    output.push({
      filename: `tags/${tag}.html`,
      files: tagFiles,
      template: "tag.html"
    });
  }

  if (output.length > 0) {
    output.push({
      filename: "tags.html",
      files: output
        .map(({ filename }) => ({
          filename: filename,
          title: filename.replace(/(^tags\/|\.html$)/g, "")
        }))
        .sort((a, b) => {
          let direction = -1;

          if (a.title > b.title) {
            direction = 1;
          }

          return direction;
        }),
      template: "tags.html"
    });
  }

  return output;
};

module.exports = {
  built: "posts-html",
  dateFormat: "M/d/yyyy hh:mm a",
  pages: {
    directory: "talc",
    templates: [
      {
        sortBy: ["publish_date"],
        template: "index.html",
        type: "listing"
      },
      {
        sortBy: ["publish_date"],
        template: "index.html",
        transformer: createTagPages,
        type: "listing"
      },
      {
        template: "post.html",
        type: "post"
      }
    ]
  },
  published: "posts"
};
