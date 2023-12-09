const balance = document.querySelector("#balance");
const moneyPlus = document.querySelector("#money-plus");
const moneyMinus = document.querySelector("#money-minus");
const ls = document.querySelector("#list");
const form = document.querySelector("#form");
const text = document.querySelector("#text");
const amount = document.querySelector("#amount");
const balancePost = document.querySelector('#balancePost');
const date = document.querySelector('#date');

let transactions=[];

function formatNum(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
}

function init(){
    list.innerHTML = "";
    transactions.forEach(addDataToList);
    calculateMoney();
}
function addDataToList(transactions){
    const sYmbol = transactions.amount < 0 ? "-" : "+";
    const status = transactions.amount < 0 ? "minus" : "plus";
    const items = document.createElement("li");
    result = formatNum(Math.abs(transactions.amount));
    items.classList.add(status);
    items.innerHTML = `${transactions.text}<span>${sYmbol}${result}</span><button class="btn-delete" onclick="removeData(${transactions.id})">X</button>`;
    ls.appendChild(items);
}
function autoID(){
    return Math.floor(Math.random()*1000000);
}

function calculateMoney(){
    const amounts = transactions.map(transactions=>transactions.amount);
    const totalBl = amounts.reduce((result,items)=>(result+=items),0).toFixed(2);
    const inCome = amounts.filter(items=>items>0).reduce((result,items)=>(result+=items),0).toFixed(2);
    const expEnse = (amounts.filter(items=>items<0).reduce((result,items)=>(result+=items),0)*-1).toFixed(2);

    balance.innerText ="$"+formatNum(totalBl);
    moneyPlus.innerText = "$"+formatNum(inCome);
    moneyMinus.innerText = "$"+formatNum(expEnse);
}
function removeData(id){
    transactions = transactions.filter(transactions=>transactions.id !== id)
    init();
}
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() !== '' || amount.value.trim() !== ''){
        const daTa ={
            id:autoID(),
            text:text.value,
            amount:+amount.value
        }
        transactions.push(daTa);
        addDataToList(daTa);
        calculateMoney();
        text.value ='';
        amount.value ='';
        balancePost.value='';
        date.value='';
    }
}
const scriptURL = '!!your url google script web application!!';
form.addEventListener("submit", e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))
});
form.addEventListener('submit',addTransaction);
init();
