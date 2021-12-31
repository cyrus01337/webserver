function section(name, options) {
    this._sections ??= {};
    this._sections[name] = options.fn(this);

    return null;
}


export default { section };
