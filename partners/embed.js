(function(){'use strict';
var s=document.currentScript;if(!s)return;
var slug=(s.getAttribute('data-slug')||'').trim().toLowerCase();
var receipt=(s.getAttribute('data-receipt')||'').trim().toLowerCase();
var market=(s.getAttribute('data-market')||'br').trim().toLowerCase();
var partner=(s.getAttribute('data-partner')||location.hostname||'publisher').trim().toLowerCase().replace(/[^a-z0-9._-]+/g,'-').slice(0,64);
var label=(s.getAttribute('data-label')||'CRISBRAIN Decision — reduza o risco antes de comprar.').trim();
if(!/^(br|us|de|pl|gb|fr|ca|es|it|nl|se)$/.test(market))market='br';
var href='';
if(/^receipt-web-[a-z0-9]{16,48}$/.test(receipt)){
 href='https://crisbrain.github.io/p/?receipt='+encodeURIComponent(receipt)+'&source=partner_embed&partner='+encodeURIComponent(partner);
}else if(/^[a-z0-9][a-z0-9-]{10,180}$/.test(slug)){
 href='https://crisbrain.github.io/d/'+encodeURIComponent(slug)+'/?market='+encodeURIComponent(market)+'&source=partner_embed&partner='+encodeURIComponent(partner);
}else{return;}
var a=document.createElement('a');a.href=href;a.textContent=label;a.rel='sponsored nofollow noopener';a.target='_blank';a.setAttribute('data-crisbrain-decision','v2');a.style.cssText='display:inline-block;padding:12px 16px;border-radius:10px;background:#111;color:#fff;text-decoration:none;font:700 14px/1.3 Arial,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.15)';
var target=s.getAttribute('data-target');var host=target?document.querySelector(target):s.parentNode;if(host)host.insertBefore(a,target?null:s.nextSibling);
})();
