import { renderComponent } from './v-dom'
export default class Component {
  props: object;
  state: object;
  constructor(props) {
    this.props = props;
    this.state = {};
  }
  setState(state) {
    if (this.state === state) {
      return;
    }
    this.state = state;
    renderComponent(this);
  }
}
