const sort = require('./helpers/sort');

process.on('message', (event) => {
    switch (event.type) {
        case 'SORT':
        {
            console.time('timeSort');
            let array = event.array;
            let sorted_array = sort.quickSort(array, 0, array.length - 1);
            console.timeEnd('timeSort', 'timeSort');
            process.send(sorted_array);
            break;

        }
        case 'MERGE':
        {
            console.time('timeMerge');

            const {main, secondary} = event.data;
            let sorted_array = sort.merge(main, secondary);
            console.timeEnd('timeMerge', 'timeMerge');

            process.send(sorted_array);
            break;
        }
        default:
        {
            process.send(event);
        }
    }
});

