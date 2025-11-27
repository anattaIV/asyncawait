  //Что делает этот код. Ответ: loadUserProfile(userId) — загружает данные пользователя с сервера, его посты и задачи (todos). Возвращает объект { user, posts, todos }. В итоге: код показывает, как работать с асинхронными запросами и обрабатывать их результат.
  // Что такое HTTP и HTTP запрос в целом. Ответ: HTTP - метод по которому юзеры и сервер обмениваются данными. HTTPS  - это HTTP + шифрование через SSL/TLS
  // Зачем нужен JSON в общем, в контексте этой программы тоже. Ответ: JSON - формат для обмена данными между клиентом и сервером. Он легко читается и обрабатывается
async function loadUserProfile(userId) { //Асинх функция, входной параметр - id юзера
  try { //Отлов ошибки
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`); //Делаем HTTP запрос к API, ждем ответ(${userId} - вставка переменной userId в строку URL)
    if (!response.ok) throw new Error("Пользователь не найден"); //Проверяем успешный ли ответ
    const user = await response.json(); //Превращаем ответ в объект JSON

    const [posts, todos] = await Promise.all([ //Параллельно делаем 2 запроса к API(post и todos) и ждем оба
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(r => r.json()), //Получаем JSON из каждого запроса.
      fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).then(r => r.json()),
    ]);

    return { user, posts, todos }; //Возврат объекта с пользователями, постами и задачами
  } catch (error) { //Если ошибка есть, то...
    console.error("Ошибка загрузки профиля:", error);
    return null;
  }
}

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000)); //Ждет завершения промиса, прежде чем идти дальше. Создаем промис который завершится через 1000мс(1с)
  return 10; //Возвращаем число 10 через 1с. Т.е функция ждет 1с и возвращает число 10
}

function f() {
  wait().then(result => {  //wait берет промис(который завершится через 1с), then говорит: "Когда промис завершится выполнится функция". Т.е через 1с .then возьмет result(10) и выведет в консоль
    console.log("Результат:", result); //Вывод
  });
}

async function run() {
  const profile = await loadUserProfile(1); //Ждет выполнения функции loadUserProfile(ждет весь массив - user, posts, todos). (с userId = 1).
  console.log("Профиль пользователя:", profile); //Вывод всего массива
}

f();      
run();
