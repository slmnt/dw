import Lexer from './lexer'
import Parser from './parser'

class Interpreter{

    stack = []
    heap = []
    cmd = [
        { cmds : [], nums: [], names: [] },
    ];
    fp = []
    indent = 0

    constructor(){
        this.lexer = new Lexer()
        this.parser = new Parser();
    }

    run(cmd){
        var pre = this.lexer.decode(cmd)
        if(this.indent > 0){
            if(cmd === ""){
                this.indent--;
                for(var i = 0;i<this.fp.length;i++){
                    this.excute(this.fp[i])                
                }
                if(this.stack.length > 0)
                    return this.stack.pop()
            }else{
                var parse = this.parser.parsing(pre)
                pre = this.parser.make(parse)
                console.log(pre)
                this.fp.push(pre)
            }
        }

        if(pre){
            var checker = this.parser.func_check(pre)
            if(checker){
                this.indent++
                if(checker[0] === 'if'){
                    var parse = this.parser.parsing(checker[1])
                    pre = this.parser.make(parse)
                    this.excute(pre)
                    var f = this.stack.pop()
                    if(f === 'true'){
                    }else{
                        this.indent--;
                    }
                }                
            }else{
                var parse = this.parser.parsing(pre)
                pre = this.parser.make(parse)
                this.excute(pre)
                if(this.stack.length > 0)
                    return this.stack.pop()
            }

            if(this.indent > 0){
                return '...'
            }
        }else{
            console.log("error")
        }
    }

    excute(cmds){
        var cmd = cmds.cmds
        var val = cmds.vals
        var name = cmds.names

        for(var i = 0; i < cmd.length;i++){
            switch(cmd[i][0]){
                case 'LOAD_VAL':
                    this.stack.push(val[cmd[i][1]])
                    break
                case 'LOAD_NAME':
                    this.heap.push(name[cmd[i][1]])
                    break
                case 'ADD_VALS':
                    var tar2 = this.stack.pop()
                    var tar1 = this.stack.pop()
                    var re = tar1 + tar2
                    this.stack.push(re)
                    break
                case 'SUB_VALS':
                    var tar2 = this.stack.pop()
                    var tar1 = this.stack.pop()
                    var re = tar1 - tar2
                    this.stack.push(re)
                    break
                case 'MUL_VALS':
                    var tar2 = this.stack.pop()
                    var tar1 = this.stack.pop()
                    var re = tar1 * tar2
                    this.stack.push(re)
                    break
                case 'DIV_VALS':
                    var tar2 = this.stack.pop()
                    var tar1 = this.stack.pop()
                    var re = tar1 / tar2
                    this.stack.push(re)
                    break
                case 'REM_VALS':
                    var tar2 = this.stack.pop()
                    var tar1 = this.stack.pop()
                    var re = tar1 % tar2
                    this.stack.push(re)
                    break
                case 'STORE_VAL':
                    break
                case 'COMPARE_E':
                    var tar2 = this.stack.pop()
                    var tar1 = this.stack.pop()
                    if(tar1 === tar2)
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_NE':
                    var tar2 = this.stack.pop()
                    var tar1 = this.stack.pop()
                    if(tar1 != tar2)
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_BE':
                    var tar2 = this.stack.pop()
                    var tar1 = this.stack.pop()
                    if(tar1 >= tar2)
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_SE':
                    var tar2 = this.stack.pop()
                    var tar1 = this.stack.pop()
                    if(tar1 <= tar2)
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_B':
                    var tar2 = this.stack.pop()
                    var tar1 = this.stack.pop()
                    if(tar1 > tar2)
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_S':
                    var tar2 = this.stack.pop()
                    var tar1 = this.stack.pop()
                    if(tar1 < tar2)
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                default:
                    console.log("error")
                    break
            }
        }
    }
}

export default Interpreter