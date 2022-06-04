const path = require("path");
const transformTagLists = require("./talc/scripts/create-tag-pages");

module.exports = {
  built: "blog-html",
  dateFormat: "M/d/yyyy hh:mm a",
  pages: {
    directory: path.join("talc", "templates"),
    templates: [
      {
        sortBy: ["update_date", "publish_date"],
        template: "index.html",
        type: "listing",
      },
      {
        sortBy: ["update_date", "publish_date"],
        template: "index.html",
        transformer: transformTagLists,
        type: "listing",
      },
      {
        template: "post.html",
        type: "post",
      },
    ],
  },
  published: "posts",
};
