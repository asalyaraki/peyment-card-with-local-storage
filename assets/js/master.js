const cardNum = document.querySelectorAll('#cardNum>input')
const holder = document.getElementById('holder')
const date = document.querySelectorAll('#date>input')
const cvv2 = document.getElementById('cvv2')
const inp = document.querySelectorAll('input')
const btn = document.querySelector('button')
const printNum = document.querySelectorAll('#printNum>h2')
const valid =  document.querySelectorAll('#valid>h2')
const _name = document.getElementById('name')

let listLi = []
let data = []








cvv2.addEventListener('focus', () => {
    document.getElementById('card').style.transform = 'rotateY(360deg)'
    document.getElementById('front').style.opacity = 0
    document.getElementById('back').style.opacity = 1
})

cardNum.forEach((item) => {
    item.addEventListener('focus', () => {
        document.getElementById('card').style.transform = 'rotateY(0deg)'
        document.getElementById('front').style.opacity = 1
        document.getElementById('back').style.opacity = 0
    })
})

holder.addEventListener('focus', () => {
    document.getElementById('card').style.transform = 'rotateY(0deg)'
    document.getElementById('front').style.opacity = 1
    document.getElementById('back').style.opacity = 0
})

date.forEach((val) => {
    val.addEventListener('focus', () => {
        document.getElementById('card').style.transform = 'rotateY(0deg)'
        document.getElementById('front').style.opacity = 1
        document.getElementById('back').style.opacity = 0
    })
})






cardNum.forEach((item, i) => {
    item.addEventListener('keyup', (e) => {


        if (e.keyCode == 8) {
            if (item.value.length == 0 && i != 0) {
                item.previousElementSibling.focus()
            }
        } else {
            if (e.keyCode > 57 || e.keyCode < 48) {
                alert('please enter a number!')
            }
            else {
                if (item.value.length >= 4) {
                    item.value = item.value.substring(0, 4)


                    if (i != 3) {
                        item.nextElementSibling.focus()
                    } else {
                        holder.focus()
                    }
                }

            }

        }
        printNum[i].innerHTML = e.target.value




    })

})






holder.addEventListener('keyup', (e) => {
    if (e.keyCode > 57 || e.keyCode < 48) {
        _name.innerHTML = e.target.value
    } else {
        alert('please enter a word!')
    }



})





date.forEach((val, i) => {
    val.addEventListener('keyup', (e) => {
        if (e.keyCode == 8) {
            if (val.value.length == 0 && i != 0) {
                val.previousElementSibling.focus()
            }
        } else {
            if (e.keyCode > 57 || e.keyCode < 48) {
                alert('please enter a number!')
            } else {
                if (val.value.length >= 2) {
                    val.value = val.value.substring(0, 2)

                    if (i == 0) {
                        val.nextElementSibling.focus()
                        document.querySelector('#valid>h3').style.paddingRight = '0px'
                    } else {
                        cvv2.focus()
                        document.getElementById('card').style.transform = 'rotateY(360deg)'
                        document.getElementById('front').style.opacity = 0
                        document.getElementById('back').style.opacity = 1

                    }

                }
            }
        }
       valid[i].innerHTML = e.target.value
    })


})





cvv2.addEventListener('keyup', (e) => {
    document.getElementById('printCvv2').innerHTML = e.target.value
})



// localStorage part : 

listLi = document.querySelectorAll('#list>li')
const myFetch = JSON.parse(localStorage.getItem('userData'))
myFetch != null && (data = [...myFetch])


btn.addEventListener('click', () => {
    const [inp1, inp2, inp3, inp4, inp5, inp6, inp7] = [inp[0].value, inp[1].value, inp[2].value, inp[3].value, inp[4].value, inp[5].value, inp[6].value]
    const temp = {
        cart1: inp1,
        cart2: inp2,
        cart3: inp3,
        cart4: inp4,
        user: inp5,
        year: inp6,
        month: inp7
    }
    data.push(temp)
    localStorage.setItem('userData', JSON.stringify(data))

})


// end stoore 

// onload data fetching ///////

myFetch?.map((val) => {
    let _li = document.createElement('li')
    _li.innerHTML = 'cardNumber: ' + val.cart1 + val.cart2 + val.cart3 + val.cart4 + ' Card Holder :' + val.user + ' month: ' + val.month + ' year: ' + val.year
    _li.setAttribute('data-cart1', val.cart1)
    _li.setAttribute('data-cart2', val.cart2)
    _li.setAttribute('data-cart3', val.cart3)
    _li.setAttribute('data-cart4', val.cart4)
    _li.setAttribute('data-month', val.month)
    _li.setAttribute('data-year', val.year)
    _li.setAttribute('data-holder', val.user)
    document.getElementById('list').appendChild(_li)

    // update #list>li 

    listLi = document.querySelectorAll('#list>li')


})

listLi.forEach((val) => {
    val.addEventListener('click', () => {
        inp[0].value = val.getAttribute('data-cart1')
        inp[1].value = val.getAttribute('data-cart2')
        inp[2].value = val.getAttribute('data-cart3')
        inp[3].value = val.getAttribute('data-cart4')
        inp[4].value = val.getAttribute('data-holder')
        inp[5].value = val.getAttribute('data-year')
        inp[6].value = val.getAttribute('data-month')
        printNum.forEach((val , i)=>{
            val.innerHTML = inp[i].value
        })
        let m = 5
        valid.forEach((val)=>{
            val.innerHTML = inp[m++].value
 
        })

        _name.innerHTML = inp[4].value



    })
})

