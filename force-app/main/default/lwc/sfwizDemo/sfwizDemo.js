import { LightningElement } from 'lwc';

export default class SfwizDemo extends LightningElement {
  isToggled = false;

  get toggleStatus() {
    return this.isToggled ? 'ON' : 'OFF';
  }

  handleToggle(event) {
    this.isToggled = event.detail.checked;
  }
}
