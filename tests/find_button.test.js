/* eslint-disable no-undef */
import { shallow } from "enzyme";
import React from "react";
import { FriendButton } from "../src/components/buttons/friend_button";
import axios from "../src/react_utils/axios";

jest.mock("../src/react_utils/axios");

const friendButton = shallow(<FriendButton id={1}/>);

test(`When no bio is passed to it, an 'Add' button is rendered.`, () => {
    expect(bioEditor.find("button").text()).toBe("Add");
});

test(`When no bio is passed to it, an 'Add' button is rendered.`, () => {
    expect(bioEditorHasBio.find("button").text()).toBe("Edit");
});

test(`Clicking "Edit" button causes a textarea and a "Save" button to be rendered..`, () => {
    bioEditorHasBio.find("button").simulate('click');
    expect(bioEditorHasBio.state('isEditing')).toBeTruthy();
});
