const fs = require('fs');
const cp = require('child_process');
const FILE_PATH = './array.txt';
const os = require('os');
const cpu = os.cpus().length;
const  Worker =  require('./Worker');



fs.readFile(FILE_PATH, (err, data) => {

    if (err) {
        throw err;
    }
    const arr = JSON.parse(data);
    let processes = [];
    console.time('time');

    for (let i = 0; i < cpu ; i++) {
        processes.push(cp.fork(`./child.js`));
    }
    
    let w = new Worker(processes,arr);
    console.time('time');
    w.onDone((data)=>{
        console.timeEnd('time');
        fs.writeFile('./result.txt', JSON.stringify(data), 'utf8',(err)=>{});
    });
    w.init();

});

