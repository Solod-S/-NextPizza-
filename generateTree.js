const fs = require("fs");
const path = require("path");

const IGNORED_FOLDERS = ["node_modules", ".next", ".git"]; // Папки, которые будут игнорироваться

function generateTree(dirPath, prefix = "") {
  const items = fs
    .readdirSync(dirPath)
    .filter(item => !IGNORED_FOLDERS.includes(item));

  items.forEach((item, index) => {
    const fullPath = path.join(dirPath, item);
    const isLast = index === items.length - 1;
    const isDirectory = fs.statSync(fullPath).isDirectory();
    const connector = isLast ? "└── " : "├── ";

    console.log(`${prefix}${connector}${item}`);

    if (isDirectory) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      generateTree(fullPath, newPrefix);
    }
  });
}

// Запуск скрипта
const projectPath = "."; // Укажите путь к корню проекта (по умолчанию текущая директория)
generateTree(projectPath);
