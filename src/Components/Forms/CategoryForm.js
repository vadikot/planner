export const categoryForm = {
    template: `
            <form class="category__form" name="categoryForm">
                <input class="category__form__input input" type="text" placeholder="title" name="title" required>
                <input class="category__form__input input" type="text" placeholder="description" name="description">
                <button class="category__form__btn-add" type="submit">add</button>
                <div class="category__form__btn-close btn">Close form</div>
            </form>
        `,

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

        return {
            isEmpty: false,
            fields: {
                title: title,
                description: description,
            }
        }
    },

    removeErrorClass(formElements) {
        formElements['title'].classList.remove('input__error');
        formElements['description'].classList.remove('input__error');
    },

    addCategory(event, thisApp) {
        try {
            event.preventDefault();
            const formElements = document.forms['categoryForm'].elements;
            const fieldsState = this.isFieldsEmpty(formElements);

            this.removeErrorClass(formElements);

            if (fieldsState.isEmpty) {
                for (let field of fieldsState.fields) {
                    if (!formElements[field].classList.contains('input__error')) {
                        formElements[field].classList.add('input__error')
                    }
                }
            } else {
                thisApp.categoryList.addNewCategory(fieldsState.fields.title, fieldsState.fields.description);
                formElements['title'].value = '';
                formElements['description'].value = '';

                thisApp.data.saveData('categories', thisApp.categoryList.getAllItems());

                const categoryListEl = document.querySelector('.category__list');
                categoryListEl.innerHTML = thisApp.categoryList.render('list');
            }

        } catch (e) {
            console.error(e);
        }
    },

    closeForm() {
        console.log('form closes');
    },

    handler(event) {

        if (event.target.classList.contains('category__form__btn-add')) {
            this.categoryForm.addCategory(event, this);
        }

        if (event.target.classList.contains('category__form__btn-close')) {
            this.categoryForm.closeForm();

        }
    },

    // maybe in feature write separate class for the FORMS
    // & then we will need to use TYPE
    render(type) {
        return this.template;
    },
};