import db from '/lib/db';

export default function handler(req, res) {
    db.query('SELECT * FROM example_table', (error, results) => {
        if (error) {
            // Если произошла ошибка, отправляем статус 500 и сообщение об ошибке
            console.log(error)
        } else {
            // Если запрос выполнен успешно, отправляем статус 200 и результаты запроса
            console.log(results)
        }
    });
}
