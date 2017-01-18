const fs = require('fs');
const cp = require('child_process');
const FILE_PATH = './array2.txt';
const os = require('os');
const sort = require('./helpers/sort');
const cpu = os.cpus().length;



fs.readFile(FILE_PATH, (err, data) => {

    if (err) {
        throw err;
    }
    const arr = JSON.parse(data);
    const part_length = arr.length/cpu;
    let tmp=[];
    console.time('time');
    for (let i = 0; i < cpu ; i++) {
        let n = cp.fork(`./child.js`);
        n.once('message', (m) => {
            tmp.push(m);
            if(tmp.length===cpu){
                while(tmp.length!==1){
                    let arrs = tmp.splice(0,2);
                    tmp.push(sort.merge(...arrs));
                }
                console.timeEnd('time');
                fs.writeFile('./result.txt', JSON.stringify(tmp[0]), 'utf8',(err)=>{});
            }
        });
        n.send(arr.splice(0, part_length));
    }
});
