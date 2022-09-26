/*  Styles import   */
import "./style.scss";

/*  JS Classes import   */
import Data from "./Components/Data";
// import TaskList from "./Components/List/TaskList";
import CategoryList from "./Components/List/CategoryList";
import {categoryForm} from "./Components/Forms/CategoryForm";

/*  Data   */
const data = new Data();
// const taskList = new TaskList(data.getByName('tasks'));
const categoryList = new CategoryList(data.getByName('categories'));
const appEl = document.querySelector('.app .app__container');


// appEl.insertAdjacentHTML('beforeend', taskList.render());
appEl.insertAdjacentHTML('beforeend', categoryList.render('block'));
categoryList.addHandler();


// create & add form for categories
categoryForm.render('.categories', categoryList);
// create & add select element for categories
appEl.insertAdjacentHTML('beforeend', categoryList.render('select'));

// show all categories in console with by clicking on article

// const categoryArticle = document.querySelector('.category__article');
// window.onload = (event)=> {
//     console.log('document is ready');
//     categoryArticle.addEventListener('click', showAllCategories);
// }
// function showAllCategories (){
//     console.log(categoryList.getAllItems());
// }