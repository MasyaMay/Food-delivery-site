function calculate() {
    // Calc

    const calcElement = document.querySelectorAll('.calculating__choose-item');
    const calcResult = document.querySelector('.calculating__result span');

    class Calc {
        constructor(element, result) {
            this.element = element;
            this.result = result;
            this.BMR = 0;
            this.height = 0;
            this.weight = 0;
            this.age = 0;
            this.gender = '';
            this.activity = 0;
            this.toggleGender = 0;
            this.toggleActivity = 0;
            this.start();
        }

        start() {
            this.element.forEach(item => {
                item.classList.remove('calculating__choose-item_active');
                this.result.innerHTML = `0`;
                this.spotGender(item);
                this.spotParametres(item);
            });
        }

        spotGender(element) {

            element.addEventListener('click', event => {
                const target = event.target;

                if (target && target.matches('div#man')) {
                    this.gender = 'man';
                    this.calcFormula();
                    this.toggleGender = this.toggleButton(this.toggleGender, target);

                } else if (target && target.matches('div#woman')) {
                    this.gender = 'woman';
                    this.calcFormula();
                    this.toggleGender = this.toggleButton(this.toggleGender, target);

                } else if (target && target.matches('div[data-active]')) {
                    this.activity = target.getAttribute('data-active');
                    this.calcFormula();
                    this.toggleActivity = this.toggleButton(this.toggleActivity, target);
                }
            });
        }

        toggleButton (toggleItem, target) {
            if (toggleItem) {
                toggleItem.classList.remove('calculating__choose-item_active');
            }
            target.classList.add('calculating__choose-item_active');
            return target;
        }

        spotParametres(element) {
            element.addEventListener('input', event => {
                const target = event.target;
                if (!Number.isInteger(+target.value)) {
                    target.value = target.value.replace(/[^\d]/g, '');
                }

                if (target && target.matches('input#height')) {
                    this.height = +target.value;
                } else if (target && target.matches('input#weight')) {
                    this.weight = +target.value;
                } else if (target && target.matches('input#age')) {
                    this.age = +target.value;
                }
                this.calcFormula();
                if (!this.height || !this.weight || !this.age || !target.value) {
                    this.result.innerHTML = `0`;
                }
            });
        }

        calcFormula() {
            if (this.height && this.weight && this.age && this.gender && this.activity) {
                if (this.gender == 'woman') {
                    this.BMR = 447.6 + (9.2 * this.weight) + (3.1 * this.height) - (4.3 * this.age);
                } 
                else if (this.gender == 'man') {
                    this.BMR = 88.36 + (13.4 * this.weight) + (4.8 * this.height) - (5.7 * this.age);
                }
                this.BMR *= this.activity;
                this.result.innerHTML = `${Math.round(this.BMR)}`;
            }
        }
    }

    new Calc(calcElement, calcResult);

}

export default calculate;