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

    addCategory(event) {
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
                this.categoryList.addNewCategory(fieldsState.fields.title, fieldsState.fields.description);
                formElements['title'].value = '';
                formElements['description'].value = '';

                this.data.saveData('categories', this.categoryList.getAllItems());

                const categoryListEl = document.querySelector('.category__list');
                categoryListEl.innerHTML = this.categoryList.render('list');
            }

        } catch (e) {
            console.error(e);
        }
    },

    closeForm() {
        console.log('form closes');
    },

    addListener() {
        const formBtnEl_add = document.querySelector(`.category__form__btn-add`);
        const formBtnEl_close = document.querySelector(`.category__form__btn-close`);
        //
        // console.log(formBtnEl_add);
        // let lol;
        // setTimeout(() => {
        //     lol = document.querySelector(`.category__form__btn-add`);
        //     lol.addEventListener('click', this.addCategory.bind(this));
        //     formBtnEl_close.onclick = this.closeForm.bind(this);
        // }, 1000);

        formBtnEl_add.addEventListener('click', this.addCategory.bind(this));
        formBtnEl_close.onclick = this.closeForm.bind(this);
    },

    render(whereAddClassName, data, categoryList) {
        try {

            const whereAddFormEl = document.querySelector(whereAddClassName);
            whereAddFormEl.insertAdjacentHTML('beforeend', this.template);

            this.addListener();


            this.categoryList = categoryList;
            this.data = data;


            // setTimeout(() =>this.addListener(),0);


        } catch (e) {
            console.error(e);
        }

    },
};