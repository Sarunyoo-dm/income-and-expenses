//* เข้าถึง element ใน index.html *//
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dataTransaction=[
    {id:1,text:"ค่าขนม",amount:-100},
    {id:2,text:"ค่าห้อง",amount:-3000},
    {id:3,text:"เงินเดือน",amount:+18000},
    {id:4,text:"ค่าอาหาร",amount:-600},
    {id:5,text:"ค่าเดินทาง",amount:-1000},

]

let transactions = dataTransaction;

function init(){
    list.innerHTML = '';
    transactions.forEach(addDataToList);
    calculateMoney();
}

function addDataToList(transactions){
    const symbol = transactions.amount < 0 ? '-' :'+'; //if transac.amount < 0 จะได้ - else จะได้ +
    const status = transactions.amount < 0 ? 'minus' : 'plus';
    const item = document.createElement('li');
    const result = formatNumber(Math.abs(transactions.amount))
    item.classList.add(status) // ค่าที่ได้จาก Status มาเพิ่ม class ให้กับ item
    // item.innerHTML= `ค่าซ่อมรถ <span>-฿400</span><button class="delete-btn">x</button>`;
    item.innerHTML =`${transactions.text}<span>${symbol}${result}</span><button class="delete-btn" onclick="removeData(${transactions.id})">x</button>`;
    list.appendChild(item); // นำ item ที่สร้างไปใส่ใน id list
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
function autoID(){
    return Math.floor(Math.random()*1000000) //สุ่มจาก 0 - 1000000
}


function calculateMoney(){
    
    const amounts = transactions.map(transactions => transactions.amount); // map array ค่า amount ออกมาเป็นก้อนใหม่ (amount)
    
    //*คำนวณผลรวมยอดคงเหลือ*//
    const total = amounts.reduce((result,item) => (result+=item),0).toFixed(2); //นำ amount มารวมกัน โดย result เก็บผลลัพ item เก็บตำแหน่ง index
    //* คำนวณรายรับ กรองตัวเลข > 0 *//
    const income = amounts.filter(item=>item>0).reduce((result,item) => (result+=item),0).toFixed(2); // กรองรายได้เสร็จแล้วมาบวกกัน
    //* คำนวณรายรับ กรองตัวเลข < 0 *//
    const expense = amounts.filter(item=>item<0).reduce((result,item) => (result+=item),0).toFixed(2); // กรองรายจ่ายเสร็จแล้วมาบวกกัน
    
    //* แสดงผลทางจอภาพ *//
    balance.innerText = `฿`+formatNumber(total);
    money_plus.innerText = `฿`+formatNumber(income);
    money_minus.innerText = `฿`+formatNumber(expense);
}

function removeData(id){
    transactions = transactions.filter(transactions=>transactions.id !== id) // กรองไอดีที่รับเข้ามาไปไว้ใน transactions แล้วเก็บที่เหลือไว้ เช่นรอบแรก ลบ id 1 จะเหลือ id 2,3 และเก็บ 2,3 ไว้ 
    init();
}


function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert("กรุณาป้อนข้อมูลให้ครบ");
    }else{
        const data ={
            id: autoID(),
            text: text.value,
            amount:+amount.value
        }
        transactions.push(data); // นำข้อมูลจาก data ใส่ transaction
        addDataToList(data); // เริ่มใช้งาน function addDataTolist
        calculateMoney(); // คำนวณMoney
        text.value=''; // เคลียช่องว่าง
        amount.value=''; // เคลียช่องว่าง
        // console.log(typeof(text.value));
        // console.log(typeof(+amount.value)); // ใส่ + ด้านหน้าแปลงจาก string เป็นตัวเลข
        // console.log(autoID());
    }
}

form.addEventListener('submit',addTransaction);
init();