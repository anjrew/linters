/* eslint-disable no-undef */
import { shallow } from "enzyme";
import React from "react";
import { BioEditor } from "../src/components/modules/bio_editor";
import axios from "../src/react_utils/axios";

jest.mock("../src/react_utils/axios");

const bioEditor = shallow(<BioEditor />);

test(`When no bio is passed to it, an 'Add' button is rendered.`, () => {
    expect(bioEditor.find("button").text()).toBe("Add");
});

// test(`Clicking "Add" button causes a textarea and a "Save" button to be rendered..`, () => {
//     expect(bioEditor.find("button").text()).toBe("Edit");
// });



const bioEditorHasBio = shallow(<BioEditor  bio="Fake bio"/>);

test(`When no bio is passed to it, an 'Add' button is rendered.`, () => {
    expect(bioEditorHasBio.find("button").text()).toBe("Edit");
});

test(`Clicking "Edit" button causes a textarea and a "Save" button to be rendered..`, () => {
    bioEditorHasBio.find("button").simulate('click');
    expect(bioEditorHasBio.state('isEditing')).toBeTruthy();
});
