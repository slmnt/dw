import Lexer from './lexer'
import Parser from './parser'

class Interpreter{

    stack = []
    heap = []
    fp = []
    i_block = []
    f_block = []

    indent = 0
    blockinfo = []
    /**
     * IF_BLOCK
     * CMD: ['IF_BLOCK',0]
     * [
     *  IF_CMD: {}
     *  BODY_CMD: {}
     * ]
     * 
     * FOR_BLOCK
     * CMD: ['FOR_BLOCK', 0]
     * [
     *  INIT_CMD: {}
     *  COMPARE_CMD: {}
     *  BODY_CMD: {}
     *  AFTER_CMD: {}
     * ]
     */
    constructor(){
        this.lexer = new Lexer()
        this.parser = new Parser();
    }

    /**
     * 
     * @param {*} cmd 
     * Memo:
     *  fix 
     * if indent > 0
     *  indent out?
     *  yes
     *  no
     *  input
     *      indent input
     *      normal input
     * else 0
     *  if func?
     *      yes
     *      no
     * 
     */
    run(cmd){
        var pre = this.lexer.decode(cmd)

        if(this.indent > 0){
            // execute section
            if(cmd === ""){
                this.indent--;
                this.blockinfo.pop()
                if(this.indent === 0){
                    for(var i = 0;i<this.fp.length;i++){
                        var temp = this.fp[i]
                        if(temp[0] === 'IF_BLOCK'){
                            this.excute(this.i_block[temp[1]]['if_cmd'])
                            var flag = this.stack.pop()
                            if(flag === 'true'){
                                for(var j = 0;j<this.i_block[temp[1]]['body_cmd'].length;j++){
                                    this.excute(this.i_block[temp[1]]['body_cmd'][j])
                                }
                                console.log(this.stack)
                            }
                        }
                    }
                }
            }
            // insert section
            else{
                var checker = this.parser.func_check(pre)
                if(checker[0] === 'if'){
                    this.blockinfo.push('if')
                    var dump = this.fp.pop()
                    this.fp.push(dump)
                    if(dump[0] === 'IF_BLOCK'){
                        var parse = this.parser.parsing(checker[1])
                        pre = this.parser.make(parse)
                        this.i_block.push({if_cmd: pre, body_cmd: []})
                        temp = {cmds:[['IF_BLOCK',this.indent]],vals:[],names:[]}
                        this.i_block[dump[1]]['body_cmd'].push(temp)
                        this.indent++
                    }
                }else{
                    parse = this.parser.parsing(pre)
                    pre = this.parser.make(parse)//-> make body cmd

                    console.log(this.blockinfo)
                    if(this.blockinfo.pop() === 'if'){
                        this.blockinfo.push('if')
                        this.i_block[this.i_block.length - 1]['body_cmd'].push(pre)
                    }else{
                        this.blockinfo.push('for')
                        this.f_block[this.f_block.length - 1]['body_cmd'].push(pre)
                    }
                }
            }
        }
        //normal insert section
        else{
            var checker = this.parser.func_check(pre)
            if(checker){
                if(checker[0] === 'if'){
                    this.blockinfo.push('if')
                    this.fp.push(['IF_BLOCK', this.indent])
                    var parse = this.parser.parsing(checker[1])
                    pre = this.parser.make(parse)
                    this.i_block.push({if_cmd: pre, body_cmd: []})
                }else if(checker[0] === 'for'){
                    this.blockinfo.push('for')
                }
                this.indent++
            }else{
                var parse = this.parser.parsing(pre)
                pre = this.parser.make(parse)
                this.excute(pre)
                if(this.stack.length > 0)
                    return this.stack.pop()
            }

        }
    }

    for_execute(num){
        var temp = this.f_block[num]
        this.excute(temp['init_cmd'])

        while(true){
            this.excute(temp['compare_cmd'])
            var flag = this.stack.pop()
            if(flag === 'true'){
                for(var i2 = 0;i2<temp['body_cmd'].length;i2++){
                    this.excute(temp['body_cmd'][i2])
                }
                this.excute(temp['after_cmd'])
            }else{
                break
            }
        }
    }

    if_execute(num){
        var temp = this.i_block[num]
        this.excute(temp['if_cmd'])

        var flag = this.stack.pop()
        if(flag === 'true'){
            for(var j2 = 0;j2 < temp['body_cmd'].length;j2++){
                this.excute(temp['body_cmd'][j2])
            }
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
                    tar2 = this.stack.pop()
                    tar1 = this.stack.pop()
                    re = tar1 - tar2
                    this.stack.push(re)
                    break
                case 'MUL_VALS':
                    tar2 = this.stack.pop()
                    tar1 = this.stack.pop()
                    re = tar1 * tar2
                    this.stack.push(re)
                    break
                case 'DIV_VALS':
                    tar2 = this.stack.pop()
                    tar1 = this.stack.pop()
                    re = tar1 / tar2
                    this.stack.push(re)
                    break
                case 'REM_VALS':
                    tar2 = this.stack.pop()
                    tar1 = this.stack.pop()
                    re = tar1 % tar2
                    this.stack.push(re)
                    break
                case 'STORE_VAL':
                    break
                case 'COMPARE_E':
                    tar2 = this.stack.pop()
                    tar1 = this.stack.pop()
                    if(tar1 === tar2)
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_NE':
                    tar2 = this.stack.pop()
                    tar1 = this.stack.pop()
                    if(tar1 !== tar2)
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_BE':
                    tar2 = this.stack.pop()
                    tar1 = this.stack.pop()
                    if(tar1 >= tar2)
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_SE':
                    tar2 = this.stack.pop()
                    tar1 = this.stack.pop()
                    if(tar1 <= tar2)
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_B':
                    tar2 = this.stack.pop()
                    tar1 = this.stack.pop()
                    if(tar1 > tar2)
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'COMPARE_S':
                    tar2 = this.stack.pop()
                    tar1 = this.stack.pop()
                    if(tar1 < tar2)
                        this.stack.push('true')
                    else
                        this.stack.push('false')
                    break
                case 'IF_BLOCK':
                    this.if_execute(cmd[i][1])
                    break
                case 'FOR_BLOCK':
                    this.for_execute(cmd[i][1])
                    break
                default:
                    console.log("error")
                    break
            }
        }
    }
}

export default Interpreter