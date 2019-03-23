import JsDataRest from "../JsDataRest";

const data = {
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

describe("JsDataTest module", () => {
    const instance = new JsDataRest(data);

    it("should instantiate", () => {
        expect(instance).toBeDefined();
        expect(instance.content()).toBe(data);
    });

    it("should resolve field value for key", () => {
        expect(instance.get("sample")).toBe(data.sample);
        expect(instance.get("foo.bar")).toBe(data.foo.bar);
    });

    it("should resolve self()", () => {
        expect(instance.self()).toBe(data._links.self.href);
    });

    it("should resolve embedded()", () => {
        const createdBy = instance.embedded("createdBy");
        expect(createdBy).toBeInstanceOf(JsDataRest);
        expect(createdBy.get("username")).toBe(data._embedded.createdBy.username);
        expect(createdBy.self()).toBe(data._embedded.createdBy._links.self.href);
    });
});

describe("JsDataTest ifPresent", () => {
    const instance = new JsDataRest(data);

    it("should invoke consumer with value", () => {
        const consumer = jest.fn();
        instance.ifPresent("foo.bar", consumer);
        expect(consumer).toHaveBeenCalled();
    });

    it("should not invoke consumer", () => {
        const consumer = jest.fn();
        instance.ifPresent("something.different", consumer);
        expect(consumer).not.toHaveBeenCalled();
    });
});
