export const taskForm = {
    template(categorySelectEl) {
        return `
                <form class="task__form form-add" name="taskForm">
                    <h3 class="form-title">Add new task</h3>
                    <input class="task__form__input input" type="text" placeholder="title" name="title" required>
                    <input class="task__form__input input" type="text" placeholder="description" name="description">
                    ${categorySelectEl}
                    <button class="task__form__btn-add" type="submit">add</button>
                    <div class="task__form__btn-close btn">Close form</div>
                </form>
               `;
        },

    isFieldsEmpty(elements) {
        const title = elements['title'].value;
        const description = elements['description'].value;

        if (title === '' || description === '') {
            let emptyFields = [];

            if (title === '') emptyFields.push('title');
            if (description === '') emptyFields.push('description');

            return {
                isEmpty: true,
                fields: emptyFields,
            }
        }

        const selectedCategoryIndex= elements['categories'].selectedIndex;
        const selectedCategoryID = elements['categories'][selectedCategoryIndex].value;

        return {
            isEmpty: false,
            fields: {
                title: title,
                description: description,
                category: selectedCategoryID,
            }
        }
    },

    removeErrorClass(formElements) {
        formElements['title'].classList.remove('input__error');
        formElements['description'].classList.remove('input__error');
    },

    addTask(event, thisApp) {
        try {
            event.preventDefault();
            const formElements = document.forms['taskForm'].elements;
            const fieldsState = this.isFieldsEmpty(formElements);

            this.removeErrorClass(formElements);

            if (fieldsState.isEmpty) {
                for (let field of fieldsState.fields) {
                    if (!formElements[field].classList.contains('input__error')) {
                        formElements[field].classList.add('input__error')
                    }
                }
            } else {
                const selectedCategory = thisApp.categoryList.getItemById(fieldsState.fields.category);

                thisApp.taskList.addNewTask({
                    title: fieldsState.fields.title,
                    description: fieldsState.fields.description,
                    category: {
                        id: selectedCategory.id,
                        title: selectedCategory.title,
                    },
                });

                formElements['title'].value = '';
                formElements['description'].value = '';

                thisApp.data.saveData('tasks', thisApp.taskList.getAllItems());

                const taskListEl = document.querySelector('.task__list');
                taskListEl.innerHTML = thisApp.taskList.render('list');
            }

        } catch (e) {
            console.error(e);
        }
    },

    closeForm() {
        console.log('form closes');
    },

    handler(event) {

        if (event.target.classList.contains('task__form__btn-add')) {
            this.taskForm.addTask(event, this);
        }

        if (event.target.classList.contains('task__form__btn-close')) {
            this.taskForm.closeForm();

        }
    },

    // maybe in feature write separate class for the FORMS
    // & then we will need to use TYPE
    render(type, categorySelectEl) {
        return this.template(categorySelectEl);
    },
};