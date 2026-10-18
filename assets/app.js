const header=document.querySelector('.site-header');
const qty=document.querySelector('#quantity');
const summaryQty=document.querySelector('#summaryQuantity');
const toast=document.querySelector('#toast');
const lineUrl='https://lin.ee/NnF4M0Y';

document.querySelector('#year').textContent=new Date().getFullYear();
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20),{passive:true});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('[data-step]').forEach(button=>{
  button.addEventListener('click',()=>{
    const next=Math.min(99,Math.max(1,(Number(qty.value)||1)+Number(button.dataset.step)));
    qty.value=next;summaryQty.textContent=next;
  });
});
qty.addEventListener('input',()=>summaryQty.textContent=Math.min(99,Math.max(1,Number(qty.value)||1)));

document.querySelectorAll('.js-line').forEach(button=>button.addEventListener('click',()=>window.open(lineUrl,'_blank','noopener')));

function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)}

document.querySelector('#orderForm').addEventListener('submit',async event=>{
  event.preventDefault();
  const data=new FormData(event.currentTarget);
  const order=[
    '【豬鱻生｜鵝油辣椒訂購】',
    `姓名：${data.get('name')}`,
    `電話：${data.get('phone')}`,
    `LINE 名稱：${data.get('lineName')||'未填'}`,
    `數量：${data.get('quantity')} 罐`,
    `希望取貨門市：${data.get('store')||'於賣貨便選擇'}`,
    `備註：${data.get('note')||'無'}`
  ].join('\n');
  try{await navigator.clipboard.writeText(order);showToast('訂購資料已複製');}
  catch{showToast('資料已整理，請手動複製');}
  document.querySelector('#formFeedback').textContent='資料已整理完成；請加入官方 LINE 確認價格與賣貨便連結。';
  setTimeout(()=>window.open(lineUrl,'_blank','noopener'),350);
});
