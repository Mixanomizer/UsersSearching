const list = document.querySelector('#list')
const filter = document.querySelector('#filter')
let USERS=[]

filter.addEventListener('input', (event)=>{
    console.log(event.target.value)
    const value=event.target.value.toLowerCase()
    const filtredUsers = USERS.filter((user)=>user.name.toLowerCase().includes(value))
    render (filtredUsers)
})

async function start(){ 
    list.innerHTML='Загрузка..'
    try{
        const resp= await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await resp.json()
        setTimeout(()=>{
            USERS=data
            render(data)
        },2000)
        
    } catch (err) {
        list.style.color='#d00b0b'
        list.innerHTML=err.message
    }
}

function render(users=[]){
    if (users.length===0){
        list.innerHTML='Пользователи отсутствуют'
    } else{
        const html= users.map(toHTML).join('')
    list.innerHTML=html
    }
}

function toHTML(user){
    return `<li class="pading">${user.name}</li>`
}

start()
