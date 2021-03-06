"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsDataRest_1 = require("../JsDataRest");
var data = {
    _embedded: {
        createdBy: {
            _links: {
                self: {
                    href: "https://example.com/user/sully",
                },
            },
            username: "sully",
        },
    },
    _links: {
        self: {
            href: "https://example.com/data/1",
        },
    },
    content: "Hello, World!",
    foo: {
        bar: "foobar",
    },
    sample: "sample",
};
describe("JsDataTest module", function () {
    var instance = new JsDataRest_1.default(data);
    it("should instantiate", function () {
        expect(instance).toBeDefined();
        expect(instance.content()).toBe(data);
    });
    it("should resolve field value for key", function () {
        expect(instance.get("sample")).toBe(data.sample);
        expect(instance.get("foo.bar")).toBe(data.foo.bar);
    });
    it("should resolve self()", function () {
        expect(instance.self()).toBe(data._links.self.href);
    });
    it("should resolve embedded()", function () {
        var createdBy = instance.embedded("createdBy");
        expect(createdBy).toBeInstanceOf(JsDataRest_1.default);
        expect(createdBy.get("username")).toBe(data._embedded.createdBy.username);
        expect(createdBy.self()).toBe(data._embedded.createdBy._links.self.href);
    });
});
describe("JsDataTest ifPresent", function () {
    var instance = new JsDataRest_1.default(data);
    it("should invoke consumer with value", function () {
        var consumer = jest.fn();
        instance.ifPresent("foo.bar", consumer);
        expect(consumer).toHaveBeenCalled();
    });
    it("should not invoke consumer", function () {
        var consumer = jest.fn();
        instance.ifPresent("something.different", consumer);
        expect(consumer).not.toHaveBeenCalled();
    });
});
