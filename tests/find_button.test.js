/* eslint-disable no-undef */
import { shallow } from "enzyme";
import React from "react";
import { FriendButton } from "../src/components/buttons/friend_button";
import axios from "../src/react_utils/axios";

jest.mock("../src/react_utils/axios");

const friendButton = shallow(<FriendButton id={1}/>);

test('Props get through to the component', () => {
    expect( friendButton.pro('id') ).toBe('1');

    expect(
        friendButton.first().prop('className')
    ).toBe('hello');
});

