// One draft per tab and payload. Storage contains only a fingerprint and random key.
// If durable browser storage is unavailable, fail before sending a non-replayable POST.
window.plancodEnquiry = async function (params, signal) {
  const hex = bytes => Array.from(bytes, x => x.toString(16).padStart(2, '0')).join('');
  const identity = ['name','contact','message','service'].map(k => (params.get(k) || '').trim());
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(identity)));
  const slot = 'plancod.enquiry.v1:' + hex(new Uint8Array(digest));
  const key = sessionStorage.getItem(slot) || hex(crypto.getRandomValues(new Uint8Array(16)));
  sessionStorage.setItem(slot, key);
  params.set('submission_key', key);
  const post = () => fetch('/contact.php', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:params.toString(), signal});
  const res = await post();
  const data = await res.json();
  if (!(res.ok && data.ok && data.status === 'queued' && /^[A-F0-9]{12}$/.test(data.request_id))) {
    return {ok:false, data};
  }
  data.emit_goal = false;
  if (typeof window.ym === 'function') {
    // Only request the one-time grant AFTER observing acceptance. A lost mail
    // response can therefore be replayed without losing the ordinary goal.
    params.set('action','claim_goal');
    try {
      const claim = await post(), receipt = await claim.json();
      data.emit_goal = claim.ok && receipt.request_id === data.request_id && receipt.emit_goal === true;
    } catch { /* Delivery was confirmed. Never retry mail because analytics failed. */ }
  }
  if (sessionStorage.getItem(slot) === key) sessionStorage.removeItem(slot);
  return {ok:true,data};
};
