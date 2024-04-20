/*Создать объект, описывающий автомобиль (производитель, модель, год выпуска, средняя скорость), 
и следующие функции для работы с этим объектом*/

// Функция для вывода на экран информации об автомобиле.
const carCharacteristics = {
    manufacturer: 'bmw',
    model: 'e60',
    yearIssue: 2020,
    averageSpeed: 90,
    info() {
        let rezInfo = '' 
        for(key in this) {
            if (typeof this[key] != 'function') {                            // как не возвращать методы  есть еще варианты?
                console.log(`свойство ${key}  значение   ${this[key]}`)  
                rezInfo += `свойство ${key}  значение   ${this[key]},    `    //куда вернуть. в строку ? в массив? 
            }
        }
        return rezInfo
    }
} 
// console.log(carCharacteristics.info())


/*Функция для подсчета необходимого времени для преодоления переданного расстояния со средней скоростью. 
Учтите, что через каждые 4 часа дороги водителю необходимо делать перерыв на 1 час.*/
function travelTime(automobile, time) {
    let pause = 0
    if(time >= 4) {                     // тут коррекция по первым 4 часам 
        pause = Math.trunc(time / 4)         
        if(time % 4 == 0) {
            pause--
        }
    }
    let pauselostDistance =  automobile.averageSpeed * pause     //  вычисляем потерянное расстояние
    // console.log(pauselostDistance)
    return automobile.averageSpeed * time - pauselostDistance
}
// console.log(travelTime(carCharacteristics, 14))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Создать объект, хранящий в себе отдельно числитель и знаменатель дроби, и следующие функции для работы с этим объектом.
1. 
2. Функция вычитания 2-х объектов-дробей.
3. Функция умножения 2-х объектов-дробей.
4. Функция деления 2-х объектов-дробей. */


let number1 = {
    numerator: 5,
    denominator: 10,
}

let number2 = {
    numerator: 8,
    denominator: 12,
}
// Функция сложения 2-х объектов-дробей.
// дублирую кусок кода в каждой функции т.к. не хочу мутировать объект или создавать копию.
//  так же не хочу выносить переменные  в более "глобальную" зону видимости.
// конечно можно вызов функции вложить функцию. но мне придется возвращать объект из внутренней функции.
function sum(objA, objB) {
    let count = objA.denominator 
    if(objA.denominator > objB.denominator ) {
        count = objB.denominator
    }              // нашли минимальный знаменатель
    let rez = count
    while(!(rez % objA.denominator  == rez % objB.denominator )) {
        rez += count                  // каждый раз прибавляем наименьший знаменатель . что значительно сократит перебор
    }
    console.log('наименьший общий делитель ' + rez)     // наименьший общий делитель
    // приведем дроби к общему знаменателю  (добавим множители к числителю)
    let numeratorA = objA.numerator * (rez / objA.denominator)
    let numeratorB = objB.numerator * (rez / objB.denominator)
    console.log('вычесленный числитель числа A ' + numeratorA)
    console.log('вычесленный числитель числа B ' + numeratorB)
    console.log(`${numeratorA + numeratorB} / ${rez}`)  // только теперь дродь нужно сократить .
    let rezObj =  {
        numerator: numeratorA + numeratorB,
        denominator: rez
    }
    return reducingFraction(rezObj)   // т.к. функции объевленные с помощью function всплываюют. мы можем вызвать ее
}

// let sum2 = sum(number1, number2)
// console.log(sum2)     // вот видим что получили объект с сокращенными числителем и знаменателем


////////////////////////////////////////////////////////////////////////////////////
// Функция сокращения объекта-дроби 
function reducingFraction(obj)  {    // функция сокращения дроби
    let m 
    let n
    for (let i = 2; i <= obj.numerator; i++) {
        if (obj.numerator % i === 0 &&  obj.denominator % i === 0)
            m = obj.numerator / i, n = obj.denominator / i;
    }
    // console.log(m , n) // сократили дробь
        return {    
            numerator: m,
            denominator: n,
        }

}
// reducingFraction(sum2) 
