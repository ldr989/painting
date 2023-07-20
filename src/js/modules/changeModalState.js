const changeModalState = (state) => {
    const sizeBlock = document.querySelector('#size'),
        materialBlock = document.querySelector('#material'),
        optionsBlock = document.querySelector('#options'),
        promocodeBlock = document.querySelector('.promocode');

    function bindActionToElems(event, elem, prop) {
        elem.addEventListener(event, () => {
            switch(elem.nodeName) {
                case 'SELECT' :
                    state[prop] = elem.options[elem.selectedIndex].text;
                    break;
                case 'INPUT' :
                    if (elem.value !== '') {
                        state[prop] = elem.value;
                    } else {
                        delete state[prop];
                    }
                    break;
            }
            console.log(state);
        });
    }

    bindActionToElems('change', sizeBlock, 'size');
    bindActionToElems('change', materialBlock, 'material');
    bindActionToElems('change', optionsBlock, 'options');
    bindActionToElems('input', promocodeBlock, 'promocode');

};

export default changeModalState;