/*  Styles import   */
import "./style.scss";

/*  JS Classes import   */
import Data from "./Components/Data";
// import TaskList from "./Components/List/TaskList";
import CategoryList from "./Components/List/CategoryList";
import {categoryForm} from "./Components/Forms/CategoryForm";

/*  Data   */
// const data = new Data('file');
const data = new Data('localstorage');
// const taskList = new TaskList(data.getByName('tasks'));
const categoryList = new CategoryList(data.getByName('categories'));
const appEl = document.querySelector('.app .app__container');



// app.show.data.list.categoryList.render();
// appEl.insertAdjacentHTML('beforeend', taskList.render());
appEl.insertAdjacentHTML('beforeend', categoryList.render('block'));
categoryList.addHandler(listener);


// create & add form for categories
categoryForm.render('.categories', data, categoryList);
// create & add select element for categories
appEl.insertAdjacentHTML('beforeend', categoryList.render('select'));






function listener(event) {
    const clickedItemID = event.target.dataset.id;

    if (event.target.classList.contains('category__item__btn-remove')) {
        this.removeItemById(clickedItemID);
        this.updateAllNodeItems();
        data.saveData('categories', this.getAllItems());
    }

    if (event.target.classList.contains('category__item__btn-edit')) {
        this.openCategoryEditForm(clickedItemID, event);
    }

    if (event.target.classList.contains('save-btn')) {
        this.saveChanges(clickedItemID);
        data.saveData('categories', this.getAllItems());
    }

}
// show all categories in console with by clicking on article

// const categoryArticle = document.querySelector('.category__article');
// window.onload = (event)=> {
//     console.log('document is ready');
//     categoryArticle.addEventListener('click', showAllCategories);
// }
// function showAllCategories (){
//     console.log(categoryList.getAllItems());
// }