const { spawn } = require('child_process')

function displayDirectory() {
    var args = ['-lh']

    directory = document.getElementById("dir").value;
    if (directory) {
        args.push(directory)

    }
    const ls = spawn('ls', args);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        showData(data);
    });

    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        showData(data);
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        // showData(code);
    });
}


function pingServer() {
    url = document.getElementById("url").value;
    if (url) {
        var arg = [url]
    }
    const ping = spawn('ping', arg)


    ping.stdout.on('data', (data) => {
        showData(data)
    })

    ping.stderr.on('data', (data) => {
        showData(data)
    })

    ping.on('close', (code) => {
        showData(code)
    })


}

function showData(data) {

    data += document.getElementById("output").innerHTML;
    document.getElementById("output").innerHTML = data;
}

function cancelPing() {
    ping.emit('close')
}