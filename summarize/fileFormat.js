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

const readFile = (path, name) => {
  let data = fs
    .readFileSync(path, "utf-8")
    .replace(/<style.*?>([\s\S]*)<\/style>/, "");
  writeFile(data, name);
};

const writeFile = (data, name) => {
  fs.writeFile("./html/" + name, data, "utf-8", (err) => { });
};
