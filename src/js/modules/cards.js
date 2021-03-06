import {getData} from '../services/services';

function cards() {
    // TabsItem
    class TabsItem {
        constructor(img, alt, title, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.descr =  descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        addItemInTabs() {
            const tabsItem = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes[0] = 'menu__item';
            }
            this.classes.forEach(classesName => tabsItem.classList.add(classesName));
            tabsItem.innerHTML = `  <img src=${this.img} alt=${this.alt}>
                                    <h3 class="menu__item-subtitle">${this.title}</h3>
                                    <div class="menu__item-descr">${this.descr}</div>
                                    <div class="menu__item-divider"></div>
                                    <div class="menu__item-price">
                                        <div class="menu__item-cost">Цена:</div>
                                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                    </div>`;           
            
            this.parent.append(tabsItem);
        }
    }

    getData('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new TabsItem(img, altimg, title, descr, price, '.menu__field .container').addItemInTabs();
        });
    });
}

export default cards;
