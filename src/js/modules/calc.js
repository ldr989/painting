import { getResource } from "../services/requests";

const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

    let sum = 0;

    function addDifferentEvents(item, event) {
        item.addEventListener(event, () => {
            getResource('assets/pricesAndCodes.json')
                .then(res => calc(res))
                .catch(error => resultBlock.textContent = 'Что-то пошло не так :(');
        });
    }
    function calc(responce) {
        const sizePrice = getPrice(responce.sizes[0], sizeBlock),
            materialPrice = getPrice(responce.materials[0], materialBlock),
            optionsPrice = getPrice(responce.options[0], optionsBlock);

        if (optionsPrice) {
            sum = Math.round((sizePrice) * (materialPrice) + (optionsPrice));
        } else {
            sum = Math.round((sizePrice) * (materialPrice));
        }

        if (!sum) {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (promocodeBlock.value.trim() === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * responce.codes[0].IWANTPOPART);
        } else if (promocodeBlock.value.trim() === 'GREEDISGOD') {
            resultBlock.textContent = Math.round(sum * responce.codes[0].GREEDISGOD);
        } else {
            resultBlock.textContent = sum;
        }
    }

    function getPrice(data, selected) {
        let res;
        for (const [key, value] of Object.entries(data)) {
            if (key === selected.options[selected.selectedIndex].text) {
                res = value;
                return res;
            }
        }
    }

    addDifferentEvents(sizeBlock, 'change');
    addDifferentEvents(materialBlock, 'change');
    addDifferentEvents(optionsBlock, 'change');
    addDifferentEvents(promocodeBlock, 'input');       
};

export default calc;