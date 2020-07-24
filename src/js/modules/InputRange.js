window.addEventListener('DOMContentLoaded', () => {
    
    class InputRange {
        constructor(idRange, step, min, max) {
            this.slide = document.querySelector(idRange);
            this.circle = null;
            this.line = null;
            this.mousePosition = 0;
            this.isDown = false;
            this.min = min;
            this.max = max;
            this.minBorder=0;
            this.maxBorder = 100;
            this.subscriber=[];
            this.step = step/(this.max - this.min)*this.maxBorder;
            this.stepValue = step;
            this.percent;
            this.value = this.min;
            this.addCircleRange();
        }
    
        addCircleRange() {
            this.circle = document.createElement('div');
            this.circle.classList.add('range-circle');
            this.slide.append(this.circle);   
            
            this.line = document.createElement('div');
            this.line.classList.add('range-line');
            this.slide.append(this.line); 

            console.log(this.maxBorder)
                        
            this.circle.addEventListener('mousedown', event => {
                this.isDown = true;
            });
            
            document.addEventListener('mouseup', () => {
                this.isDown = false;
            });
            
            document.addEventListener('mousemove', event => {
                event.preventDefault();
                if (this.isDown) {
                    this.mousePosition = event.clientX;
                    let min = this.getCoords(this.slide),
                        max = min + this.slide.offsetWidth;
                    this.moveSlider(this.mousePosition, min, max);
                    this.value = this.min + Math.floor(this.percent/this.step)*this.stepValue;
                    this.onChanged();
                }
            });
        }

        getCoords(elem) {
            let box = elem.getBoundingClientRect();
            return box.left + pageXOffset;
        }
    
        moveSlider(value, min, max) {
            this.percent = (value - min)/(max - min)*this.maxBorder;
            if(this.percent < this.minBorder){
                this.percent = this.minBorder;
            }else if (this.percent>this.maxBorder){
                this.percent = this.maxBorder;
            }
            this.circle.style.left = this.percent + '%';
            this.line.style.width = this.percent + '%';
            this.line.style.right = (100-this.percent) + '%';
        }
    
        subscribe(func) {
            this.subscriber.push(func);
        }
    
        setValue(value) {           
            this.value=value;
            let clippedMax = this.min+Math.floor(this.maxBorder/this.step)*this.stepValue;
            if(this.value>clippedMax){
                this.value = clippedMax
            }
            this.moveSlider(value,this.min,this.max);
            this.onChanged();
        }

        recalculateValue() {
            let clippedMin = this.min + Math.round(this.minBorder/this.step)*this.stepValue;
            if(!this.value || this.value < clippedMin){
                this.value = clippedMin;
            }
            this.setValue(this.value);
        }
    
        onChanged() {
            if (this.subscriber.length) {
                for(let i=0;i<this.subscriber.length;i++)
                    this.subscriber[i]({value: this.value, position: this.percent});
            }
        }
    }


    class RangeSlider {
        constructor(idRange, step, min, max) {
            this.minRange = new InputRange(idRange, step, min, max);
            this.maxRange = new InputRange(idRange, step, min, max);

            // this.minRange.maxBorder=96;
            // this.maxRange.minBorder= 0;

            this.minRange.setValue(min);
            this.maxRange.setValue(max);

            this.minRange.line.style.display = 'none';

            this.minRange.subscribe(value=>{
                this.maxRange.minBorder=value.position + 4;
                this.maxRange.line.style.width = this.maxRange.percent-this.minRange.percent + '%';
            });
            this.maxRange.subscribe(value=>{
                this.minRange.maxBorder=value.position - 4;
                this.maxRange.line.style.width = this.maxRange.percent-this.minRange.percent + '%';
            });
        }
    }
    

    
    class InputForm {
        constructor(idInput) {
            this.idInput = document.querySelector(idInput);
            this.subscribers={
                input:[],
                onblur:[]
            };
            this.value;
            this.onChanged();
        }
    
        setValueInput(value) {
            value = this.convertView(value);
            this.idInput.value = value;
        } 

        convertView(n) {
            n += "";
            return n.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
        }
            
        subscribe(event, func) {
            if(event in this.subscribers){
                this.subscribers[event].push(func);
            }
        }
    
        onChanged() {
            this.idInput.addEventListener('input', event => {    
                const target = event.target;
                if (!Number.isInteger(+target.value)) {
                    target.value = target.value.replace(/[^\d]/g, '');
                }
                
                let value = target.value.split(' ').join('');         
                if(this.subscribers['input'].length){
                    for(let i=0;i<this.subscribers['input'].length;i++){
                        this.subscribers['input'][i](value);
                    }
                }
            });
            this.idInput.addEventListener('blur',event=>{
                if(this.subscribers['onblur'].length){
                    for(let i=0;i<this.subscribers['onblur'].length;i++){
                        this.subscribers['onblur'][i]();
                    }
                }
            });
        }      
    }



    
    let range = new RangeSlider('#range', 5000, 0, 10000000);
    let minInput = new InputForm('#min');
    let maxInput = new InputForm('#max');

    range.minRange.subscribe(({value}) => {
        minInput.setValueInput(value);
    });

    range.maxRange.subscribe(({value}) => {
        maxInput.setValueInput(value);
    });

    minInput.subscribe('input', value => {
        range.minRange.setValue(+value);
    });

    minInput.subscribe('onblur', ()=>{
        range.minRange.recalculateValue();
    });

    maxInput.subscribe('input',value => {
        range.maxRange.setValue(+value);
    });

    maxInput.subscribe('onblur', ()=>{
        range.maxRange.recalculateValue();
    });

    range.minRange.setValue(1000000);
    range.maxRange.setValue(5000000);

});


