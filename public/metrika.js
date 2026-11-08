(function () {
if (["localhost", "127.0.0.1", "::1", "[::1]"].includes(location.hostname)) return;
// Yandex.Metrika — shared by the application and the static Hostland export.
(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t); a=e.getElementsByTagName(t)[0]; k.async=1; k.src=r; a.parentNode.insertBefore(k,a);
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=113254722', 'ym');

window.ym(113254722, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});

window.ym(113254722, "getClientID", function(id) {
    if (typeof id === "string" && /^[0-9]{1,32}$/.test(id)) window.plancodClientID = id;
});
})();
