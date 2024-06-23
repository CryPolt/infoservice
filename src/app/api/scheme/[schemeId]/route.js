// // src/app/api/scheme/[scheid]/route.js
// import { NextResponse } from "next/server";
//
// // Пример данных для элементов
// const schemeElements = {
//     'scheme-1': [
//         { id: 'elem-1', name: 'Element 1' },
//         { id: 'elem-2', name: 'Element 2' },
//     ],
//     'scheme-2': [
//         { id: 'elem-3', name: 'Element 3' },
//         { id: 'elem-4', name: 'Element 4' },
//     ],
// };
//
// // Обработка GET-запроса
// export async function GET(req, res) {
//     try {
//         const { schemeid } = req.query; // Используем req.query для получения параметра scheid
//         console.log('Received scheid:', schemeid); // Добавим логирование для отладки
//
//         if (!schemeid || !schemeElements.hasOwnProperty(schemeid)) {
//             throw new Error('Invalid scheme id');
//         }
//
//         const elements = schemeElements[schemeid] || [];
//         return NextResponse.json({ elements });
//     } catch (error) {
//         console.error('Не удалось получить элементы:', error);
//         return NextResponse.json({ error: 'Не удалось получить элементы' });
//     }
// }
//
// // Обработка POST-запроса (остается без изменений)
// export async function POST(req, res) {
//     try {
//         const { body } = req;
//         console.log('Полученные данные:', body);
//         return res.json({ message: 'Данные успешно обработаны' });
//     } catch (error) {
//         console.error('Не удалось обработать данные:', error);
//         return res.status(500).json({ error: 'Не удалось обработать данные' });
//     }
// }
