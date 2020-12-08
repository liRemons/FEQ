let fs = require('fs')
const readFile = (path, fileName) => {
  let fileContent = fs.readFileSync(path).toString('utf-8')
  let reg = /<body[^>]*>([\s\S]*)<\/body>/;
  fs.writeFileSync(`./data/${fileName}.js`, fileContent.match(reg)[1], "utf8");
}
fs.readdir('./html', (err, files) => {
  if (err) throw err
  let arr = [
    { name: 'css', fileName: 'HTML_CSS' },
    { name: "JS", fileName: 'JS' },
    { name: "React", fileName: 'React' },
    { name: "TypeScript", fileName: 'TypeScript' },
    { name: "Vue", fileName: 'Vue' },
  ]
  files.forEach(item => {
    arr.forEach(a => {
      item.includes(a.name) && readFile(`./html/${item}`, a.fileName)
    })
  })
})