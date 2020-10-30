import React from 'react';
import ReactDOM from 'react-dom';
import NewOrderStepper from '../components/NewOrderStepper';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const thing = {
    items: [],
    selected: [],
    current_step: 0,
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    customer_membership: "",
    customer_other: "",
    business: "",
    total: 0,
    next_step: () => {
        switch (0) {
            case 0:
                return true;
            default:
                return false;
        }
    },
    prev_step: () => {
        switch (0) {
            case 0:
                return false;
            default:
                return false;
        }
    }
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewOrderStepper props={thing}/>, div);
});

it('pushes buttons!', () => {
    const wrapper = shallow(
        <NewOrderStepper props={thing} />
    );
    console.log(wrapper.debug());
    const button = wrapper.find("#pushME");
    button.simulate('click');
});
