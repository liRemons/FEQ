/*
 * @Descripttion:
 * @version:
 * @Author: Remons
 * @Date: 2021-02-11 16:32:56
 * @LastEditors: Remons
 * @LastEditTime: 2021-03-28 18:46:33
 */
// 格式化html，去除style
const fs = require("fs");
fs.readdir("./html", (err, files) => {
  if (err) {
    console.log("目录不存在");
  } else {
    files.forEach((item) => {
      readFile("./html/" + item, item);
    });
  }
});

fs.readdir("./website/assets/documents/", (err, files) => {
  const path = "./website/data/";
  const name = "documentsNameList.json";
  writeFile({ path, name, data: JSON.stringify(files) });
});

const readFile = (path, name) => {
  let regExp = /<body[^>]*>([\s\S]+?)<\/body>/i;
  let data = fs
    .readFileSync(path, "utf-8")
    // .replace(/<style.*?>([\s\S]*)<\/style>/, "")
    .replace(
      "<p><a href='http://remons.gitee.io/'><span>个人网站持续更新</span></a></p>",
      ""
    );
  const m = regExp.exec(data);
  m && writeFile({ data: m[1], name, path: "./html/" });
};

const writeFile = ({ data, name, path }) => {
  console.log(data, "data");
  fs.writeFile(path + name, data, "utf-8", (err) => {});
};
