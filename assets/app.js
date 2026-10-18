const header=document.querySelector('.site-header');
const qty=document.querySelector('#quantity');
const summaryQty=document.querySelector('#summaryQuantity');
const summaryTotal=document.querySelector('#summaryTotal');
const toast=document.querySelector('#toast');
const lineUrl='https://lin.ee/NnF4M0Y';
const unitPrice=180;

document.querySelector('#year').textContent=new Date().getFullYear();
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20),{passive:true});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

function updateSummary(value){
  const next=Math.min(99,Math.max(1,Number(value)||1));
  summaryQty.textContent=next;
  summaryTotal.textContent=(next*unitPrice).toLocaleString('zh-TW');
  return next;
}

document.querySelectorAll('[data-step]').forEach(button=>{
  button.addEventListener('click',()=>{
    qty.value=updateSummary((Number(qty.value)||1)+Number(button.dataset.step));
  });
});
qty.addEventListener('input',()=>updateSummary(qty.value));

function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)}

document.querySelector('#orderForm').addEventListener('submit',async event=>{
  event.preventDefault();
  const data=new FormData(event.currentTarget);
  const count=Math.min(99,Math.max(1,Number(data.get('quantity'))||1));
  const order=[
    '【豬鱻生｜鵝油辣椒訂購】',
    `姓名：${data.get('name')}`,
    `電話：${data.get('phone')}`,
    `LINE 名稱：${data.get('lineName')||'未填'}`,
    `單價：NT$${unitPrice}`,
    `數量：${count} 罐`,
    `商品小計：NT$${(count*unitPrice).toLocaleString('zh-TW')}`,
    `希望取貨門市：${data.get('store')||'於賣貨便選擇'}`,
    `備註：${data.get('note')||'無'}`
  ].join('\n');
  try{await navigator.clipboard.writeText(order);showToast('訂購資料已複製');}
  catch{showToast('資料已整理，請手動複製');}
  document.querySelector('#formFeedback').textContent='資料已整理完成；請加入官方 LINE 確認價格與賣貨便連結。';
  window.location.assign(lineUrl);
});
