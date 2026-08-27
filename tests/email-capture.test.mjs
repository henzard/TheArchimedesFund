import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

// Newsletter capture posts to Henzard's own personal-os server rather than a
// third-party provider, so the subscriber list lives on infrastructure he
// controls. These tests guard the parts that fail silently: a form that
// posts nowhere, a honeypot a screen reader would read aloud, and a
// confirmation page that tells someone they subscribed when they did not.
//
// They replace an earlier pair asserting the opposite contract (that NO
// form should render until a Buttondown account was confirmed). That
// behaviour is deliberately obsolete now, so the tests were rewritten to
// the new contract rather than deleted.

const contact = () => readFileSync('dist/contact/index.html', 'utf8');

test('the contact page posts to the subscribe endpoint', () => {
  const doc = contact();
  assert.match(doc, /<form[^>]+action="https:\/\/[^"]+\/subscribe"/i, 'form must post to the subscribe endpoint');
  assert.match(doc, /method="post"/i);
  assert.match(doc, /<label[^>]*for="bd-email"/, 'the email input needs a real label');
  assert.match(doc, /type="email"[^>]*required/, 'the email input must be typed and required');
});

test('the honeypot is hidden from humans AND assistive technology', () => {
  const doc = contact();
  assert.match(doc, /name="website"/, 'the honeypot field should be present');
  // type="hidden" is skipped by naive bots, which defeats the purpose, and
  // a field left in the accessibility tree gets read aloud to screen-reader
  // users who then cannot tell it is a trap.
  assert.doesNotMatch(doc, /name="website"[^>]*type="hidden"/, 'honeypot must not be type=hidden');
  assert.match(doc, /aria-hidden="true"/, 'honeypot wrapper must be aria-hidden');
  assert.match(doc, /tabindex="-1"/, 'honeypot must be out of the tab order');
});

test('the form reports which page it came from', () => {
  assert.match(contact(), /name="source"/, 'a source field lets the server tell pages apart');
});

test('every outcome the server can redirect to has a real page', () => {
  // The server answers with a distinct PATH per outcome because the site has
  // zero client JS and nothing can read a query string at view time. A
  // missing page here means a reader lands on a 404 after handing over
  // their address.
  const pages = [
    'dist/subscribed/index.html',
    'dist/subscribed/invalid/index.html',
    'dist/subscribed/slow-down/index.html',
    'dist/subscribed/error/index.html',
  ];
  for (const p of pages) {
    assert.ok(existsSync(p), `${p} is missing, so that redirect lands on a 404`);
  }
});

test('the failure pages do not claim the address was saved', () => {
  // The first version of this page rendered every state and used CSS to
  // always show the success one, which told people whose address failed
  // validation that they were subscribed. That is a confident lie about
  // their own data, and this test exists so it cannot come back.
  for (const p of ['dist/subscribed/invalid/index.html', 'dist/subscribed/error/index.html']) {
    const doc = readFileSync(p, 'utf8');
    assert.doesNotMatch(doc, /you are on the list/i, `${p} claims success on a failure page`);
    assert.match(doc, /not saved|did not look right/i, `${p} should say plainly that nothing was stored`);
  }
});

test('the success page confirms without promising an email that never comes', () => {
  const doc = readFileSync('dist/subscribed/index.html', 'utf8');
  assert.match(doc, /you are on the list/i);
  assert.doesNotMatch(doc, /confirm your email|check your inbox/i, 'no confirmation email is sent, so do not promise one');
});
