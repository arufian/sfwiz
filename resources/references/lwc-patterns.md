# LWC Common Patterns

## Wire Adapters
```js
import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class MyComp extends LightningElement {
  @wire(getRecord, { recordId: '$recordId', fields: ['Account.Name'] })
  record;
}
```

## Reactive Properties
- `@api` — public (parent → child)
- `@track` — deprecated (all objects/arrays are now reactive)
- `@wire` — connect to data service

## Event Handling
```js
// Child fires event
this.dispatchEvent(new CustomEvent('myevent', { detail: { value } }));

// Parent handles
<c-child onmyevent={handleEvent}></c-child>
```

## Anti-Patterns
- Direct DOM manipulation (use reactive properties)
- Calling Apex imperatively when `@wire` works
- Not handling loading/error states from wire
