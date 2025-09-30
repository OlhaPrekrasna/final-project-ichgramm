import { $api } from "./Api.jsx";

// Функция для получения пользователя по ID
export const getUserByIdApi = async (userId) => {
  try {
    // Делаем GET-запрос к backend API по маршруту /user/:id
    const { data } = await $api.get(`/user/${userId}`);

    // Возвращаем тело ответа (данные пользователя)
    return data;
  } catch (e) {
    // Если запрос не удался (например, сервер недоступен или вернул ошибку),
    // выводим ошибку в консоль для разработчика
    console.error("Ошибка API:", e);

    // Пробрасываем понятное сообщение для UI
    throw new Error("Ошибка при получении пользователя");
  }
};
