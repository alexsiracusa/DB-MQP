

class Console {
    content: string
    forceUpdate: () => Promise<void>;

    constructor() {
        this.content = "content"
        this.forceUpdate = () => new Promise((_resolve, reject) => {
            reject("forceUpdate for console not initialized");
        });
    }

    async append(value: string) {
        this.content = this.content.concat(value);
        await this.forceUpdate();
    }
}

export default Console;