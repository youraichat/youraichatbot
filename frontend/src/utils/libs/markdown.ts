/*
* author: miroldev
* title: Markdown Utility
* overview: Utility functions for Markdown.
* */

export const convertHtmlTableToMarkdown = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.querySelector('table');

    if (!table) return '';

    const markdownRows: string[] = [];

    /* Parse thead */
    const headerCells = table.querySelectorAll('thead th');
    if (headerCells.length > 0) {
        const headerRow = '| ' + Array.from(headerCells)
            .map(cell => cell.textContent?.trim() || '')
            .join(' | ') + '| ';
        markdownRows.push(headerRow);
        markdownRows.push('|:' + Array(headerCells.length).fill('-').join('|:') + '|');
    }

    /* Parse tbody */
    const bodyRows = table.querySelectorAll('tbody tr');
    for (const row of Array.from(bodyRows)) {
        const rowCells = row.querySelectorAll('td');
        const markdownRow = '| ' + Array.from(rowCells)
            .map(cell => cell.textContent?.trim() || '')
            .join(' | ') + ' |';
        markdownRows.push(markdownRow);
    }

    /* return result */
    return markdownRows.join('\n');
}