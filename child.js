const sort = require('./helpers/sort');

process.on('message', function(m) {
    console.log('CHILD got data',m[0]);
    let sorted_array = sort.quickSort(m,0,m.length-1);
    process.send(sorted_array);
});

