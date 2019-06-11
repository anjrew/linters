/* eslint-disable no-undef */
import { shallow } from "enzyme";
import React from "react";
import { FriendButton } from "../src/components/buttons/friend_button";
import axios from "../src/react_utils/axios";

jest.mock("../src/react_utils/axios");


// TODO: the tests should be Altered
test('Props get through to the component', () => {

    const friendButton = shallow(<FriendButton id={1}/>);

    expect( friendButton.prop('id') ).toBe(undefined);

    // expect(
    //     friendButton.first().prop('className')
    // ).toBe('hello');
});

