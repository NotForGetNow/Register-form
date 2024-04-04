document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const usernameRegex = /^[a-zA-Z]{3,16}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    function validateUsername() {
        if (!usernameRegex.test(usernameInput.value)) {
            showErrorMessage(usernameInput, 'Имя пользователя должно содержать только буквы и быть от 3 до 16 символов');
            return false;
        }
        hideErrorMessage(usernameInput);
        return true;
    }

    function validateEmail() {
        if (!emailRegex.test(emailInput.value)) {
            showErrorMessage(emailInput, 'Неверный формат email');
            return false;
        }
        hideErrorMessage(emailInput);
        return true;
    }

    function validatePassword() {
        if (!passwordRegex.test(passwordInput.value)) {
            showErrorMessage(passwordInput, 'Пароль должен содержать минимум 8 символов, включая по одной заглавной и строчной букве, цифру и специальный символ');
            return false;
        }
        hideErrorMessage(passwordInput);
        return true;
    }

    function validateConfirmPassword() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            showErrorMessage(confirmPasswordInput, 'Пароли не совпадают');
            return false;
        }
        hideErrorMessage(confirmPasswordInput);
        return true;
    }

    function showErrorMessage(input, message) {
        const errorMessage = input.nextElementSibling;
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideErrorMessage(input) {
        const errorMessage = input.nextElementSibling;
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }

    function validateForm() {
        return validateUsername() && validateEmail() && validatePassword() && validateConfirmPassword();
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            // Здесь можно добавить код для отправки формы на сервер
            alert('Форма отправлена');
        }
    });

    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
});


document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registerForm");

    // Флаг для проверки того, был ли уже добавлен обработчик события отправки формы
    let isFormSubmitted = false;

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию

        // Проверяем, был ли уже отправлен запрос
        if (isFormSubmitted) {
            return;
        }

        // Устанавливаем флаг в значение true, чтобы предотвратить повторную отправку данных
        isFormSubmitted = true;

        // Получаем значения полей формы
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Создаем объект с данными пользователя
        const userData = {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };

        // Отправляем данные на сервер
        fetch("https://810a2ec2ff8866fa.mokky.dev/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка сети");
            }
            return response.json();
        })
        .then(data => {
            console.log("Успешно зарегистрирован:", data);
            // Здесь можно добавить обработку успешной регистрации, например, перенаправление на другую страницу или отображение сообщения об успехе
        })
        .catch(error => {
            console.error("Ошибка регистрации:", error.message);
            // Здесь можно добавить обработку ошибки, например, отображение сообщения об ошибке пользователю
        });
    });
});




