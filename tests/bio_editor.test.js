/* eslint-disable no-undef */
import { shallow } from "enzyme";
import React from "react";
import { BioEditor } from "../src/components/modules/bio_editor";
import axios from "../src/react_utils/axios";

jest.mock("../src/react_utils/axios");

const bioEditor = shallow(<BioEditor />);

test(`1: When no bio is passed to it, an 'Add' button is rendered.`, () => {
    expect(bioEditor.find("button").text()).toBe("Add");
});

test(`3a: Clicking "Add" button causes a textarea and a "Save" button to be rendered..`, () => {
    bioEditor.find("button").simulate('click');
    expect(bioEditor.find("button").text()).toBe("Save");
});

//TODO:
test(`4a: Clicking the "Save" button causes an ajax request. `, () => {
    bioEditor.find("button").simulate('click');
    expect(axios.mockR).toBeTruthy();
});

//TODO:
test(`5a: When the mock request is successful, 
the function that was passed as a prop to the component gets called.`, () => {
    bioEditor.find("button").simulate('click');
    expect(axios.mockR).toBeTruthy();
});


const bioEditorHasBio = shallow(<BioEditor  bio="Fake bio"/>);

test(`2: When a bio is passed to it, an 'Add' button is rendered.`, () => {
    expect(bioEditorHasBio.find("button").text()).toBe("Edit");
});

test(`3b: Clicking "Edit" button causes a textarea and a "Save" button to be rendered..`, () => {
    bioEditorHasBio.find("button").simulate('click');
    expect(bioEditorHasBio.state('isEditing')).toBeTruthy();
});

//TODO:
test(`4b: Clicking the "Save" button causes an ajax request. `, () => {
    axios.get.mockResolvedValue([
        {
            age: 43
        },
        {
            age: 27
        },
        {
            age: 68
        }
    ]
    bioEditorHasBio.find("button").simulate('click');
    expect(axios.mockR).toBeTruthy();
});

test(`5b: When the mock request is successful, 
the function that was passed as a prop to the component gets called.`, () => {
    bioEditor.find("button").simulate('click');
    expect(axios.mockR).toBeTruthy();
});

