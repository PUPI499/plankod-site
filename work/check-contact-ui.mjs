import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('./hostland-catalog.js', import.meta.url), 'utf8');
const contactSource = source.slice(source.indexOf('// Contact form: consent gate'));
const script = contactSource.slice(contactSource.indexOf('(function'));
const element = () => ({ value: '', hidden: true, disabled: false, checked: false, events: {},
  addEventListener(type, handler) { this.events[type] = handler; } });

for (const scenario of ['queued', 'rejected', 'unconfirmed']) {
  const name = element(), contact = element(), message = element(), consent = element();
  const button = element(), ok = element(), error = element(), info = element(), honey = element();
  const fields = [name, contact, message];
  const objectType = element(); objectType.value = 'Частный дом';
  const form = {
    events: {},
    querySelectorAll() { return [{ querySelector: () => name }, { querySelector: () => contact }]; },
    querySelector(selector) { return { textarea: message, 'input[name="website"]': honey,
      'select[name="object_type"]': objectType, 'input[type="checkbox"]': consent, 'button.mail-link': button, '.form-status-ok': ok,
      '.form-status-error': error, '.form-request-id': info }[selector]; },
    addEventListener(type, handler) { this.events[type] = handler; },
    reportValidity() { return true; }, setAttribute() {}, removeAttribute() {},
    reset() { fields.forEach(field => { field.value = ''; }); consent.checked = false; },
  };
  let calls = 0, finish;
  vm.runInNewContext(script, {
    document: { querySelectorAll: () => [form] },
    window: { setTimeout: () => 1, clearTimeout() {} }, URLSearchParams, AbortController,
    fetch: (_url, options) => {
      calls++;
      assert.equal(new URLSearchParams(options.body).get('consent'), '1');
      assert.equal(new URLSearchParams(options.body).get('message'), 'Тип объекта: Частный дом\n\nQA');
      return new Promise(resolve => { finish = resolve; });
    },
  });
  assert(button.disabled);
  fields.forEach(field => { field.value = 'QA'; field.events.input(); });
  assert(button.disabled);
  consent.checked = true; consent.events.change(); assert(!button.disabled);
  form.events.submit({ preventDefault() {} });
  assert.equal(calls, 1); assert(button.disabled); assert(message.readOnly); assert(consent.disabled);
  message.events.input(); assert(button.disabled);
  form.events.submit({ preventDefault() {} }); assert.equal(calls, 1);
  finish({ ok: scenario !== 'rejected', json: async () => ({ ok: scenario !== 'rejected',
    status: scenario === 'queued' ? 'queued' : undefined, request_id: 'ABCDEF123456' }) });
  await new Promise(resolve => setImmediate(resolve));
  assert(!message.readOnly); assert(!consent.disabled);
  assert.equal(info.textContent, 'Номер обращения: ABCDEF123456');
  if (scenario === 'queued') {
    assert(!ok.hidden); assert(button.disabled); assert.equal(message.value, '');
    name.value = 'New'; name.events.input(); assert(ok.hidden); assert(info.hidden);
  } else {
    assert(!error.hidden); assert(ok.hidden); assert(!button.disabled); assert.equal(message.value, 'QA');
  }
  console.log('PASS form ' + scenario);
}
