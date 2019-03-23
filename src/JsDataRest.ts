import { get, isEmpty } from "lodash";

class JsDataRest {
    private data: object = {};

    /**
     * Constructor that accepts the objects content.
     * @param content HATEOAS content
     */
    constructor(content: object) {
        this.data = content;
    }

    /**
     * Returns this objects content.
     */
    public content(): object {
        return this.data;
    }

    /**
     * Returns the self reference for this HATEOAS object.
     */
    public self(): object {
        return get(this.data, "_links.self.href");
    }

    /**
     * Returns the value for given path.
     * @param path path to value
     */
    public get(path: string): any {
        return get(this.data, path);
    }

    /**
     * Returns the embedded object for given name.
     * @param name name of embedded object
     */
    public embedded(name: string): any {
        const embedded = this.get(`_embedded.${name}`);
        return embedded ? new JsDataRest(embedded) : null;
    }

    /**
     * Returns the link object for given name.
     * @param name name of link object
     */
    public link(name: string): any {
        return this.get(`_links.${name}`);
    }

    /**
     * Passes value for given path to consumer.
     * @param path path to value
     * @param consumer consumer to invoke with value
     */
    public ifPresent(path: string, consumer: (data: any) => any) {
        const data = this.get(path);
        if (!isEmpty(data)) {
            return consumer(data);
        }
    }
}

export default JsDataRest;
