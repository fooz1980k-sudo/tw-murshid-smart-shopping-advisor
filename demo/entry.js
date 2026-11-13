import { LitElement } from 'lit';
LitElement.registerSallaComponent = function (n) { if (!customElements.get(n)) customElements.define(n, this); };
await import('../dist/murshid-advisor.js');
await import('../dist/murshid-chat.js');
await import('../dist/murshid-gift.js');
await import('../dist/murshid-plan.js');
await import('../dist/murshid-size.js');
window.__ready = true;
