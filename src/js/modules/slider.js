function slider() {

    // Slider
    const imgList = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total'),
    nextBtn = document.querySelector('.offer__slider-next'),
    prevBtn = document.querySelector('.offer__slider-prev'),
    wrapper = document.querySelector('.offer__slider-wrapper'),
    inner = document.querySelector('.offer__slider-inner');

    class Slider {
        constructor(imgList, current, total, nextBtn, prevBtn, wrapper, inner, slider) {
            this.imgList = imgList;
            this.current = current;
            this.total = total;
            this.nextBtn = nextBtn;
            this.prevBtn = prevBtn;
            this.wrapper = wrapper;
            this.inner = inner;
            this.slider = slider;
            this.item = 0;
            this.offset = 0;
            this.dots = [];
            this.width = +window.getComputedStyle(this.wrapper).width.replace(/\D/g, '');
            this.showInitialSlider();
            this.showIndicator();
        }

        showInitialSlider() {
            this.showSlider(this.imgList[this.item]);
            this.registarTotalSlider(this.imgList.length, this.total);
        }

        showIndicator() {
            this.slider.style.position = 'relative';
            const indicator = document.createElement('ol');
            indicator.classList.add('carousel-indicators');
            this.slider.append(indicator);

            this.imgList.forEach((item, i) => {
                const dot = document.createElement('li');
                dot.classList.add('dot');
                if (i == 0) {
                    dot.style.opacity = '1';
                } 
                indicator.append(dot);
                this.dots.push(dot);

                dot.addEventListener('click', () => {
                    this.item = i;
                    this.offset = this.width * i;
                    this.showNextSlide();
                    this.showActiveDot(i);
                });
            });
        }

        showActiveDot(index) {
            this.dots.forEach(item => {
                item.style.opacity = '0.5';
            });
            this.dots[index].style.opacity = '1';
        }

        showNextSlide() {
            this.registarTotalSlider(this.item + 1, this.current);
            this.inner.style.transform = `translateX(-${this.offset}px)`;
        }

        moveSmoothSlider() {
            this.inner.classList.add('inner');
            this.inner.style.width = 100 * this.imgList.length + '%';
            this.wrapper.classList.add('hidden');
            this.imgList.forEach (slide => {
                slide.style.width = this.width + 'px';
        });

        this.nextBtn.addEventListener('click', () => {
            if (this.offset == this.width * (this.imgList.length - 1)){
                this.offset = 0;
                this.item = 0;
            } else {
                this.offset += this.width;
                this.item++;
            }
            this.showNextSlide();
            this.showActiveDot(this.item);
        });

        this.prevBtn.addEventListener('click', () => {
            if (this.offset == 0){
                this.offset = this.width * (this.imgList.length - 1);
                this.item = this.imgList.length - 1;
            } else {
                this.offset -= this.width;
                this.item--;
            }
            this.showNextSlide();
            this.showActiveDot(this.item);
        });
        }

        registarTotalSlider(index, parent) {
            if (index < 10) {
                parent.textContent = `0${index}`;
            } else {
                parent.textContent = index;
            }
        }

        registarBtn() {
            this.imgList.forEach(item => {
                this.closeSlider(item);
            });
            this.showSlider(this.imgList[this.item]);

            this.nextBtn.addEventListener('click', () => {
                this.closeSlider(this.imgList[this.item]);
                this.item = ++this.item % this.imgList.length;
                this.showSlider(this.imgList[this.item]);
        });

            this.prevBtn.addEventListener('click', () => {
                this.closeSlider(this.imgList[this.item]);
                if (this.item == 0){
                    this.item = this.imgList.length;
                }
                this.item--;
                this.showSlider(this.imgList[this.item]);
            });
        }

        showSlider(imgItem) {
            imgItem.classList.add('show');
            imgItem.classList.remove('hide');
            this.registarTotalSlider(this.item + 1, this.current);
        }

        closeSlider(imgItem) {
            imgItem.classList.add('hide');
            imgItem.classList.remove('show');
        }
    }

    new Slider(imgList, current, total, nextBtn, prevBtn, wrapper, inner, slider).moveSmoothSlider();
}

export default slider;