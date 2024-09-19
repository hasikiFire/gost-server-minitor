const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'src', 'config');
const targetDir = path.join(__dirname, '..', 'dist', 'config');
console.log('[build.js] start');
// 确保目标目录存在
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 复制文件和子目录
function copyFiles(srcDir, destDir) {
  const items = fs.readdirSync(srcDir);

  items.forEach((item) => {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      // 递归复制子目录
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
      }
      copyFiles(srcPath, destPath);
    } else {
      // 复制文件
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyFiles(sourceDir, targetDir);
console.log('[build.js] end');
