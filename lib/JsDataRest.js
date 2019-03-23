"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var JsDataRest = /** @class */ (function () {
    /**
     * Constructor that accepts the objects content.
     * @param content HATEOAS content
     */
    function JsDataRest(content) {
        this.data = {};
        this.data = content;
    }
    /**
     * Returns this objects content.
     */
    JsDataRest.prototype.content = function () {
        return this.data;
    };
    /**
     * Returns the self reference for this HATEOAS object.
     */
    JsDataRest.prototype.self = function () {
        return lodash_1.get(this.data, "_links.self.href");
    };
    /**
     * Returns the value for given path.
     * @param path path to value
     */
    JsDataRest.prototype.get = function (path) {
        return lodash_1.get(this.data, path);
    };
    /**
     * Returns the embedded object for given name.
     * @param name name of embedded object
     */
    JsDataRest.prototype.embedded = function (name) {
        var embedded = this.get("_embedded." + name);
        return embedded ? new JsDataRest(embedded) : null;
    };
    /**
     * Returns the link object for given name.
     * @param name name of link object
     */
    JsDataRest.prototype.link = function (name) {
        return this.get("_links." + name);
    };
    /**
     * Passes value for given path to consumer.
     * @param path path to value
     * @param consumer consumer to invoke with value
     */
    JsDataRest.prototype.ifPresent = function (path, consumer) {
        var data = this.get(path);
        if (!lodash_1.isEmpty(data)) {
            return consumer(data);
        }
    };
    return JsDataRest;
}());
exports.default = JsDataRest;
