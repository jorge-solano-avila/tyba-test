import "jasmine";

import { RouteMethod } from "./route-method";

describe("RouteMethod enum", () => {
  let getValue: string;
  let postValue: string;
  let putValue: string;
  let deleteValue: string;
  let patchValue: string;

  beforeEach(() => {
    getValue = "GET";
    postValue = "POST";
    putValue = "PUT";
    deleteValue = "DELETE";
    patchValue = "PATCH";
  });

  it("Should test the HTTP Get method value", () => {
    expect(RouteMethod.Get).toEqual(getValue);
  });

  it("Should test the HTTP Post method value", () => {
    expect(RouteMethod.Post).toEqual(postValue);
  });

  it("Should test the HTTP Put method value", () => {
    expect(RouteMethod.Put).toEqual(putValue);
  });

  it("Should test the HTTP Delete method value", () => {
    expect(RouteMethod.Delete).toEqual(deleteValue);
  });

  it("Should test the HTTP Patch method value", () => {
    expect(RouteMethod.Put === patchValue).toEqual(false);
  });
});
