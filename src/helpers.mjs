function section(name, options) {
    this.sections ??= {};
    this.sections[name] = options.fn(this);

    return null;
}


export default { section };
