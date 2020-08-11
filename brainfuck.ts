import * as fs from 'fs'

fs.readFile(process.argv[2], 'utf8', function (err,data) {
    if (err) {
        return console.error("Usage: node brainfuck.js <script.bf>");
    }
    const file = data;
    compile(file);
});

// https://en.wikipedia.org/wiki/Brainfuck
const compile = (code: string) => {
    let cell = [0]
    let pointer = 0
    let charPos = 0;
    let output = []
    while (charPos < code.length){
        switch (code[charPos]) {
            case "+":
                cell[pointer]++
                if (cell[pointer] > 255){
                    cell[pointer] = 0
                }
                break
            case "-":
                cell[pointer]--
                if (cell[pointer] <= -1){
                    cell[pointer] = 255
                }
                break
            case ">":
                pointer++
                if (cell.length <= pointer){
                    cell.push(0)
                }
                break
            case "<":
                pointer--
                if (cell.length < 0){
                    console.error("Ouch")
                }
                break
            case ".":
                // print a ASCII char code -> http://asciichart.com/
                output.push(String.fromCharCode(cell[pointer]))
                break
            case "[":
                if (cell[pointer] == 0){
                    let opened = 0
                    charPos++
                    while (charPos < code.length){
                        if (code[charPos] == "]" && opened == 0){
                            break
                        }
                        else if (code[charPos] == "["){
                            opened++
                        }
                        else if (code[charPos] == "]"){
                            opened--
                        }
                        charPos++
                    }
                }
                break
            case "]":
                if (cell[pointer] != 0){
                    let closed = 0
                    charPos--
                    while (charPos > 0){
                        if (code[charPos] == "[" && closed == 0){
                            break
                        }
                        else if (code[charPos] == "]"){
                            closed++
                        }
                        else if (code[charPos] == "["){
                            closed--
                        }
                        charPos--
                    }
                }
                break
        }   
        charPos++;
    }
    console.log(output.join(""))
}