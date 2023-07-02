const modals = () => {
    let btnPressed = false;

    const scroll = calcScroll(),
        scrollRem = calcScroll('.fixed-gift', true);

    function bindModal(triggerSelector, modalSelector, closeSelector, fixedItemSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            fixedItem = document.querySelector(fixedItemSelector);

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;

                fixedItem.style.right = `${scrollRem}rem`;
            });
        });

        

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            fixedItem.style.right = `2rem`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
                fixedItem.style.right = `2rem`;
            }
        });
    }

    function showModalByTime(selector, time, fixedItem) {
        setTimeout(function () {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
                document.querySelector(fixedItem).style.right = `${scrollRem}rem`;
            }
            
        }, time);
    }

    function calcScroll(fixedItemSelector = '', rem = false) {
        let div = document.createElement('div'),
            scrollWidth;   

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        
        if (rem) {
            // get rem value in pixels
            const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize),
            // get fixed item that needs to be moved
                fixedItem = document.querySelector(fixedItemSelector),
            // get the value of fixed item position on the right
                fixedItemRemSize = parseFloat(getComputedStyle(fixedItem).right) / remInPixels;

            scrollWidth = ((div.offsetWidth - div.clientWidth) / remInPixels) + fixedItemRemSize;
        } else {
            scrollWidth = div.offsetWidth - div.clientWidth;
        }

        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight - 5)) {
                document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close', '.fixed-gift');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close', '.fixed-gift');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', '.fixed-gift', true);
    openByScroll('.fixed-gift');
    // showModalByTime('.popup-consultation', 60000, '.fixed-gift');
};

export default modals;