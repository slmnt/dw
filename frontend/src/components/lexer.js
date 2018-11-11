import Parser from './parser'

class Lexer{
    
    constructor(){
        this.parse = new Parser()
    }

    numberic(c){
        switch(c){
            case '0':
                return 0;

            case '1':
                return 1;
                
            case '2':
                return 2;

            case '3':
                return 3;

            case '4':
                return 4;

            case '5':
                return 5;

            case '6':
                return 6;

            case '7':
                return 7;

            case '8':
                return 8;

            case '9':
                return 9;
            default:
                return false;
        }
    }


    spellcheck(str){

        var flag = true
        for(var i = 0; i < str.length;i++){
            if(this.numberic(str.charAt(i))){
            }else{
                flag = false
            }
        }
        return flag
    }


    decode(cmd){

        var cmds = ''
        var prepro = []
        var flags = []
        var pf = true;

        for(var i = 0;i < cmd.length;i++){
            if(cmd.charAt(i) === " "){
            }else{
                cmds += cmd.charAt(i)
            }
        }
    
        var dump = '';
        for(i = 0;i < cmds.length;i++){
            var temp = cmds.charAt(i)
            switch(temp){
                case '+':
                case '-':
                case '*':
                case '/':
                case '(':
                case ')':
                    prepro.push(dump)
                    flags.push(true)
                    prepro.push(temp)
                    flags.push(true)
                    dump = ''
                    break
                case "":
                    break;
                default:
                    dump += temp                    
                    break
            }
        }
        if(dump.length > 0){
            prepro.push(dump)
            flags.push(true)
        }

        dump = []
        var ddump = []
        for(i = 0; i < prepro.length;i++){
            if(prepro[i] === ""){
            }else{
                dump.push(prepro[i])
                ddump.push(flags[i])
            }
        }
        prepro = dump
        flags = ddump

        for(i = 0; i < prepro.length;i++){
            if(this.numberic(prepro[i].charAt(0))){
                if(this.spellcheck(prepro[i])){
                }else{
                    pf = false;
                }
            }else{
                flags[i] = false
            }
        }

        
        if(pf){
            return [ { prepro, flags}]
        }
    }
}

export default Lexer