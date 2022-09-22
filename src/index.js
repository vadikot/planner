/*  Styles import   */
import "./style.scss";

/*  JS Classes import   */
import Data from "./Components/Data";
import TaskList from "./Components/List/TaskList";
import CategoryList from "./Components/List/CategoryList";
import {categoryForm} from "./Components/Forms/CategoryForm";

/*  Data   */
const data = new Data();
const taskList = new TaskList(data.getByName('tasks'));
const categoryList = new CategoryList(data.getByName('categories'));
const appEl = document.querySelector('.app .app__container');
//
// const categoryAddHandler = function (event) {
//     event.preventDefault();
//
//     console.log(taskList);
//     console.log(event.target);
// }


appEl.insertAdjacentHTML('beforeend', taskList.render());
appEl.insertAdjacentHTML('beforeend', categoryList.render());
// appEl.insertAdjacentHTML('beforeend', categoryForm.render(categoryList));


categoryForm.render('.categories', categoryList);
// categoryForm.render('.category__list', true, categoryAddHandler, taskList);




const categoryArticle = document.querySelector('.category__article');
window.onload = (event)=> {
    console.log('document is ready');
    categoryArticle.addEventListener('click', showAllCategories);
}
function showAllCategories (){
    console.log(categoryList.getAllItems());
}



// const delFormBtn = `<div class="del__form__btn" onclick="test()">del</div>`
//
// appEl.insertAdjacentHTML('beforeend', delFormBtn);
//
// document.querySelector('.del__form__btn').onclick = test;
//
// function test() {
// console.log('element removed');
// }


import Goal from "./Components/Goal";

const testGoal = new Goal('проверка', 179);
console.log(testGoal.showTimeToFinish());

//
// class Animal {
//     name;
//     constructor() {
//     }
//
//     showName() {
//         console.log(this.name);
//     }
// }
//
// class Cat extends Animal {
//     constructor(name, value) {
//         super();
//         this.name = name + 1;
//         this.field = this.setField(value)
//     }
//     isCat = true;
//
//     setField(value) {
//         return value *2;
//     }
//     meow() {
//         console.log('meow');
//     }
// }
//
// let newCat = new Cat('zefir', 2);
//
// console.log(newCat);
// newCat.showName();