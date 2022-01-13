const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 7),
	new Result("Ваш уровень выше среднего", 12),
	new Result("Вы в совершенстве знаете тему", 16)
];

//Массив с вопросами
const questions = 
[
	new Question("Процессор это:", 
	[
		new Answer("Устройство для вывода информации на бумагу", 0),
		new Answer("Устройство обработки информации", 1),
		new Answer("Устройство для чтения информации с магнитного диска", 0),
		new Answer("Не знаю", 0)
	]),

	new Question("CD-ROM — это:", 
	[
		new Answer("Устройство чтения информации с компакт-диска", 1),
		new Answer("Устройство для записи информации на магнитный диск", 0),
		new Answer("Устройство для долговременного хранения информации", 0),
		new Answer("Не знаю", 0)
	]),

	new Question("Принтер — это:", 
	[
		new Answer("Устройство для долговременного хранения информации", 0),
		new Answer("Устройство для вывода информации на бумагу", 1),
		new Answer("Устройство для записи информации на магнитный диск", 0),
		new Answer("Не знаю", 0)
	]),

	new Question("Магнитный диск — это:", 
	[
		new Answer("Устройство для долговременного хранения информации", 1),
		new Answer("Устройство для вывода информации", 0),
		new Answer("Устройство для записи информации на магнитный диск", 0),
		new Answer("Не знаю", 0)
	]),

	new Question("Сканер — это:", 
	[
		new Answer("Многосредный компьютер", 0),
		new Answer("Устройство ввода изображения с листа в компьютер", 1),
		new Answer("Системная магистраль передачи данных", 0),
		new Answer("Не знаю", 0)
	]),

	new Question("Какое устройство компьютера моделирует мышление человека?", 
	[
		new Answer("Оперативная память", 0),
		new Answer("Монитор", 0),
		new Answer("Процессор", 1),
		new Answer("Не знаю", 0)
	]),

	new Question("Клавиатура — это:",
	[
		new Answer("Устройство обработки информации	", 0),
		new Answer("Устройство для хранения информации", 0),
		new Answer("Устройство для ввода информации", 1),
		new Answer("Не знаю", 0)
	]),

	new Question("Монитор — это:",
	[
		new Answer("Устройство обработки информации", 0),
		new Answer("Устройство для вывода информации", 0),
		new Answer("Устройство для ввода информации", 1),
		new Answer("Не знаю", 0)
	]),

	new Question("Компьтерная Мышь — это:",
	[
		new Answer("Устройство обработки информации", 0),
		new Answer("Устройство для хранения информации", 0),
		new Answer("Устройство ввода информации", 1),
		new Answer("Не знаю", 0)
	]),

	new Question("Память — это:",
	[
		new Answer("Устройство для записи информации на магнитный диск", 0),
		new Answer("Устройство для хранения информации", 1),
		new Answer("КазУстройство для обработки информацииах", 0),
		new Answer("Не знаю", 0)
	]),

	new Question("Драйвер — это …",
	[
		new Answer("Устройство сопряжения ЭВМ и внешнего устройства", 0),
		new Answer("Программа, обеспечивающая взаимодействие ОС с физическим устройством", 1),
		new Answer("Имя устройства", 0),
		new Answer("Не знаю", 0)
	]),

	new Question("Что такое байт",
	[
		new Answer("Группа из восьми битов, обрабатываемых как единое целое", 1),
		new Answer("Единица измерения скорости передачи информации", 0),
		new Answer("Данные используемые для тестирования", 0),
		new Answer("Не знаю", 0)
	]),

	new Question("Буфер — это…",
	[
		new Answer("Область памяти где расположены значения констант программы", 0),
		new Answer("Запоминающее устройство, содержащее управляющие программы", 0),
		new Answer("Область памяти для временного хранения информации", 1),
		new Answer("Не знаю", 0)
	]),

	new Question("К какому типу программ относится программа Excel",
	[
		new Answer("Электронная таблица", 1),
		new Answer("Текстовый процессор", 0),
		new Answer("Музыкальный проигрыватель", 0),
		new Answer("Не знаю", 0)
	]),

	new Question("Какие типы данных могут содержать электронные таблицы Excel",
	[
		new Answer("Числовые, текстовые", 0),
		new Answer("Числовые, формулы", 0),
		new Answer("Числовые, текстовые, формулы", 1),
		new Answer("Не знаю", 0)
	]),

	new Question("Какое расширение имеют файлы в Excel",
	[
		new Answer("Bas", 0),
		new Answer("Xls", 1),
		new Answer("Txt", 0),
		new Answer("Не знаю", 0)
	]),


	new Question("Какого Интернет-браузера не существует? ",
	[
		new Answer("Internet Explorer ", 0),
		new Answer("Opera", 0),
		new Answer("MS PowerPoint ", 1),
		new Answer("Google Chrome ", 0)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}