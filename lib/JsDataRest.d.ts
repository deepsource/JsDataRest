declare class JsDataRest {
    private data;
    /**
     * Constructor that accepts the objects content.
     * @param content HATEOAS content
     */
    constructor(content: object);
    /**
     * Returns this objects content.
     */
    content(): object;
    /**
     * Returns the self reference for this HATEOAS object.
     */
    self(): object;
    /**
     * Returns the value for given path.
     * @param path path to value
     */
    get(path: string): any;
    /**
     * Returns the embedded object for given name.
     * @param name name of embedded object
     */
    embedded(name: string): any;
    /**
     * Returns the link object for given name.
     * @param name name of link object
     */
    link(name: string): any;
    /**
     * Passes value for given path to consumer.
     * @param path path to value
     * @param consumer consumer to invoke with value
     */
    ifPresent(path: string, consumer: (data: any) => any): any;
}
export default JsDataRest;
