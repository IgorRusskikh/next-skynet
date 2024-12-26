const fs = require("fs");
const path = require("path");

// Путь к директории с изображениями
const directory = "public/images/cash-to-cash/locations/";

// Читаем содержимое директории
fs.readdir(directory, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (path.extname(file) === ".png") {
      // Извлекаем название страны и преобразуем в нижний регистр
      const countryName = file.split("=")[1].split(".")[0].trim().toLowerCase();
      const newFilename = `${countryName}.png`;

      // Переименовываем файл
      fs.rename(
        path.join(directory, file),
        path.join(directory, newFilename),
        (err) => {
          if (err) throw err;
          console.log(`Переименован: ${file} -> ${newFilename}`);
        }
      );
    }
  });
});
