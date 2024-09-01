

class Console {
    content: string
    forceUpdate: () => Promise<void>;

    constructor() {
        this.content = ""
        this.forceUpdate = () => new Promise((_resolve, reject) => {
            reject("forceUpdate for console not initialized");
        });
    }

    private isJSON(value: string): boolean {
        try {
            JSON.parse(value);
            return true;
        } catch (e) {
            return false;
        }
    }


    private formatTable(data: any[]): string {
        if (data.length === 0) return '';

        // Extract headers from the first item
        const headers = Object.keys(data[0]);

        // Determine column widths
        const columnWidths = headers.reduce((acc, header) => {
            acc[header] = Math.max(
                ...data.map(item => String(item[header] || '').length),
                header.length
            );
            return acc;
        }, {} as Record<string, number>);

        // Create a helper function to pad text with dashes
        const padWithDashes = (text: string, width: number): string => {
            const textLength = text.length;
            if (textLength >= width) return text;
            return text + '-'.repeat(width - textLength);
        };

        // Format header row
        const headerRow = headers.map(header => padWithDashes(header, columnWidths[header])).join(' | ');

        // Format separator line
        const separator = headers.map(header => '-'.repeat(columnWidths[header])).join('-|-');

        // Format each row
        const rows = data.map(item =>
            headers.map(header => padWithDashes((item[header] || '').toString(), columnWidths[header])).join(' | ')
        );

        // Combine everything
        return [headerRow, separator, ...rows].join('\n');
    }

    async append(value: string) {
        if (this.isJSON(value)) {
            try {
                const data = JSON.parse(value);
                if (Array.isArray(data)) {
                    const formattedTable = this.formatTable(data);
                    this.content = this.content.concat(formattedTable + "\n");
                } else {
                    this.content = this.content.concat(value + "\n");
                }
            } catch (e) {
                this.content = this.content.concat(value + "\n");
            }
        } else {
            this.content = this.content.concat(value + "\n");
        }
        await this.forceUpdate();
    }
}

export default Console;