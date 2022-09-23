export const categoryForm = {
    template: `
            <form class="category__form" name="categoryForm">
                <input class="category__form__input input" type="text" placeholder="title" name="title" required>
                <input class="category__form__input input" type="text" placeholder="description" name="description">
                <button class="category__form__btn" type="submit">add</button>
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

    add(event) {
        try {
            event.preventDefault();
            const formElements = document.forms['categoryForm'].elements;
            const fieldsState = this.isFieldsEmpty(formElements);

            if (fieldsState.isEmpty) {
                this.removeErrorClass(formElements);

                for (let field of fieldsState.fields) {
                    if (!formElements[field].classList.contains('input__error')) {
                        formElements[field].classList.add('input__error')
                    }
                }
            } else {
                this.categoryList.addNewCategory(fieldsState.fields.title, fieldsState.fields.description);
                this.removeErrorClass(formElements);
                formElements['title'].value = '';
                formElements['description'].value = '';

                const categoryListEl = document.querySelector('.category__list');
                categoryListEl.innerHTML = this.categoryList.render('list');
            }

        } catch (e) {
            console.error(e);
        }
    },

    closeForm() {
        console.log('form closes');
        // this.addBtnEl.removeEventListener('click', this.add);

        // const delFormBtn = `<div class="del__form__btn" onclick="test()">del</div>`
        //
        // appEl.insertAdjacentHTML('beforeend', delFormBtn);
        //
        // document.querySelector('.del__form__btn').onclick = test;
    },

    render(whereAddClassName, categoryList) {
        try {
            const whereAddFormEl = document.querySelector(whereAddClassName);
            whereAddFormEl.insertAdjacentHTML('beforeend', this.template);

            this.categoryList = categoryList;
            this.addBtnEl = document.querySelector(`.category__form__btn`);
            this.addBtnEl.addEventListener('click', this.add.bind(this));

            document.querySelector('.category__form__btn-close').onclick = this.closeForm.bind(this);
        } catch (e) {
            console.error(e);
        }

    },
};