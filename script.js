window.addEventListener('DOMContentLoaded', () => {
    const tabParent = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    loader = document.querySelector('.loader');

    setTimeout(() => {
        loader.style.opacity = '0'
        setTimeout(() => {
            loader.style.display = 'none'
        }, 500)
    }, 2000)
    
    // ______TABS________
    function hideTab(){
        tabsContent.forEach(item => {
            item.style.display = 'none'
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }
    function showTab(i = 0){
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active')
    }
    hideTab();
    showTab();
    
    tabParent.addEventListener('click', (e) => {
        if(e.target && e.target.classList.contains('tabheader__item')){
            tabs.forEach((item, index) =>{
                if(item == e.target){
                    hideTab();
                    showTab(index);
                }
            })
        }
    })
    
    //! +___________TIME____________
    const deadline = '2022-12-31'

    function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds
      const timer = Date.parse(endtime) - Date.parse(new Date())
  
      if (timer <= 0) {
        days = 0
        hours = 0
        minutes = 0
        seconds = 0
      } else {
        days = Math.floor(timer / (1000 * 60 * 60 * 24))
        hours = Math.floor((timer / (1000 * 60 * 60)) % 24)
        minutes = Math.floor((timer / 1000 / 60) % 60)
        seconds = Math.floor((timer / 1000) % 60)
      }
  
      return { timer, days, hours, minutes, seconds }
    }
  
    function getZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`
      } else {
        return num
      }
    }
  
    function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updatClock, 1000)
  
      updatClock()
  
      function updatClock() {
        const t = getTimeRemaining(endtime)
  
        days.innerHTML = getZero(t.days)
        hours.innerHTML = getZero(t.hours)
        minutes.innerHTML = getZero(t.minutes)
        seconds.innerHTML = getZero(t.seconds)
  
        if (t.timer <= 0) {
          clearInterval(timeInterval)
        }
      }
    }
  
    setClock('.timer', deadline)


    // ______________MODAL_______________

    const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');
    const hideModal = () => {
      modal.style.display = 'none'
      document.body.style.overflow = 'auto'
    }
    const showModal = () => {
      modal.style.display = 'block'
      document.body.style.overflow = 'hidden'
      // clearInterval(modalTimer)
    }
    modalTrigger.forEach(item => {
      item.addEventListener('click', showModal)
    })
    modalCloseBtn.addEventListener('click', hideModal)
    modal.addEventListener('click', e => {
      if(e.target == modal){
        hideModal()
      }
    })
    document.addEventListener('keydown', e => {
      if(e.code === 'Backspace' && modal.classList.contains('show')){
        hideModal()
      }
    })
    // const modalTimer = setTimeout(showModal, 5 * 1000)


    //!  ******* ______CARDS WITH CLASS_______ *************
    class MenuCard{
      constructor(src, title, desr, price, parentSelector, ...classes){
        this.src = src
        this.title = title
        this.desr = desr
        this.price = price
        this.classes = classes
        this.parent = document.querySelector(parentSelector)
        this.transfer = 11000
        this.changetoUZS()
      }
      changetoUZS(){
        this.price = this.price * this.transfer
      }
      render(){
        const element = document.createElement('div');
        
        if(this.classes.length === 0){
          this.element = 'menu__item'
          element.classList.add(this.element)
        }else{
          this.classes.forEach(classname => element.classList.add(classname));
        }


        // <img src=${this.src} alt="vegy" />
        // <h3 class="menu__item-subtitle"}>${this.title}</h3>
        // <div class="menu__item-descr">${this.desr}</div>
        // <div class="menu__item-divider"></div>
        // <div class="menu__item-price">
        //   <div class="menu__item-cost">Price:</div>
        //   <div class="menu__item-total"><span>${this.price}</span>uzs month</div>
        // </div>
        element.innerHTML = `
          <div class="card" style="width: 18rem;">
            <img src=${this.src} class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${this.title}</h5>
              <p class="card-text">${this.desr}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${this.price}uzs/month</li>
            </ul>
          </div>
        `
        this.parent.append(element)
      }
    }
    new MenuCard(
      'https://media.istockphoto.com/vectors/simple-star-shape-icon-vector-logo-template-illustration-design-eps-vector-id1254840126?k=20&m=1254840126&s=170667a&w=0&h=1oklD1Vl57U6AjcuNtGiAPDPcwbRUYHhWZUGI2EQugA=',
      'Plan "Usual"',
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
      10,
      '.menu .container'
      ).render()
    new MenuCard(
      'https://thumbs.dreamstime.com/b/gold-star-isolated-white-background-99403044.jpg',
      'Plan “Premium”',
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
      15,
      '.menu .container'
      ).render()
    new MenuCard(
      'https://thumbs.dreamstime.com/z/star-icon-template-vector-illustration-design-132105016.jpg',
      'Plan "VIP"',
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
      20,
      '.menu .container'
      ).render()
})
