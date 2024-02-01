// Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис,
// который разрешается с данными об изображении, когда оно загружено.
// Когда говорится "промис разрешается с данными об изображении",
// это означает, что промис должен быть успешно выполнен (resolved)
// с данными об изображении после того, как изображение будет загружено.

'use strict';

// function fetching(url) {

//   return new Promise((resolve) => {
//     fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.blob();
//     })
//     .then((data) => {
//       if (data.type !== 'image/jpeg' && data.type !== 'image/png') throw new Error('Error in type');

//       const reader = new FileReader();

//       reader.onload = function() {
//         document.querySelector('img').setAttribute('src', reader.result);
//         resolve([data.size, data.type]);
//       }

//       reader.onerror = function () {
//         console.log(reader.error);
//       }

//       reader.readAsDataURL(data);
//     })
//     .catch ((er) => console.log(er));
//   });
// }


let url = 'https://raw.githubusercontent.com/ViktoriaV-start/different_data/main/wood.jpeg';
fetching(url)
.then((arr) => {
  console.log(`Размер изображения: ${arr[0]} байт, тип изображения: ${arr[1]}`)
});

//------------------------ ВТОРОЙ ВАРИАНТ

// async function fetching(url) {

//   async function readAsync(data) {
//     try {
//       return await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.onload = function () {
//           document.querySelector('img').setAttribute('src', reader.result);
//           resolve('ok');
//         };
//         reader.onerror = function () {
//           console.log(reader.error);
//         };
//         reader.readAsDataURL(data);
//       });
//     } catch (er) {
//       console.log(er);
//     }
//   }

//   try {
//     const response = await fetch(url);
//     const data = await response.blob();
//     if (data.type !== 'image/jpeg' && data.type !== 'image/png') throw new Error('Error in type');
//     return await readAsync(data).then((status) => [data.size, data.type]);
//   } catch (er) {
//     console.log(er);
//   }
// }


//------------------------ ТРЕТИЙ ВАРИАНТ

function fetching(url) {

  return new Promise((resolve) => {
    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.blob();
    })
    .then((data) => {
      if (data.type !== 'image/jpeg' && data.type !== 'image/png') throw new Error('Error in type');

      const objectURL = URL.createObjectURL(data);
      //document.querySelector('img').setAttribute('src', objectURL);
      
      let img = `<img src = ${objectURL}>`;
      console.log(document.querySelector('.pic'))
      document.querySelector('.pic').insertAdjacentHTML('beforeend', img);


      resolve([data.size, data.type]);

    })
    .catch ((er) => console.log(er));
  });
}