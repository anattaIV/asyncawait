async function loadUserProfile(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) throw new Error("Пользователь не найден");
    const user = await response.json();

    const [posts, todos] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(r => r.json()),
      fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).then(r => r.json()),
    ]);

    return { user, posts, todos };
  } catch (error) {
    console.error("Ошибка загрузки профиля:", error);
    return null;
  }
}

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 10;
}

function f() {
  wait().then(result => {
    console.log("Результат:", result);
  });
}

async function run() {
  const profile = await loadUserProfile(1);
  console.log("Профиль пользователя:", profile);
}

f();
run();
