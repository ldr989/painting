import {getResource} from "../services/requests";

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);

    // cards.forEach(card => {
    //     card.classList.add('animated', 'fadeInUp');
    // });

    // btn.addEventListener('click', () => {
    //     cards.forEach(card => {
    //         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
    //         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //     });
    //     btn.remove();
    // });

    btn.addEventListener('click', function() {
        getResource('assets/db.json')
            .then(res => createCards(res.styles))
            .catch(error => showError());

        this.remove();
    });

    function createCards(responce) {
        responce.forEach(({src, title, link}) => {
            let card = document.createElement('div');
            
            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            card.innerHTML = `
                <div class=styles-block>
                    <img src=${src} alt="style">
                    <h4>${title}</h4>
                    <a href=${link}>Подробнее</a>
                </div>
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    }

    function showError() {
        let errorBlock = document.createElement('div');

        errorBlock.style.textAlign = 'center';
        errorBlock.textContent = 'Что-то пошло не так :(';

        document.querySelector(wrapper).appendChild(errorBlock);
        setTimeout(() => errorBlock.remove(), 5000);
    }
};

export default showMoreStyles;